import { Bot, Copy, Check, Send, Mail } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { fadeUp } from '../lib/motion'
import { consultEngineer } from '../lib/supabase'
import { consultExamples } from '../data/consultExamples'

const CONTACT_EMAIL = 'contact@example.com'

const INVOLVEMENT_OPTIONS = [
  '要件定義〜実装まで一気通貫',
  '上流（ヒアリング・要件整理・PoC）のみ',
  '実装支援（レビュー・設計相談）',
  'MLOps 基盤整備のチームリーダー',
  '相談しながら進めたい',
]

const FIT_META = {
  high:   { label: '対応可 / 得意',   className: 'high'   },
  medium: { label: '対応可 / 要確認', className: 'medium' },
  low:    { label: '対応可 / 要調整', className: 'low'    },
  ng:     { label: '対応外',          className: 'ng'     },
}

function saveToHistory(result) {
  try {
    const key = 'workbench-consultations'
    const history = JSON.parse(localStorage.getItem(key) ?? '[]')
    history.unshift({ ...result, createdAt: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(history.slice(0, 50)))
  } catch { /* ignore */ }
}

export default function ConsultSection() {
  const [form, setForm] = useState({
    inquiry: '', stack: '', budget: '', deadline: '', existingCode: '', involvement: '',
  })
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.inquiry.trim()) return
    setStatus('loading')
    setResult(null)
    try {
      const data = await consultEngineer(form)
      setResult(data)
      setStatus('done')
      saveToHistory(data)
    } catch (err) {
      setResult({ error: true, message: err?.message ?? 'AI が応答できませんでした。' })
      setStatus('error')
    }
  }

  function handleCopy() {
    if (!result?.draftInquiry) return
    navigator.clipboard.writeText(result.draftInquiry).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <ConsultPipeline status={status} />
      <div className="consult-layout">
      <form className="chat-panel consult-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inquiry">
            案件概要
            <span className="field-required">必須</span>
          </label>
          <textarea
            id="inquiry"
            value={form.inquiry}
            onChange={e => setField('inquiry', e.target.value)}
            placeholder="例: Vertex AI Pipelines を使った MLOps 基盤を構築したい。BigQuery での特徴量管理もしたいです。"
            rows={5}
            maxLength={500}
            required
          />
          <div className="prompt-chip-row" aria-label="相談例">
            {consultExamples.map((example) => (
              <button
                type="button"
                className="prompt-chip"
                key={example}
                onClick={() => setField('inquiry', example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="field-grid">
          <div>
            <label htmlFor="stack">
              技術スタック
              <span className="field-optional">任意</span>
            </label>
            <input
              id="stack"
              type="text"
              value={form.stack}
              onChange={e => setField('stack', e.target.value)}
              placeholder="GCP, Python, Terraform..."
            />
          </div>
          <div>
            <label htmlFor="budget">
              予算・単価感
              <span className="field-optional">任意</span>
            </label>
            <input
              id="budget"
              type="text"
              value={form.budget}
              onChange={e => setField('budget', e.target.value)}
              placeholder="月 100 万円 / 未定"
            />
          </div>
          <div>
            <label htmlFor="deadline">
              期限・稼働期間
              <span className="field-optional">任意</span>
            </label>
            <input
              id="deadline"
              type="text"
              value={form.deadline}
              onChange={e => setField('deadline', e.target.value)}
              placeholder="3ヶ月 / 長期"
            />
          </div>
          <div>
            <label htmlFor="existingCode">
              既存コードの有無
              <span className="field-optional">任意</span>
            </label>
            <input
              id="existingCode"
              type="text"
              value={form.existingCode}
              onChange={e => setField('existingCode', e.target.value)}
              placeholder="なし / あり（FastAPI + BigQuery）"
            />
          </div>
        </div>

        <div>
          <label htmlFor="involvement">
            希望する関わり方
            <span className="field-optional">任意</span>
          </label>
          <select
            id="involvement"
            value={form.involvement}
            onChange={e => setField('involvement', e.target.value)}
          >
            <option value="">選択してください</option>
            {INVOLVEMENT_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <motion.button
          type="submit"
          className="button primary"
          disabled={status === 'loading'}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span
            style={{ display: 'inline-flex' }}
            animate={status === 'loading' ? { rotate: 360 } : { rotate: 0 }}
            transition={status === 'loading'
              ? { repeat: Infinity, duration: 1.1, ease: 'linear' }
              : { duration: 0.3 }
            }
          >
            <Send size={16} aria-hidden="true" />
          </motion.span>
          {status === 'loading' ? 'AI が判定中...' : 'AI に相談する'}
        </motion.button>
      </form>

      <section className="result-panel" aria-live="polite">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              className="result-panel--empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="result-hint">
                案件概要を入力して「AI に相談する」を押すと、
                <br />
                対応可否・得意度・想定スコープ・問い合わせ文が返ります。
              </p>
            </motion.div>
          )}

          {status === 'loading' && (
            <motion.div
              key="loading"
              className="thinking-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <div className="thinking-header-row">
                <motion.span
                  style={{ display: 'inline-flex' }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                >
                  <Bot size={18} aria-hidden="true" />
                </motion.span>
                <span>プロファイルと照合して判定しています</span>
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  style={{ letterSpacing: '0.12em' }}
                >
                  ...
                </motion.span>
              </div>
              <div className="thinking-scan-bar">
                <motion.div
                  className="thinking-scan-fill"
                  animate={{ x: ['-100%', '230%'] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', repeatDelay: 0.15 }}
                />
              </div>
              <div className="skeleton-list">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="skeleton-card"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.11, duration: 0.28 }}
                  >
                    <div className="skeleton-image shimmer" />
                    <div className="skeleton-body">
                      <div className="skeleton-line shimmer" style={{ width: '30%' }} />
                      <div className="skeleton-line shimmer" style={{ width: '75%' }} />
                      <div className="skeleton-line shimmer" style={{ width: '52%' }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {(status === 'done' || status === 'error') && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {result.error ? (
                <div className="consult-error">
                  <p>{result.message}</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="button primary">
                    <Mail size={16} aria-hidden="true" />
                    直接お問い合わせ
                  </a>
                </div>
              ) : (
                <ConsultResult result={result} copied={copied} onCopy={handleCopy} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      </div>
    </>
  )
}

const PIPELINE_STAGES = [
  { key: 'input', label: '案件入力' },
  { key: 'match', label: 'AI 照合' },
  { key: 'verdict', label: 'fit 判定' },
]

function ConsultPipeline({ status }) {
  function stateOf(key) {
    if (key === 'input') return status === 'idle' ? 'active' : 'done'
    if (key === 'match') {
      if (status === 'loading') return 'active'
      return status === 'done' || status === 'error' ? 'done' : 'idle'
    }
    return status === 'done' || status === 'error' ? 'done' : 'idle'
  }

  return (
    <div className="consult-pipeline" aria-hidden="true">
      {PIPELINE_STAGES.map((stage, i) => {
        const state = stateOf(stage.key)
        return (
          <span key={stage.key} style={{ display: 'contents' }}>
            {i > 0 && <span className="pipe-arrow">→</span>}
            <span className={`pipe-stage is-${state}`}>
              <span className="pipe-stage-dot" />
              {stage.label}
            </span>
          </span>
        )
      })}
    </div>
  )
}

function ConsultResult({ result, copied, onCopy }) {
  const fit = FIT_META[result.fit] ?? FIT_META.low

  return (
    <div className="consult-result">
      <motion.div
        className={`fit-badge fit-badge--${fit.className}`}
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <span className="fit-badge-label">{fit.label}</span>
        <p className="fit-badge-summary">{result.summary}</p>
      </motion.div>

      {result.suggestedScope?.length > 0 && (
        <motion.div className="result-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="result-section-title">想定スコープ</h3>
          <ul className="scope-list">
            {result.suggestedScope.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </motion.div>
      )}

      {result.risks?.length > 0 && (
        <motion.div className="result-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <h3 className="result-section-title">リスク・注意点</h3>
          {result.risks.map((risk, i) => <p key={i} className="risk-item">{risk}</p>)}
        </motion.div>
      )}

      {result.questions?.length > 0 && (
        <motion.div className="result-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
          <h3 className="result-section-title">確認させてください</h3>
          <ul className="question-list">
            {result.questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </motion.div>
      )}

      {result.draftInquiry && (
        <motion.div className="result-section draft-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
          <h3 className="result-section-title">問い合わせ文</h3>
          <p className="draft-hint">このままコピーして送れます</p>
          <pre className="draft-box">{result.draftInquiry}</pre>
          <div className="draft-actions">
            <button type="button" className="button secondary" onClick={onCopy}>
              {copied ? <><Check size={15} aria-hidden="true" /> コピー済み</> : <><Copy size={15} aria-hidden="true" /> コピー</>}
            </button>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('案件相談')}&body=${encodeURIComponent(result.draftInquiry)}`}
              className="button primary"
            >
              <Mail size={15} aria-hidden="true" />
              メールで送る
            </a>
          </div>
        </motion.div>
      )}

      {result.fit === 'ng' && !result.draftInquiry && (
        <motion.div className="result-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <a href={`mailto:${CONTACT_EMAIL}`} className="button secondary">
            <Mail size={15} aria-hidden="true" />
            直接お問い合わせ
          </a>
        </motion.div>
      )}
    </div>
  )
}
