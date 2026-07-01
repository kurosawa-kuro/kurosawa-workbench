import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { NG_RULES, buildSystemPrompt } from "../_shared/engineer-profile.ts"

const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY") ?? ""
const DEEPSEEK_MODEL = Deno.env.get("DEEPSEEK_MODEL") ?? "deepseek-chat"
const MAX_INQUIRY_LENGTH = 500

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

const FALLBACK: Record<string, unknown> = {
  error: true,
  message: "現在 AI が応答できません。お手数ですが直接お問い合わせください。",
}

const SYSTEM_PROMPT = buildSystemPrompt()

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS })
  }

  try {
    const { inquiry, stack, budget, deadline, existingCode, involvement } = await req.json()

    if (!inquiry) {
      return json({ error: true, message: "inquiry は必須です" }, 400)
    }

    const trimmedInquiry = String(inquiry).slice(0, MAX_INQUIRY_LENGTH)
    const allText = [trimmedInquiry, stack, involvement].filter(Boolean).join(" ")

    for (const rule of NG_RULES) {
      if (rule.pattern.test(allText)) {
        return json({
          fit: "ng",
          canHandle: false,
          summary: rule.summary,
          // soft NG は周辺支援へ逃がし、代替の相談文を残す（完全拒否で機会を捨てない）
          suggestedScope: rule.soft?.suggestedScope ?? [],
          risks: [],
          questions: [],
          draftInquiry: rule.soft?.draftInquiry ?? "",
        })
      }
    }

    const parts = [`案件概要: ${trimmedInquiry}`]
    if (stack) parts.push(`技術スタック: ${stack}`)
    if (budget) parts.push(`予算・単価感: ${budget}`)
    if (deadline) parts.push(`期限・稼働期間: ${deadline}`)
    if (existingCode) parts.push(`既存コードの有無: ${existingCode}`)
    if (involvement) parts.push(`希望する関わり方: ${involvement}`)

    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: parts.join("\n") },
        ],
        max_tokens: 1024,
        temperature: 0.3,
      }),
    })

    if (!res.ok) return json(FALLBACK)

    const data = await res.json()
    const content: string = data.choices?.[0]?.message?.content ?? ""

    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ?? content.match(/(\{[\s\S]*\})/)
    const jsonText = jsonMatch ? (jsonMatch[1] ?? jsonMatch[0]) : content

    return json(JSON.parse(jsonText))
  } catch {
    return json(FALLBACK)
  }
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  })
}
