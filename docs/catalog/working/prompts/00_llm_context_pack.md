# LLM Context Pack

## Mandatory Rules

- Do not create, overwrite, or backfill Evidence. `evidence/` is read-only Non-LLM input.
- Create `catalog_items` by repo object, not by Evidence artifact. One item key must be a file/module/symbol/entrypoint/env/dependency/test surface in the target repo.
- Evidence artifacts are inputs only. Never make `00_scan_manifest.md`, `03_symbols.md`, `30_static_signal_hits.md`, `99_scan_limitations.md`, `grep`, `change_signal`, `/`, or `src/` into a catalog item.
- Cover every relevant Evidence Index row by attaching evidence_ids to repo-object items, `scan_summary`, or `evidence_appendix`; do not silently drop evidence.
- Facts must describe the target object, not the existence of Evidence Pack files.
- Put count-only grep totals, no-hit notes, parser limitations, scan manifest/metrics/file tree, generic public API listings, and generic change signals in `scan_summary` or `evidence_appendix`, not in `catalog_items`.
- Dependency inventory and test evidence are not mere appendix when present. Create repo-object catalog items for dependency surface (`Cargo.toml` or package manifest) and test surface (`test_count`, test modules, or test files) when the evidence exists.
- A catalog item must be self-contained: an upper model must not need to open `evidence/` or `src/` to understand the object state. Do not write `refer to the evidence file`, `当該ファイルを参照`, or equivalent.
- `scan_summary` and `evidence_appendix` must also be self-contained summaries. Do not write `詳細は証拠`, `証拠を参照`, `文脈確認が必要`, or other next-action wording anywhere in the output.
- Meaning must pass the repo-specific test: could this role/implication have been written without seeing this repo? If yes, move it to appendix or rewrite it around concrete target paths/symbols.
- Add `flow_items` as first-class observed flow candidates when command/entrypoint/symbol evidence exposes connected movement. Use the name `Observed Primary Flow Candidate` conceptually, but the machine label should be descriptive such as `primary_task_lifecycle_candidate`, `destructive_management_candidate`, or `clear_all_surface_candidate`.
- Flow items are descriptive mirror material, not recommendations. Do not call a flow Golden Path or Critical User Journey as fact.
- Keep primary lifecycle and destructive management flows separate. The primary candidate must not include remove/delete/clear steps or basis entries. Clear-all is distinct from remove and must not be merged into the remove flow. If clear evidence exists, create a separate `clear_all_surface_candidate` with `flow_type: destructive_surface_candidate`; when CLI exposure is uncertain, use `surface: candidate clear operation` and put the exposure gap in `cannot_conclude`.
- Do not write real subcommand names such as `task add` unless Command variants or CLI parse evidence confirms that exact surface. If not confirmed, use candidate language such as `candidate add operation` / `candidate list operation` / `candidate status update operation`.
- Each flow must include `basis` and each step must include `user_intent`, `surface`, `components`, `data_effect`, `confidence`, and `evidence_ids` in JSON. Markdown body will render semantic fields only; evidence_ids remain machine-only. If call graph evidence is not available, set `grounding_level: weak` and put the limitation in `cannot_conclude`.
- A grep no-hit is not proof that something does not exist.
- Do not infer, reconstruct, or preserve secret values.
- Keep fact fields Non-LLM and observational; put role and current implications in meaning.
- Do not include advice, recommendations, next actions, validation plans, rollback plans, or change boundaries.

## Domain Selection Rules

- `domain` は scan profile ではなく、target の実コード・entrypoint・domain evidence から見える主対象を書く。
- `profiles_run` / `detected_profiles` に `infra` が含まれていても、それだけで `domain: infra` にしない。YAML/JSON/config は補助 evidence として扱う。
- `domain: infra` は `domain/00_infra_resources.md` に具体的な Terraform / GitHub Actions / Dockerfile resource, job, image, or secret/env reference が観測される場合だけ使う。
- `domain/00_infra_resources.md` が `status: no infra domain evidence detected` の場合、小さな CLI / library / web app の domain を infra にしない。

## Machine Provenance Boundary（重要）

JSON では、下の Evidence IDs 表にある `evidence_id` を `evidence_ids` に入れて接地を示す。存在しない id は禁止。
ただし `evidence_ids` は machine join key であり、最上位モデルの新しいアイディア・設計判断には寄与しない。
最終 Markdown 本体には program が `evidence_ids` / file / line / scan_id / sha256 を一切出さない。完全な machine provenance は `evidence_index.jsonl` sidecar に隔離する。

## Evidence IDs（catalog_items で使える evidence_id）

| evidence_id | file | lines |
|---|---|---|
| ev.00_scan_manifest_md | evidence/00_scan_manifest.md | 1-46 |
| ev.00_evidence_freshness_md | evidence/00_evidence_freshness.md | 1-12 |
| ev.01_file_tree_md | evidence/01_file_tree.md | 1-143 |
| ev.02_files_json | evidence/02_files.json | 1-143 |
| ev.03_symbols_md | evidence/03_symbols.md | 1-492 |
| ev.03_symbols_md.app_index_html | evidence/03_symbols.md | 3-6 |
| ev.03_symbols_md.app_src_app_css | evidence/03_symbols.md | 7-28 |
| ev.03_symbols_md.app_src_app_jsx | evidence/03_symbols.md | 29-32 |
| ev.03_symbols_md.app_src_components_consultsection_jsx | evidence/03_symbols.md | 33-47 |
| ev.03_symbols_md.app_src_components_footer_jsx | evidence/03_symbols.md | 48-52 |
| ev.03_symbols_md.app_src_components_header_jsx | evidence/03_symbols.md | 53-56 |
| ev.03_symbols_md.app_src_index_css | evidence/03_symbols.md | 57-417 |
| ev.03_symbols_md.app_src_lib_ailimit_js | evidence/03_symbols.md | 418-423 |
| ev.03_symbols_md.app_src_lib_motion_js | evidence/03_symbols.md | 424-427 |
| ev.03_symbols_md.app_src_lib_supabase_js | evidence/03_symbols.md | 428-431 |
| ev.03_symbols_md.app_src_lib_viewtransition_js | evidence/03_symbols.md | 432-435 |
| ev.03_symbols_md.app_src_pages_aiconsult_jsx | evidence/03_symbols.md | 436-439 |
| ev.03_symbols_md.app_src_pages_career_jsx | evidence/03_symbols.md | 440-447 |
| ev.03_symbols_md.app_src_pages_cases_jsx | evidence/03_symbols.md | 448-452 |
| ev.03_symbols_md.app_src_pages_contact_jsx | evidence/03_symbols.md | 453-457 |
| ev.03_symbols_md.app_src_pages_services_jsx | evidence/03_symbols.md | 458-465 |
| ev.03_symbols_md.app_src_pages_top_jsx | evidence/03_symbols.md | 466-469 |
| ev.03_symbols_md.app_vite_config_js | evidence/03_symbols.md | 470-473 |
| ev.03_symbols_md.supabase_functions__shared_engineer_profile_ts | evidence/03_symbols.md | 474-482 |
| ev.03_symbols_md.supabase_functions_consult_engineer_index_ts | evidence/03_symbols.md | 483-492 |
| ev.03_symbols_md.app_index_html.root.l5 | evidence/03_symbols.md | 5-5 |
| ev.03_symbols_md.app_src_app_css.counter.l9 | evidence/03_symbols.md | 9-9 |
| ev.03_symbols_md.app_src_app_css.hero.l10 | evidence/03_symbols.md | 10-10 |
| ev.03_symbols_md.app_src_app_css.base.l11 | evidence/03_symbols.md | 11-11 |
| ev.03_symbols_md.app_src_app_css.framework.l12 | evidence/03_symbols.md | 12-12 |
| ev.03_symbols_md.app_src_app_css.vite.l13 | evidence/03_symbols.md | 13-13 |
| ev.03_symbols_md.app_src_app_css.base.l14 | evidence/03_symbols.md | 14-14 |
| ev.03_symbols_md.app_src_app_css.framework.l15 | evidence/03_symbols.md | 15-15 |
| ev.03_symbols_md.app_src_app_css.vite.l16 | evidence/03_symbols.md | 16-16 |
| ev.03_symbols_md.app_src_app_css.framework.l17 | evidence/03_symbols.md | 17-17 |
| ev.03_symbols_md.app_src_app_css.vite.l18 | evidence/03_symbols.md | 18-18 |
| ev.03_symbols_md.app_src_app_css.center.l19 | evidence/03_symbols.md | 19-19 |
| ev.03_symbols_md.app_src_app_css.next_steps.l20 | evidence/03_symbols.md | 20-20 |
| ev.03_symbols_md.app_src_app_css.icon.l21 | evidence/03_symbols.md | 21-21 |
| ev.03_symbols_md.app_src_app_css.docs.l22 | evidence/03_symbols.md | 22-22 |
| ev.03_symbols_md.app_src_app_css.next_steps.l23 | evidence/03_symbols.md | 23-23 |
| ev.03_symbols_md.app_src_app_css.logo.l24 | evidence/03_symbols.md | 24-24 |
| ev.03_symbols_md.app_src_app_css.button_icon.l25 | evidence/03_symbols.md | 25-25 |
| ev.03_symbols_md.app_src_app_css.spacer.l26 | evidence/03_symbols.md | 26-26 |
| ev.03_symbols_md.app_src_app_css.ticks.l27 | evidence/03_symbols.md | 27-27 |
| ev.03_symbols_md.app_src_app_jsx.app.l31 | evidence/03_symbols.md | 31-31 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.contact_email.l35 | evidence/03_symbols.md | 35-35 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.involvement_options.l36 | evidence/03_symbols.md | 36-36 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.fit_meta.l37 | evidence/03_symbols.md | 37-37 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.savetohistory.l38 | evidence/03_symbols.md | 38-38 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.consultsection.l39 | evidence/03_symbols.md | 39-39 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.setfield.l40 | evidence/03_symbols.md | 40-40 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.handlesubmit.l41 | evidence/03_symbols.md | 41-41 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.handlecopy.l42 | evidence/03_symbols.md | 42-42 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.pipeline_stages.l43 | evidence/03_symbols.md | 43-43 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.consultpipeline.l44 | evidence/03_symbols.md | 44-44 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.stateof.l45 | evidence/03_symbols.md | 45-45 |
| ev.03_symbols_md.app_src_components_consultsection_jsx.consultresult.l46 | evidence/03_symbols.md | 46-46 |
| ev.03_symbols_md.app_src_components_footer_jsx.links.l50 | evidence/03_symbols.md | 50-50 |
| ev.03_symbols_md.app_src_components_footer_jsx.footer.l51 | evidence/03_symbols.md | 51-51 |
| ev.03_symbols_md.app_src_components_header_jsx.header.l55 | evidence/03_symbols.md | 55-55 |
| ev.03_symbols_md.app_src_index_css.paper.l59 | evidence/03_symbols.md | 59-59 |
| ev.03_symbols_md.app_src_index_css.paper_2.l60 | evidence/03_symbols.md | 60-60 |
| ev.03_symbols_md.app_src_index_css.panel.l61 | evidence/03_symbols.md | 61-61 |
| ev.03_symbols_md.app_src_index_css.panel_2.l62 | evidence/03_symbols.md | 62-62 |
| ev.03_symbols_md.app_src_index_css.ink.l63 | evidence/03_symbols.md | 63-63 |
| ev.03_symbols_md.app_src_index_css.ink_2.l64 | evidence/03_symbols.md | 64-64 |
| ev.03_symbols_md.app_src_index_css.ink_3.l65 | evidence/03_symbols.md | 65-65 |
| ev.03_symbols_md.app_src_index_css.line.l66 | evidence/03_symbols.md | 66-66 |
| ev.03_symbols_md.app_src_index_css.line_soft.l67 | evidence/03_symbols.md | 67-67 |
| ev.03_symbols_md.app_src_index_css.grid_line.l68 | evidence/03_symbols.md | 68-68 |
| ev.03_symbols_md.app_src_index_css.blueprint.l69 | evidence/03_symbols.md | 69-69 |
| ev.03_symbols_md.app_src_index_css.blueprint_ink.l70 | evidence/03_symbols.md | 70-70 |
| ev.03_symbols_md.app_src_index_css.blueprint_soft.l71 | evidence/03_symbols.md | 71-71 |
| ev.03_symbols_md.app_src_index_css.fit_high.l72 | evidence/03_symbols.md | 72-72 |
| ev.03_symbols_md.app_src_index_css.fit_high_bg.l73 | evidence/03_symbols.md | 73-73 |
| ev.03_symbols_md.app_src_index_css.fit_medium.l74 | evidence/03_symbols.md | 74-74 |
| ev.03_symbols_md.app_src_index_css.fit_medium_bg.l75 | evidence/03_symbols.md | 75-75 |
| ev.03_symbols_md.app_src_index_css.fit_low.l76 | evidence/03_symbols.md | 76-76 |
| ev.03_symbols_md.app_src_index_css.fit_low_bg.l77 | evidence/03_symbols.md | 77-77 |
| ev.03_symbols_md.app_src_index_css.fit_ng.l78 | evidence/03_symbols.md | 78-78 |
| ev.03_symbols_md.app_src_index_css.fit_ng_bg.l79 | evidence/03_symbols.md | 79-79 |
| ev.03_symbols_md.app_src_index_css.sp_1.l80 | evidence/03_symbols.md | 80-80 |
| ev.03_symbols_md.app_src_index_css.sp_2.l81 | evidence/03_symbols.md | 81-81 |
| ev.03_symbols_md.app_src_index_css.sp_3.l82 | evidence/03_symbols.md | 82-82 |
| ev.03_symbols_md.app_src_index_css.sp_4.l83 | evidence/03_symbols.md | 83-83 |
| ev.03_symbols_md.app_src_index_css.sp_5.l84 | evidence/03_symbols.md | 84-84 |
| ev.03_symbols_md.app_src_index_css.sp_6.l85 | evidence/03_symbols.md | 85-85 |
| ev.03_symbols_md.app_src_index_css.sp_7.l86 | evidence/03_symbols.md | 86-86 |
| ev.03_symbols_md.app_src_index_css.sp_8.l87 | evidence/03_symbols.md | 87-87 |
| ev.03_symbols_md.app_src_index_css.sp_9.l88 | evidence/03_symbols.md | 88-88 |
| ev.03_symbols_md.app_src_index_css.sp_10.l89 | evidence/03_symbols.md | 89-89 |
| ev.03_symbols_md.app_src_index_css.sp_11.l90 | evidence/03_symbols.md | 90-90 |
| ev.03_symbols_md.app_src_index_css.sp_12.l91 | evidence/03_symbols.md | 91-91 |
| ev.03_symbols_md.app_src_index_css.sp_13.l92 | evidence/03_symbols.md | 92-92 |
| ev.03_symbols_md.app_src_index_css.gutter.l93 | evidence/03_symbols.md | 93-93 |
| ev.03_symbols_md.app_src_index_css.maxw.l94 | evidence/03_symbols.md | 94-94 |
| ev.03_symbols_md.app_src_index_css.radius.l95 | evidence/03_symbols.md | 95-95 |
| ev.03_symbols_md.app_src_index_css.radius_sm.l96 | evidence/03_symbols.md | 96-96 |
| ev.03_symbols_md.app_src_index_css.shadow.l97 | evidence/03_symbols.md | 97-97 |
| ev.03_symbols_md.app_src_index_css.shadow_hover.l98 | evidence/03_symbols.md | 98-98 |
| ev.03_symbols_md.app_src_index_css.font_display.l99 | evidence/03_symbols.md | 99-99 |
| ev.03_symbols_md.app_src_index_css.font_body.l100 | evidence/03_symbols.md | 100-100 |
| ev.03_symbols_md.app_src_index_css.font_mono.l101 | evidence/03_symbols.md | 101-101 |
| ev.03_symbols_md.app_src_index_css.root.l102 | evidence/03_symbols.md | 102-102 |
| ev.03_symbols_md.app_src_index_css.mono.l103 | evidence/03_symbols.md | 103-103 |
| ev.03_symbols_md.app_src_index_css.eyebrow.l104 | evidence/03_symbols.md | 104-104 |
| ev.03_symbols_md.app_src_index_css.eyebrow.l105 | evidence/03_symbols.md | 105-105 |
| ev.03_symbols_md.app_src_index_css.lead.l106 | evidence/03_symbols.md | 106-106 |
| ev.03_symbols_md.app_src_index_css.sr_only.l107 | evidence/03_symbols.md | 107-107 |
| ev.03_symbols_md.app_src_index_css.button.l108 | evidence/03_symbols.md | 108-108 |
| ev.03_symbols_md.app_src_index_css.button.l109 | evidence/03_symbols.md | 109-109 |
| ev.03_symbols_md.app_src_index_css.button.l110 | evidence/03_symbols.md | 110-110 |
| ev.03_symbols_md.app_src_index_css.button.l111 | evidence/03_symbols.md | 111-111 |
| ev.03_symbols_md.app_src_index_css.button.l112 | evidence/03_symbols.md | 112-112 |
| ev.03_symbols_md.app_src_index_css.button.l113 | evidence/03_symbols.md | 113-113 |
| ev.03_symbols_md.app_src_index_css.button.l114 | evidence/03_symbols.md | 114-114 |
| ev.03_symbols_md.app_src_index_css.button_primary.l115 | evidence/03_symbols.md | 115-115 |
| ev.03_symbols_md.app_src_index_css.button_primary.l116 | evidence/03_symbols.md | 116-116 |
| ev.03_symbols_md.app_src_index_css.button_secondary.l117 | evidence/03_symbols.md | 117-117 |
| ev.03_symbols_md.app_src_index_css.button_secondary.l118 | evidence/03_symbols.md | 118-118 |
| ev.03_symbols_md.app_src_index_css.button.l119 | evidence/03_symbols.md | 119-119 |
| ev.03_symbols_md.app_src_index_css.site_header.l120 | evidence/03_symbols.md | 120-120 |
| ev.03_symbols_md.app_src_index_css.header_inner.l121 | evidence/03_symbols.md | 121-121 |
| ev.03_symbols_md.app_src_index_css.header_logo.l122 | evidence/03_symbols.md | 122-122 |
| ev.03_symbols_md.app_src_index_css.header_logo.l123 | evidence/03_symbols.md | 123-123 |
| ev.03_symbols_md.app_src_index_css.header_logo_mark.l124 | evidence/03_symbols.md | 124-124 |
| ev.03_symbols_md.app_src_index_css.header_nav.l125 | evidence/03_symbols.md | 125-125 |
| ev.03_symbols_md.app_src_index_css.header_nav.l126 | evidence/03_symbols.md | 126-126 |
| ev.03_symbols_md.app_src_index_css.header_nav.l127 | evidence/03_symbols.md | 127-127 |
| ev.03_symbols_md.app_src_index_css.header_nav.l128 | evidence/03_symbols.md | 128-128 |
| ev.03_symbols_md.app_src_index_css.header_nav.l129 | evidence/03_symbols.md | 129-129 |
| ev.03_symbols_md.app_src_index_css.header_nav.l130 | evidence/03_symbols.md | 130-130 |
| ev.03_symbols_md.app_src_index_css.header_nav.l131 | evidence/03_symbols.md | 131-131 |
| ev.03_symbols_md.app_src_index_css.header_nav_cta.l132 | evidence/03_symbols.md | 132-132 |
| ev.03_symbols_md.app_src_index_css.header_nav_cta.l133 | evidence/03_symbols.md | 133-133 |
| ev.03_symbols_md.app_src_index_css.header_nav_cta.l134 | evidence/03_symbols.md | 134-134 |
| ev.03_symbols_md.app_src_index_css.header_nav_cta.l135 | evidence/03_symbols.md | 135-135 |
| ev.03_symbols_md.app_src_index_css.header_nav_cta.l136 | evidence/03_symbols.md | 136-136 |
| ev.03_symbols_md.app_src_index_css.header_nav_cta.l137 | evidence/03_symbols.md | 137-137 |
| ev.03_symbols_md.app_src_index_css.header_nav_cta.l138 | evidence/03_symbols.md | 138-138 |
| ev.03_symbols_md.app_src_index_css.site_page.l139 | evidence/03_symbols.md | 139-139 |
| ev.03_symbols_md.app_src_index_css.top_section.l140 | evidence/03_symbols.md | 140-140 |
| ev.03_symbols_md.app_src_index_css.page_stack.l141 | evidence/03_symbols.md | 141-141 |
| ev.03_symbols_md.app_src_index_css.page_stack.l142 | evidence/03_symbols.md | 142-142 |
| ev.03_symbols_md.app_src_index_css.page_heading.l143 | evidence/03_symbols.md | 143-143 |
| ev.03_symbols_md.app_src_index_css.page_heading.l144 | evidence/03_symbols.md | 144-144 |
| ev.03_symbols_md.app_src_index_css.section_label.l145 | evidence/03_symbols.md | 145-145 |
| ev.03_symbols_md.app_src_index_css.section_heading.l146 | evidence/03_symbols.md | 146-146 |
| ev.03_symbols_md.app_src_index_css.section_lead.l147 | evidence/03_symbols.md | 147-147 |
| ev.03_symbols_md.app_src_index_css.section_count.l148 | evidence/03_symbols.md | 148-148 |
| ev.03_symbols_md.app_src_index_css.top_hero.l149 | evidence/03_symbols.md | 149-149 |
| ev.03_symbols_md.app_src_index_css.top_hero_inner.l150 | evidence/03_symbols.md | 150-150 |
| ev.03_symbols_md.app_src_index_css.home_hero_grid.l151 | evidence/03_symbols.md | 151-151 |
| ev.03_symbols_md.app_src_index_css.hero_name.l152 | evidence/03_symbols.md | 152-152 |
| ev.03_symbols_md.app_src_index_css.hero_lead.l153 | evidence/03_symbols.md | 153-153 |
| ev.03_symbols_md.app_src_index_css.hero_stats.l154 | evidence/03_symbols.md | 154-154 |
| ev.03_symbols_md.app_src_index_css.hero_stat.l155 | evidence/03_symbols.md | 155-155 |
| ev.03_symbols_md.app_src_index_css.hero_stat.l156 | evidence/03_symbols.md | 156-156 |
| ev.03_symbols_md.app_src_index_css.hero_stat_key.l157 | evidence/03_symbols.md | 157-157 |
| ev.03_symbols_md.app_src_index_css.hero_stat_key.l158 | evidence/03_symbols.md | 158-158 |
| ev.03_symbols_md.app_src_index_css.hero_schematic.l159 | evidence/03_symbols.md | 159-159 |
| ev.03_symbols_md.app_src_index_css.schema_node.l160 | evidence/03_symbols.md | 160-160 |
| ev.03_symbols_md.app_src_index_css.schema_node__fn.l161 | evidence/03_symbols.md | 161-161 |
| ev.03_symbols_md.app_src_index_css.schema_tag.l162 | evidence/03_symbols.md | 162-162 |
| ev.03_symbols_md.app_src_index_css.schema_title.l163 | evidence/03_symbols.md | 163-163 |
| ev.03_symbols_md.app_src_index_css.schema_node__fn.l164 | evidence/03_symbols.md | 164-164 |
| ev.03_symbols_md.app_src_index_css.schema_node__fn.l165 | evidence/03_symbols.md | 165-165 |
| ev.03_symbols_md.app_src_index_css.schema_codes.l166 | evidence/03_symbols.md | 166-166 |
| ev.03_symbols_md.app_src_index_css.schema_codes.l167 | evidence/03_symbols.md | 167-167 |
| ev.03_symbols_md.app_src_index_css.schema_codes.l168 | evidence/03_symbols.md | 168-168 |
| ev.03_symbols_md.app_src_index_css.schema_codes.l169 | evidence/03_symbols.md | 169-169 |
| ev.03_symbols_md.app_src_index_css.schema_codes.l170 | evidence/03_symbols.md | 170-170 |
| ev.03_symbols_md.app_src_index_css.schema_codes.l171 | evidence/03_symbols.md | 171-171 |
| ev.03_symbols_md.app_src_index_css.schema_edge.l172 | evidence/03_symbols.md | 172-172 |
| ev.03_symbols_md.app_src_index_css.schema_edge.l173 | evidence/03_symbols.md | 173-173 |
| ev.03_symbols_md.app_src_index_css.schema_signal.l174 | evidence/03_symbols.md | 174-174 |
| ev.03_symbols_md.app_src_index_css.schema_edge.l175 | evidence/03_symbols.md | 175-175 |
| ev.03_symbols_md.app_src_index_css.cta_row.l176 | evidence/03_symbols.md | 176-176 |
| ev.03_symbols_md.app_src_index_css.axis_card_grid.l177 | evidence/03_symbols.md | 177-177 |
| ev.03_symbols_md.app_src_index_css.axis_card.l178 | evidence/03_symbols.md | 178-178 |
| ev.03_symbols_md.app_src_index_css.axis_card.l179 | evidence/03_symbols.md | 179-179 |
| ev.03_symbols_md.app_src_index_css.axis_card.l180 | evidence/03_symbols.md | 180-180 |
| ev.03_symbols_md.app_src_index_css.axis_card.l181 | evidence/03_symbols.md | 181-181 |
| ev.03_symbols_md.app_src_index_css.axis_card.l182 | evidence/03_symbols.md | 182-182 |
| ev.03_symbols_md.app_src_index_css.axis_card.l183 | evidence/03_symbols.md | 183-183 |
| ev.03_symbols_md.app_src_index_css.axis_card.l184 | evidence/03_symbols.md | 184-184 |
| ev.03_symbols_md.app_src_index_css.axis_card.l185 | evidence/03_symbols.md | 185-185 |
| ev.03_symbols_md.app_src_index_css.axis_card.l186 | evidence/03_symbols.md | 186-186 |
| ev.03_symbols_md.app_src_index_css.axis_card__primary.l187 | evidence/03_symbols.md | 187-187 |
| ev.03_symbols_md.app_src_index_css.axis_card_icon.l188 | evidence/03_symbols.md | 188-188 |
| ev.03_symbols_md.app_src_index_css.axis_card_kicker.l189 | evidence/03_symbols.md | 189-189 |
| ev.03_symbols_md.app_src_index_css.preview_card_kicker.l190 | evidence/03_symbols.md | 190-190 |
| ev.03_symbols_md.app_src_index_css.service_id.l191 | evidence/03_symbols.md | 191-191 |
| ev.03_symbols_md.app_src_index_css.axis_card.l192 | evidence/03_symbols.md | 192-192 |
| ev.03_symbols_md.app_src_index_css.axis_card.l193 | evidence/03_symbols.md | 193-193 |
| ev.03_symbols_md.app_src_index_css.preview_card.l194 | evidence/03_symbols.md | 194-194 |
| ev.03_symbols_md.app_src_index_css.service_card.l195 | evidence/03_symbols.md | 195-195 |
| ev.03_symbols_md.app_src_index_css.case_card.l196 | evidence/03_symbols.md | 196-196 |
| ev.03_symbols_md.app_src_index_css.axis_card_link.l197 | evidence/03_symbols.md | 197-197 |
| ev.03_symbols_md.app_src_index_css.text_link.l198 | evidence/03_symbols.md | 198-198 |
| ev.03_symbols_md.app_src_index_css.axis_card_link.l199 | evidence/03_symbols.md | 199-199 |
| ev.03_symbols_md.app_src_index_css.text_link.l200 | evidence/03_symbols.md | 200-200 |
| ev.03_symbols_md.app_src_index_css.axis_card_link.l201 | evidence/03_symbols.md | 201-201 |
| ev.03_symbols_md.app_src_index_css.text_link.l202 | evidence/03_symbols.md | 202-202 |
| ev.03_symbols_md.app_src_index_css.axis_card.l203 | evidence/03_symbols.md | 203-203 |
| ev.03_symbols_md.app_src_index_css.axis_card.l204 | evidence/03_symbols.md | 204-204 |
| ev.03_symbols_md.app_src_index_css.text_link.l205 | evidence/03_symbols.md | 205-205 |
| ev.03_symbols_md.app_src_index_css.text_link.l206 | evidence/03_symbols.md | 206-206 |
| ev.03_symbols_md.app_src_index_css.text_link.l207 | evidence/03_symbols.md | 207-207 |
| ev.03_symbols_md.app_src_index_css.text_link.l208 | evidence/03_symbols.md | 208-208 |
| ev.03_symbols_md.app_src_index_css.text_link.l209 | evidence/03_symbols.md | 209-209 |
| ev.03_symbols_md.app_src_index_css.text_link.l210 | evidence/03_symbols.md | 210-210 |
| ev.03_symbols_md.app_src_index_css.preview_grid.l211 | evidence/03_symbols.md | 211-211 |
| ev.03_symbols_md.app_src_index_css.case_grid.l212 | evidence/03_symbols.md | 212-212 |
| ev.03_symbols_md.app_src_index_css.preview_card.l213 | evidence/03_symbols.md | 213-213 |
| ev.03_symbols_md.app_src_index_css.case_card.l214 | evidence/03_symbols.md | 214-214 |
| ev.03_symbols_md.app_src_index_css.contact_panel.l215 | evidence/03_symbols.md | 215-215 |
| ev.03_symbols_md.app_src_index_css.result_shape_panel.l216 | evidence/03_symbols.md | 216-216 |
| ev.03_symbols_md.app_src_index_css.preview_card.l217 | evidence/03_symbols.md | 217-217 |
| ev.03_symbols_md.app_src_index_css.case_card.l218 | evidence/03_symbols.md | 218-218 |
| ev.03_symbols_md.app_src_index_css.service_card.l219 | evidence/03_symbols.md | 219-219 |
| ev.03_symbols_md.app_src_index_css.contact_panel.l220 | evidence/03_symbols.md | 220-220 |
| ev.03_symbols_md.app_src_index_css.result_shape_panel.l221 | evidence/03_symbols.md | 221-221 |
| ev.03_symbols_md.app_src_index_css.consult_preview.l222 | evidence/03_symbols.md | 222-222 |
| ev.03_symbols_md.app_src_index_css.prompt_list.l223 | evidence/03_symbols.md | 223-223 |
| ev.03_symbols_md.app_src_index_css.prompt_chip_row.l224 | evidence/03_symbols.md | 224-224 |
| ev.03_symbols_md.app_src_index_css.prompt_list.l225 | evidence/03_symbols.md | 225-225 |
| ev.03_symbols_md.app_src_index_css.prompt_chip.l226 | evidence/03_symbols.md | 226-226 |
| ev.03_symbols_md.app_src_index_css.prompt_chip.l227 | evidence/03_symbols.md | 227-227 |
| ev.03_symbols_md.app_src_index_css.prompt_list__panel.l228 | evidence/03_symbols.md | 228-228 |
| ev.03_symbols_md.app_src_index_css.highlight_row.l229 | evidence/03_symbols.md | 229-229 |
| ev.03_symbols_md.app_src_index_css.highlight_row.l230 | evidence/03_symbols.md | 230-230 |
| ev.03_symbols_md.app_src_index_css.service_list.l231 | evidence/03_symbols.md | 231-231 |
| ev.03_symbols_md.app_src_index_css.service_card.l232 | evidence/03_symbols.md | 232-232 |
| ev.03_symbols_md.app_src_index_css.service_card_top.l233 | evidence/03_symbols.md | 233-233 |
| ev.03_symbols_md.app_src_index_css.service_card_main.l234 | evidence/03_symbols.md | 234-234 |
| ev.03_symbols_md.app_src_index_css.service_card_head.l235 | evidence/03_symbols.md | 235-235 |
| ev.03_symbols_md.app_src_index_css.service_pain_panel.l236 | evidence/03_symbols.md | 236-236 |
| ev.03_symbols_md.app_src_index_css.service_prep_panel.l237 | evidence/03_symbols.md | 237-237 |
| ev.03_symbols_md.app_src_index_css.service_support_panel.l238 | evidence/03_symbols.md | 238-238 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel.l239 | evidence/03_symbols.md | 239-239 |
| ev.03_symbols_md.app_src_index_css.service_pain_panel.l240 | evidence/03_symbols.md | 240-240 |
| ev.03_symbols_md.app_src_index_css.service_pain_panel.l241 | evidence/03_symbols.md | 241-241 |
| ev.03_symbols_md.app_src_index_css.service_panel_title.l242 | evidence/03_symbols.md | 242-242 |
| ev.03_symbols_md.app_src_index_css.service_panel_title.l243 | evidence/03_symbols.md | 243-243 |
| ev.03_symbols_md.app_src_index_css.service_panel_title.l244 | evidence/03_symbols.md | 244-244 |
| ev.03_symbols_md.app_src_index_css.service_support_panel.l245 | evidence/03_symbols.md | 245-245 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel.l246 | evidence/03_symbols.md | 246-246 |
| ev.03_symbols_md.app_src_index_css.service_prep_panel.l247 | evidence/03_symbols.md | 247-247 |
| ev.03_symbols_md.app_src_index_css.service_prep_list.l248 | evidence/03_symbols.md | 248-248 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel.l249 | evidence/03_symbols.md | 249-249 |
| ev.03_symbols_md.app_src_index_css.contact_panel.l250 | evidence/03_symbols.md | 250-250 |
| ev.03_symbols_md.app_src_index_css.result_shape_panel.l251 | evidence/03_symbols.md | 251-251 |
| ev.03_symbols_md.app_src_index_css.service_prep_list.l252 | evidence/03_symbols.md | 252-252 |
| ev.03_symbols_md.app_src_index_css.service_prep_list.l253 | evidence/03_symbols.md | 253-253 |
| ev.03_symbols_md.app_src_index_css.service_flow_grid.l254 | evidence/03_symbols.md | 254-254 |
| ev.03_symbols_md.app_src_index_css.service_support_panel.l255 | evidence/03_symbols.md | 255-255 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel.l256 | evidence/03_symbols.md | 256-256 |
| ev.03_symbols_md.app_src_index_css.service_support_list.l257 | evidence/03_symbols.md | 257-257 |
| ev.03_symbols_md.app_src_index_css.service_support_list.l258 | evidence/03_symbols.md | 258-258 |
| ev.03_symbols_md.app_src_index_css.service_support_list.l259 | evidence/03_symbols.md | 259-259 |
| ev.03_symbols_md.app_src_index_css.service_fit_pair.l260 | evidence/03_symbols.md | 260-260 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel.l261 | evidence/03_symbols.md | 261-261 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel_is_good.l262 | evidence/03_symbols.md | 262-262 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel_is_bad.l263 | evidence/03_symbols.md | 263-263 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel.l264 | evidence/03_symbols.md | 264-264 |
| ev.03_symbols_md.app_src_index_css.contact_panel.l265 | evidence/03_symbols.md | 265-265 |
| ev.03_symbols_md.app_src_index_css.result_shape_panel.l266 | evidence/03_symbols.md | 266-266 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel.l267 | evidence/03_symbols.md | 267-267 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel_is_good.l268 | evidence/03_symbols.md | 268-268 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel_is_bad.l269 | evidence/03_symbols.md | 269-269 |
| ev.03_symbols_md.app_src_index_css.next_action_panel.l270 | evidence/03_symbols.md | 270-270 |
| ev.03_symbols_md.app_src_index_css.next_action_panel.l271 | evidence/03_symbols.md | 271-271 |
| ev.03_symbols_md.app_src_index_css.consult_design_grid.l272 | evidence/03_symbols.md | 272-272 |
| ev.03_symbols_md.app_src_index_css.case_grid.l273 | evidence/03_symbols.md | 273-273 |
| ev.03_symbols_md.app_src_index_css.case_field.l274 | evidence/03_symbols.md | 274-274 |
| ev.03_symbols_md.app_src_index_css.case_field.l275 | evidence/03_symbols.md | 275-275 |
| ev.03_symbols_md.app_src_index_css.contact_panel.l276 | evidence/03_symbols.md | 276-276 |
| ev.03_symbols_md.app_src_index_css.section_head_row.l277 | evidence/03_symbols.md | 277-277 |
| ev.03_symbols_md.app_src_index_css.strength_grid.l278 | evidence/03_symbols.md | 278-278 |
| ev.03_symbols_md.app_src_index_css.strength_grid__medium.l279 | evidence/03_symbols.md | 279-279 |
| ev.03_symbols_md.app_src_index_css.strength_card.l280 | evidence/03_symbols.md | 280-280 |
| ev.03_symbols_md.app_src_index_css.strength_card.l281 | evidence/03_symbols.md | 281-281 |
| ev.03_symbols_md.app_src_index_css.strength_id.l282 | evidence/03_symbols.md | 282-282 |
| ev.03_symbols_md.app_src_index_css.strength_card_header.l283 | evidence/03_symbols.md | 283-283 |
| ev.03_symbols_md.app_src_index_css.strength_area.l284 | evidence/03_symbols.md | 284-284 |
| ev.03_symbols_md.app_src_index_css.strength_badge.l285 | evidence/03_symbols.md | 285-285 |
| ev.03_symbols_md.app_src_index_css.strength_badge__high.l286 | evidence/03_symbols.md | 286-286 |
| ev.03_symbols_md.app_src_index_css.strength_badge__medium.l287 | evidence/03_symbols.md | 287-287 |
| ev.03_symbols_md.app_src_index_css.strength_detail.l288 | evidence/03_symbols.md | 288-288 |
| ev.03_symbols_md.app_src_index_css.strength_card__medium.l289 | evidence/03_symbols.md | 289-289 |
| ev.03_symbols_md.app_src_index_css.strength_card__medium.l290 | evidence/03_symbols.md | 290-290 |
| ev.03_symbols_md.app_src_index_css.keyword_chips.l291 | evidence/03_symbols.md | 291-291 |
| ev.03_symbols_md.app_src_index_css.keyword_chip.l292 | evidence/03_symbols.md | 292-292 |
| ev.03_symbols_md.app_src_index_css.career_list.l293 | evidence/03_symbols.md | 293-293 |
| ev.03_symbols_md.app_src_index_css.career_item.l294 | evidence/03_symbols.md | 294-294 |
| ev.03_symbols_md.app_src_index_css.career_item.l295 | evidence/03_symbols.md | 295-295 |
| ev.03_symbols_md.app_src_index_css.career_index.l296 | evidence/03_symbols.md | 296-296 |
| ev.03_symbols_md.app_src_index_css.top_section__consult.l297 | evidence/03_symbols.md | 297-297 |
| ev.03_symbols_md.app_src_index_css.consult_pipeline.l298 | evidence/03_symbols.md | 298-298 |
| ev.03_symbols_md.app_src_index_css.pipe_stage.l299 | evidence/03_symbols.md | 299-299 |
| ev.03_symbols_md.app_src_index_css.pipe_stage_dot.l300 | evidence/03_symbols.md | 300-300 |
| ev.03_symbols_md.app_src_index_css.pipe_stage_is_active.l301 | evidence/03_symbols.md | 301-301 |
| ev.03_symbols_md.app_src_index_css.pipe_stage_is_active.l302 | evidence/03_symbols.md | 302-302 |
| ev.03_symbols_md.app_src_index_css.pipe_stage_is_done.l303 | evidence/03_symbols.md | 303-303 |
| ev.03_symbols_md.app_src_index_css.pipe_stage_is_done.l304 | evidence/03_symbols.md | 304-304 |
| ev.03_symbols_md.app_src_index_css.pipe_arrow.l305 | evidence/03_symbols.md | 305-305 |
| ev.03_symbols_md.app_src_index_css.consult_layout.l306 | evidence/03_symbols.md | 306-306 |
| ev.03_symbols_md.app_src_index_css.chat_panel.l307 | evidence/03_symbols.md | 307-307 |
| ev.03_symbols_md.app_src_index_css.consult_form.l308 | evidence/03_symbols.md | 308-308 |
| ev.03_symbols_md.app_src_index_css.consult_form.l309 | evidence/03_symbols.md | 309-309 |
| ev.03_symbols_md.app_src_index_css.consult_form.l310 | evidence/03_symbols.md | 310-310 |
| ev.03_symbols_md.app_src_index_css.consult_form.l311 | evidence/03_symbols.md | 311-311 |
| ev.03_symbols_md.app_src_index_css.consult_form.l312 | evidence/03_symbols.md | 312-312 |
| ev.03_symbols_md.app_src_index_css.consult_form.l313 | evidence/03_symbols.md | 313-313 |
| ev.03_symbols_md.app_src_index_css.consult_form.l314 | evidence/03_symbols.md | 314-314 |
| ev.03_symbols_md.app_src_index_css.consult_form.l315 | evidence/03_symbols.md | 315-315 |
| ev.03_symbols_md.app_src_index_css.consult_form.l316 | evidence/03_symbols.md | 316-316 |
| ev.03_symbols_md.app_src_index_css.field_grid.l317 | evidence/03_symbols.md | 317-317 |
| ev.03_symbols_md.app_src_index_css.field_required.l318 | evidence/03_symbols.md | 318-318 |
| ev.03_symbols_md.app_src_index_css.field_required.l319 | evidence/03_symbols.md | 319-319 |
| ev.03_symbols_md.app_src_index_css.field_optional.l320 | evidence/03_symbols.md | 320-320 |
| ev.03_symbols_md.app_src_index_css.result_panel.l321 | evidence/03_symbols.md | 321-321 |
| ev.03_symbols_md.app_src_index_css.result_panel__empty.l322 | evidence/03_symbols.md | 322-322 |
| ev.03_symbols_md.app_src_index_css.result_hint.l323 | evidence/03_symbols.md | 323-323 |
| ev.03_symbols_md.app_src_index_css.thinking_overlay.l324 | evidence/03_symbols.md | 324-324 |
| ev.03_symbols_md.app_src_index_css.thinking_header_row.l325 | evidence/03_symbols.md | 325-325 |
| ev.03_symbols_md.app_src_index_css.thinking_scan_bar.l326 | evidence/03_symbols.md | 326-326 |
| ev.03_symbols_md.app_src_index_css.thinking_scan_fill.l327 | evidence/03_symbols.md | 327-327 |
| ev.03_symbols_md.app_src_index_css.skeleton_list.l328 | evidence/03_symbols.md | 328-328 |
| ev.03_symbols_md.app_src_index_css.skeleton_card.l329 | evidence/03_symbols.md | 329-329 |
| ev.03_symbols_md.app_src_index_css.skeleton_image.l330 | evidence/03_symbols.md | 330-330 |
| ev.03_symbols_md.app_src_index_css.skeleton_body.l331 | evidence/03_symbols.md | 331-331 |
| ev.03_symbols_md.app_src_index_css.skeleton_line.l332 | evidence/03_symbols.md | 332-332 |
| ev.03_symbols_md.app_src_index_css.shimmer.l333 | evidence/03_symbols.md | 333-333 |
| ev.03_symbols_md.app_src_index_css.consult_result.l334 | evidence/03_symbols.md | 334-334 |
| ev.03_symbols_md.app_src_index_css.fit_badge.l335 | evidence/03_symbols.md | 335-335 |
| ev.03_symbols_md.app_src_index_css.fit_badge__high.l336 | evidence/03_symbols.md | 336-336 |
| ev.03_symbols_md.app_src_index_css.fit_badge__medium.l337 | evidence/03_symbols.md | 337-337 |
| ev.03_symbols_md.app_src_index_css.fit_badge__low.l338 | evidence/03_symbols.md | 338-338 |
| ev.03_symbols_md.app_src_index_css.fit_badge__ng.l339 | evidence/03_symbols.md | 339-339 |
| ev.03_symbols_md.app_src_index_css.fit_badge_label.l340 | evidence/03_symbols.md | 340-340 |
| ev.03_symbols_md.app_src_index_css.fit_badge__high.l341 | evidence/03_symbols.md | 341-341 |
| ev.03_symbols_md.app_src_index_css.fit_badge__medium.l342 | evidence/03_symbols.md | 342-342 |
| ev.03_symbols_md.app_src_index_css.fit_badge__low.l343 | evidence/03_symbols.md | 343-343 |
| ev.03_symbols_md.app_src_index_css.fit_badge__ng.l344 | evidence/03_symbols.md | 344-344 |
| ev.03_symbols_md.app_src_index_css.fit_badge_summary.l345 | evidence/03_symbols.md | 345-345 |
| ev.03_symbols_md.app_src_index_css.result_section.l346 | evidence/03_symbols.md | 346-346 |
| ev.03_symbols_md.app_src_index_css.result_section_title.l347 | evidence/03_symbols.md | 347-347 |
| ev.03_symbols_md.app_src_index_css.scope_list.l348 | evidence/03_symbols.md | 348-348 |
| ev.03_symbols_md.app_src_index_css.scope_list.l349 | evidence/03_symbols.md | 349-349 |
| ev.03_symbols_md.app_src_index_css.scope_list.l350 | evidence/03_symbols.md | 350-350 |
| ev.03_symbols_md.app_src_index_css.question_list.l351 | evidence/03_symbols.md | 351-351 |
| ev.03_symbols_md.app_src_index_css.question_list.l352 | evidence/03_symbols.md | 352-352 |
| ev.03_symbols_md.app_src_index_css.risk_item.l353 | evidence/03_symbols.md | 353-353 |
| ev.03_symbols_md.app_src_index_css.risk_item.l354 | evidence/03_symbols.md | 354-354 |
| ev.03_symbols_md.app_src_index_css.draft_section.l355 | evidence/03_symbols.md | 355-355 |
| ev.03_symbols_md.app_src_index_css.draft_hint.l356 | evidence/03_symbols.md | 356-356 |
| ev.03_symbols_md.app_src_index_css.draft_box.l357 | evidence/03_symbols.md | 357-357 |
| ev.03_symbols_md.app_src_index_css.draft_actions.l358 | evidence/03_symbols.md | 358-358 |
| ev.03_symbols_md.app_src_index_css.consult_error.l359 | evidence/03_symbols.md | 359-359 |
| ev.03_symbols_md.app_src_index_css.site_footer.l360 | evidence/03_symbols.md | 360-360 |
| ev.03_symbols_md.app_src_index_css.footer_inner.l361 | evidence/03_symbols.md | 361-361 |
| ev.03_symbols_md.app_src_index_css.footer_logo.l362 | evidence/03_symbols.md | 362-362 |
| ev.03_symbols_md.app_src_index_css.footer_tagline.l363 | evidence/03_symbols.md | 363-363 |
| ev.03_symbols_md.app_src_index_css.footer_nav_heading.l364 | evidence/03_symbols.md | 364-364 |
| ev.03_symbols_md.app_src_index_css.footer_nav.l365 | evidence/03_symbols.md | 365-365 |
| ev.03_symbols_md.app_src_index_css.footer_nav.l366 | evidence/03_symbols.md | 366-366 |
| ev.03_symbols_md.app_src_index_css.footer_nav.l367 | evidence/03_symbols.md | 367-367 |
| ev.03_symbols_md.app_src_index_css.footer_info.l368 | evidence/03_symbols.md | 368-368 |
| ev.03_symbols_md.app_src_index_css.footer_info.l369 | evidence/03_symbols.md | 369-369 |
| ev.03_symbols_md.app_src_index_css.footer_bottom.l370 | evidence/03_symbols.md | 370-370 |
| ev.03_symbols_md.app_src_index_css.footer_bottom.l371 | evidence/03_symbols.md | 371-371 |
| ev.03_symbols_md.app_src_index_css.home_hero_grid.l372 | evidence/03_symbols.md | 372-372 |
| ev.03_symbols_md.app_src_index_css.consult_preview.l373 | evidence/03_symbols.md | 373-373 |
| ev.03_symbols_md.app_src_index_css.consult_design_grid.l374 | evidence/03_symbols.md | 374-374 |
| ev.03_symbols_md.app_src_index_css.service_card_top.l375 | evidence/03_symbols.md | 375-375 |
| ev.03_symbols_md.app_src_index_css.service_flow_grid.l376 | evidence/03_symbols.md | 376-376 |
| ev.03_symbols_md.app_src_index_css.case_grid.l377 | evidence/03_symbols.md | 377-377 |
| ev.03_symbols_md.app_src_index_css.preview_grid.l378 | evidence/03_symbols.md | 378-378 |
| ev.03_symbols_md.app_src_index_css.strength_grid.l379 | evidence/03_symbols.md | 379-379 |
| ev.03_symbols_md.app_src_index_css.strength_grid__medium.l380 | evidence/03_symbols.md | 380-380 |
| ev.03_symbols_md.app_src_index_css.consult_layout.l381 | evidence/03_symbols.md | 381-381 |
| ev.03_symbols_md.app_src_index_css.hero_stats.l382 | evidence/03_symbols.md | 382-382 |
| ev.03_symbols_md.app_src_index_css.hero_stat.l383 | evidence/03_symbols.md | 383-383 |
| ev.03_symbols_md.app_src_index_css.hero_stat.l384 | evidence/03_symbols.md | 384-384 |
| ev.03_symbols_md.app_src_index_css.footer_inner.l385 | evidence/03_symbols.md | 385-385 |
| ev.03_symbols_md.app_src_index_css.footer_brand.l386 | evidence/03_symbols.md | 386-386 |
| ev.03_symbols_md.app_src_index_css.header_inner.l387 | evidence/03_symbols.md | 387-387 |
| ev.03_symbols_md.app_src_index_css.header_logo.l388 | evidence/03_symbols.md | 388-388 |
| ev.03_symbols_md.app_src_index_css.header_logo_mark.l389 | evidence/03_symbols.md | 389-389 |
| ev.03_symbols_md.app_src_index_css.header_nav.l390 | evidence/03_symbols.md | 390-390 |
| ev.03_symbols_md.app_src_index_css.header_nav.l391 | evidence/03_symbols.md | 391-391 |
| ev.03_symbols_md.app_src_index_css.header_nav_cta.l392 | evidence/03_symbols.md | 392-392 |
| ev.03_symbols_md.app_src_index_css.top_hero_inner.l393 | evidence/03_symbols.md | 393-393 |
| ev.03_symbols_md.app_src_index_css.top_section.l394 | evidence/03_symbols.md | 394-394 |
| ev.03_symbols_md.app_src_index_css.page_stack.l395 | evidence/03_symbols.md | 395-395 |
| ev.03_symbols_md.app_src_index_css.preview_grid.l396 | evidence/03_symbols.md | 396-396 |
| ev.03_symbols_md.app_src_index_css.service_fit_pair.l397 | evidence/03_symbols.md | 397-397 |
| ev.03_symbols_md.app_src_index_css.consult_preview.l398 | evidence/03_symbols.md | 398-398 |
| ev.03_symbols_md.app_src_index_css.service_card.l399 | evidence/03_symbols.md | 399-399 |
| ev.03_symbols_md.app_src_index_css.next_action_panel.l400 | evidence/03_symbols.md | 400-400 |
| ev.03_symbols_md.app_src_index_css.service_pain_panel.l401 | evidence/03_symbols.md | 401-401 |
| ev.03_symbols_md.app_src_index_css.service_prep_panel.l402 | evidence/03_symbols.md | 402-402 |
| ev.03_symbols_md.app_src_index_css.service_support_panel.l403 | evidence/03_symbols.md | 403-403 |
| ev.03_symbols_md.app_src_index_css.service_fit_panel.l404 | evidence/03_symbols.md | 404-404 |
| ev.03_symbols_md.app_src_index_css.next_action_panel.l405 | evidence/03_symbols.md | 405-405 |
| ev.03_symbols_md.app_src_index_css.hero_stats.l406 | evidence/03_symbols.md | 406-406 |
| ev.03_symbols_md.app_src_index_css.hero_schematic.l407 | evidence/03_symbols.md | 407-407 |
| ev.03_symbols_md.app_src_index_css.schema_edge.l408 | evidence/03_symbols.md | 408-408 |
| ev.03_symbols_md.app_src_index_css.schema_edge.l409 | evidence/03_symbols.md | 409-409 |
| ev.03_symbols_md.app_src_index_css.schema_signal.l410 | evidence/03_symbols.md | 410-410 |
| ev.03_symbols_md.app_src_index_css.strength_grid.l411 | evidence/03_symbols.md | 411-411 |
| ev.03_symbols_md.app_src_index_css.field_grid.l412 | evidence/03_symbols.md | 412-412 |
| ev.03_symbols_md.app_src_index_css.draft_actions.l413 | evidence/03_symbols.md | 413-413 |
| ev.03_symbols_md.app_src_index_css.draft_actions.l414 | evidence/03_symbols.md | 414-414 |
| ev.03_symbols_md.app_src_index_css.footer_inner.l415 | evidence/03_symbols.md | 415-415 |
| ev.03_symbols_md.app_src_index_css.footer_bottom.l416 | evidence/03_symbols.md | 416-416 |
| ev.03_symbols_md.app_src_lib_ailimit_js.ailimitexceedederror.l420 | evidence/03_symbols.md | 420-420 |
| ev.03_symbols_md.app_src_lib_ailimit_js.consumeailimit.l421 | evidence/03_symbols.md | 421-421 |
| ev.03_symbols_md.app_src_lib_ailimit_js.getaiusagetoday.l422 | evidence/03_symbols.md | 422-422 |
| ev.03_symbols_md.app_src_lib_motion_js.ease.l426 | evidence/03_symbols.md | 426-426 |
| ev.03_symbols_md.app_src_lib_supabase_js.consultengineer.l430 | evidence/03_symbols.md | 430-430 |
| ev.03_symbols_md.app_src_lib_viewtransition_js.startviewtransition.l434 | evidence/03_symbols.md | 434-434 |
| ev.03_symbols_md.app_src_pages_aiconsult_jsx.aiconsult.l438 | evidence/03_symbols.md | 438-438 |
| ev.03_symbols_md.app_src_pages_career_jsx.high_strengths.l442 | evidence/03_symbols.md | 442-442 |
| ev.03_symbols_md.app_src_pages_career_jsx.med_strengths.l443 | evidence/03_symbols.md | 443-443 |
| ev.03_symbols_md.app_src_pages_career_jsx.stats.l444 | evidence/03_symbols.md | 444-444 |
| ev.03_symbols_md.app_src_pages_career_jsx.career.l445 | evidence/03_symbols.md | 445-445 |
| ev.03_symbols_md.app_src_pages_career_jsx.strengthcard.l446 | evidence/03_symbols.md | 446-446 |
| ev.03_symbols_md.app_src_pages_cases_jsx.cases.l450 | evidence/03_symbols.md | 450-450 |
| ev.03_symbols_md.app_src_pages_cases_jsx.casefield.l451 | evidence/03_symbols.md | 451-451 |
| ev.03_symbols_md.app_src_pages_contact_jsx.contact_email.l455 | evidence/03_symbols.md | 455-455 |
| ev.03_symbols_md.app_src_pages_contact_jsx.contact.l456 | evidence/03_symbols.md | 456-456 |
| ev.03_symbols_md.app_src_pages_services_jsx.services.l460 | evidence/03_symbols.md | 460-460 |
| ev.03_symbols_md.app_src_pages_services_jsx.supportlist.l461 | evidence/03_symbols.md | 461-461 |
| ev.03_symbols_md.app_src_pages_services_jsx.fitlist.l462 | evidence/03_symbols.md | 462-462 |
| ev.03_symbols_md.app_src_pages_services_jsx.icon.l463 | evidence/03_symbols.md | 463-463 |
| ev.03_symbols_md.app_src_pages_services_jsx.preplist.l464 | evidence/03_symbols.md | 464-464 |
| ev.03_symbols_md.app_src_pages_top_jsx.top.l468 | evidence/03_symbols.md | 468-468 |
| ev.03_symbols_md.app_vite_config_js.ai_daily_limit.l472 | evidence/03_symbols.md | 472-472 |
| ev.03_symbols_md.supabase_functions__shared_engineer_profile_ts.summary.l476 | evidence/03_symbols.md | 476-476 |
| ev.03_symbols_md.supabase_functions__shared_engineer_profile_ts.strengths.l477 | evidence/03_symbols.md | 477-477 |
| ev.03_symbols_md.supabase_functions__shared_engineer_profile_ts.ng_conditions.l478 | evidence/03_symbols.md | 478-478 |
| ev.03_symbols_md.supabase_functions__shared_engineer_profile_ts.work_style.l479 | evidence/03_symbols.md | 479-479 |
| ev.03_symbols_md.supabase_functions__shared_engineer_profile_ts.ng_rules.l480 | evidence/03_symbols.md | 480-480 |
| ev.03_symbols_md.supabase_functions__shared_engineer_profile_ts.buildsystemprompt.l481 | evidence/03_symbols.md | 481-481 |
| ev.03_symbols_md.supabase_functions_consult_engineer_index_ts.deepseek_api_key.l485 | evidence/03_symbols.md | 485-485 |
| ev.03_symbols_md.supabase_functions_consult_engineer_index_ts.deepseek_model.l486 | evidence/03_symbols.md | 486-486 |
| ev.03_symbols_md.supabase_functions_consult_engineer_index_ts.max_inquiry_length.l487 | evidence/03_symbols.md | 487-487 |
| ev.03_symbols_md.supabase_functions_consult_engineer_index_ts.cors.l488 | evidence/03_symbols.md | 488-488 |
| ev.03_symbols_md.supabase_functions_consult_engineer_index_ts.fallback.l489 | evidence/03_symbols.md | 489-489 |
| ev.03_symbols_md.supabase_functions_consult_engineer_index_ts.system_prompt.l490 | evidence/03_symbols.md | 490-490 |
| ev.03_symbols_md.supabase_functions_consult_engineer_index_ts.json.l491 | evidence/03_symbols.md | 491-491 |
| ev.04_symbols_json | evidence/04_symbols.json | 1-432 |
| ev.05_tests_md | evidence/05_tests.md | 1-10 |
| ev.05_tests_md.app_src_components_consultsection_jsx | evidence/05_tests.md | 3-6 |
| ev.05_tests_md.app_src_lib_ailimit_js | evidence/05_tests.md | 7-10 |
| ev.07_entrypoints_md | evidence/07_entrypoints.md | 1-4 |
| ev.08_config_env_md | evidence/08_config_env.md | 1-18 |
| ev.08_config_env_md.scan_limitations | evidence/08_config_env.md | 14-18 |
| ev.09_diff_evidence_md | evidence/09_diff_evidence.md | 1-47 |
| ev.09_diff_evidence_md.working_tree | evidence/09_diff_evidence.md | 5-10 |
| ev.09_diff_evidence_md.staged_files | evidence/09_diff_evidence.md | 11-16 |
| ev.09_diff_evidence_md.unstaged_files | evidence/09_diff_evidence.md | 17-22 |
| ev.09_diff_evidence_md.last_commit_files | evidence/09_diff_evidence.md | 23-33 |
| ev.09_diff_evidence_md.since_scope | evidence/09_diff_evidence.md | 34-47 |
| ev.10_observed_change_signals_md | evidence/10_observed_change_signals.md | 1-33 |
| ev.10_observed_change_signals_md.notes | evidence/10_observed_change_signals.md | 30-33 |
| ev.10_observed_change_signals_json | evidence/10_observed_change_signals.json | 1-178 |
| ev.11_dependency_inventory_md | evidence/11_dependency_inventory.md | 1-53 |
| ev.11_dependency_inventory_md.guardrail | evidence/11_dependency_inventory.md | 51-53 |
| ev.11_dependency_inventory_json | evidence/11_dependency_inventory.json | 1-43 |
| ev.12_code_metrics_md | evidence/12_code_metrics.md | 1-43 |
| ev.12_code_metrics_md.guardrail | evidence/12_code_metrics.md | 41-43 |
| ev.12_code_metrics_json | evidence/12_code_metrics.json | 1-33 |
| ev.13_public_api_surface_md | evidence/13_public_api_surface.md | 1-33 |
| ev.13_public_api_surface_md.guardrail | evidence/13_public_api_surface.md | 31-33 |
| ev.13_public_api_surface_json | evidence/13_public_api_surface.json | 1-23 |
| ev.14_code_excerpts_md | evidence/14_code_excerpts.md | 1-322 |
| ev.14_code_excerpts_md.app_src_app_jsx_9_15__app | evidence/14_code_excerpts.md | 7-20 |
| ev.14_code_excerpts_md.app_src_components_consultsection_jsx_31_37__consultsection | evidence/14_code_excerpts.md | 21-34 |
| ev.14_code_excerpts_md.app_src_components_consultsection_jsx_43_49__handlesubmit | evidence/14_code_excerpts.md | 35-48 |
| ev.14_code_excerpts_md.app_src_components_footer_jsx_6_12__footer | evidence/14_code_excerpts.md | 49-62 |
| ev.14_code_excerpts_md.app_src_components_header_jsx_1_7__header | evidence/14_code_excerpts.md | 63-76 |
| ev.14_code_excerpts_md.app_src_lib_ailimit_js_1_4__ailimitexceedederror | evidence/14_code_excerpts.md | 77-87 |
| ev.14_code_excerpts_md.app_src_lib_ailimit_js_8_14__consumeailimit | evidence/14_code_excerpts.md | 88-101 |
| ev.14_code_excerpts_md.app_src_lib_ailimit_js_18_23__getaiusagetoday | evidence/14_code_excerpts.md | 102-114 |
| ev.14_code_excerpts_md.app_src_lib_motion_js_1_6__ease | evidence/14_code_excerpts.md | 115-127 |
| ev.14_code_excerpts_md.app_src_lib_supabase_js_8_14__consultengineer | evidence/14_code_excerpts.md | 128-141 |
| ev.14_code_excerpts_md.app_src_lib_viewtransition_js_1_4__startviewtransition | evidence/14_code_excerpts.md | 142-152 |
| ev.14_code_excerpts_md.app_src_pages_aiconsult_jsx_2_8__aiconsult | evidence/14_code_excerpts.md | 153-166 |
| ev.14_code_excerpts_md.app_src_pages_career_jsx_14_20__career | evidence/14_code_excerpts.md | 167-180 |
| ev.14_code_excerpts_md.app_src_pages_cases_jsx_1_6__cases | evidence/14_code_excerpts.md | 181-193 |
| ev.14_code_excerpts_md.app_src_pages_contact_jsx_3_9__contact | evidence/14_code_excerpts.md | 194-207 |
| ev.14_code_excerpts_md.app_src_pages_services_jsx_2_8__services | evidence/14_code_excerpts.md | 208-221 |
| ev.14_code_excerpts_md.app_src_pages_top_jsx_7_13__top | evidence/14_code_excerpts.md | 222-235 |
| ev.14_code_excerpts_md.supabase_functions__shared_engineer_profile_ts_31_37__ng_conditions | evidence/14_code_excerpts.md | 236-249 |
| ev.14_code_excerpts_md.supabase_functions__shared_engineer_profile_ts_56_62__ng_rules | evidence/14_code_excerpts.md | 250-263 |
| ev.14_code_excerpts_md.supabase_functions__shared_engineer_profile_ts_18_24__strengths | evidence/14_code_excerpts.md | 264-277 |
| ev.14_code_excerpts_md.supabase_functions__shared_engineer_profile_ts_13_19__summary | evidence/14_code_excerpts.md | 278-291 |
| ev.14_code_excerpts_md.supabase_functions__shared_engineer_profile_ts_39_45__work_style | evidence/14_code_excerpts.md | 292-305 |
| ev.14_code_excerpts_md.supabase_functions__shared_engineer_profile_ts_89_95__buildsystemprompt | evidence/14_code_excerpts.md | 306-319 |
| ev.14_code_excerpts_md.guardrail | evidence/14_code_excerpts.md | 320-322 |
| ev.14_code_excerpts_json | evidence/14_code_excerpts.json | 1-25 |
| ev.15_decision_memory_md | evidence/15_decision_memory.md | 1-5 |
| ev.15_decision_memory_json | evidence/15_decision_memory.json | 1-3 |
| ev.domain_00_infra_resources_md | evidence/domain/00_infra_resources.md | 1-11 |
| ev.30_static_signal_hits_md | evidence/30_static_signal_hits.md | 1-22 |
| ev.30_static_signal_hits_md.guardrail | evidence/30_static_signal_hits.md | 20-22 |
| ev.98_redaction_report_md | evidence/98_redaction_report.md | 1-20 |
| ev.99_scan_limitations_md | evidence/99_scan_limitations.md | 1-18 |
| ev.99_scan_limitations_md.parser_limitations__infra_web | evidence/99_scan_limitations.md | 3-9 |
| ev.99_scan_limitations_md.search_limitations | evidence/99_scan_limitations.md | 10-14 |
| ev.99_scan_limitations_md.current_limits | evidence/99_scan_limitations.md | 15-18 |
| ev.grep_01_todos_md | evidence/grep/01_todos.md | 1-8 |
| ev.grep_02_job_lifecycle_md | evidence/grep/02_job_lifecycle.md | 1-41 |
| ev.grep_03_env_secret_md | evidence/grep/03_env_secret.md | 1-55 |
| ev.grep_04_high_risk_ops_md | evidence/grep/04_high_risk_ops.md | 1-11 |
| ev.grep_05_auth_permission_md | evidence/grep/05_auth_permission.md | 1-91 |
| ev.grep_06_infra_surface_md | evidence/grep/06_infra_surface.md | 1-17 |
| ev.grep_99_no_hits_md | evidence/grep/99_no_hits.md | 1-10 |
| ev.grep_99_no_hits_md.todos | evidence/grep/99_no_hits.md | 3-10 |
| ev.grep_00_queries_json | evidence/grep/00_queries.json | 1-8 |

## Evidence Inputs

### evidence/00_scan_manifest.md

```markdown
# Scan Manifest

schema_version: 1
tool_version: 0.1.0
scan_id: 20260705T052152Z_9b03d7722a7c
generated_at: 2026-07-05T05:21:52Z
tool: decision-catalog (dcm)
language: infra+web
root: /home/ubuntu/repos/kurosawa-workbench
git_commit: 19c7911fcdb6a354a33e05f8d50a8ff33151e9a1
git_branch: main
git_dirty: false
freshness_status: fresh

query_config_hash: e9dac3c3870d09c48c44a7f09c409e5a055fb41f762463fbe198c0ee6c5769aa
ignore_rules_hash: e8f0b03b63182f211b568f1e240f120892ed77d888a5fbac0075c20478e975a4
source_tree_hash: c7c08e8f791bb9c060ac80a7581ae9f48bf19ecfe288f920b5534e590d1c81a8
output_schema_version: 1

profile_resolution:
mode: auto
resolver: deterministic
llm_router_used: false
llm_router_is_evidence: false
candidates: infra,web
profiles_run: infra+web

requested_profiles: auto
detected_profiles: css,html,infra,node,typescript
coverage_warnings: unsupported extensions detected: example,local,png,sh,svg,toml

included_file_count: 141
symbol_count: 430
test_count: 2
entrypoint_count: 2

extractor:
  rust: syn AST exact v1 (line fallback only on parse failure)
  python: indent-heuristic v2 (public-by-convention/import/dependency inventory)
  typescript: line-heuristic v2 (export/import/dependency inventory)
  metrics: deterministic loc/symbol counts v1
  grep: substring v1

notes:
  - symbol 抽出は heuristic。macro / 動的生成は取りこぼす（99_scan_limitations.md 参照）。
  - grep no-hit は不存在の証明ではない。
```

### evidence/03_symbols.md

```markdown
# Symbols

## app/index.html

- L20: id `root`

## app/src/App.css

- L1: selector `.counter`
- L20: selector `.hero`
- L23: selector `.base,`
- L24: selector `.framework,`
- L25: selector `.vite`
- L30: selector `.base`
- L36: selector `.framework,`
- L37: selector `.vite`
- L41: selector `.framework`
- L49: selector `.vite`
- L59: selector `#center`
- L73: selector `#next-steps`
- L86: selector `.icon`
- L98: selector `#docs`
- L107: selector `#next-steps`
- L114: selector `.logo`
- L133: selector `.button-icon`
- L156: selector `#spacer`
- L164: selector `.ticks`

## app/src/App.jsx

- L12: component `App`

## app/src/components/ConsultSection.jsx

- L8: component `CONTACT_EMAIL`
- L10: component `INVOLVEMENT_OPTIONS`
- L18: component `FIT_META`
- L25: function `saveToHistory`
- L34: component `ConsultSection`
- L42: function `setField`
- L46: function `handleSubmit` (async, test)
- L62: function `handleCopy`
- L293: component `PIPELINE_STAGES`
- L299: component `ConsultPipeline`
- L300: function `stateOf`
- L327: component `ConsultResult`

## app/src/components/Footer.jsx

- L1: component `LINKS`
- L9: component `Footer`

## app/src/components/Header.jsx

- L4: component `Header`

## app/src/index.css

- L10: custom-property `--paper`
- L11: custom-property `--paper-2`
- L12: custom-property `--panel`
- L13: custom-property `--panel-2`
- L16: custom-property `--ink`
- L17: custom-property `--ink-2`
- L18: custom-property `--ink-3`
- L21: custom-property `--line`
- L22: custom-property `--line-soft`
- L23: custom-property `--grid-line`
- L26: custom-property `--blueprint`
- L27: custom-property `--blueprint-ink`
- L28: custom-property `--blueprint-soft`
- L31: custom-property `--fit-high`
- L32: custom-property `--fit-high-bg`
- L33: custom-property `--fit-medium`
- L34: custom-property `--fit-medium-bg`
- L35: custom-property `--fit-low`
- L36: custom-property `--fit-low-bg`
- L37: custom-property `--fit-ng`
- L38: custom-property `--fit-ng-bg`
- L41: custom-property `--sp-1`
- L42: custom-property `--sp-2`
- L43: custom-property `--sp-3`
- L44: custom-property `--sp-4`
- L45: custom-property `--sp-5`
- L46: custom-property `--sp-6`
- L47: custom-property `--sp-7`
- L48: custom-property `--sp-8`
- L49: custom-property `--sp-9`
- L50: custom-property `--sp-10`
- L51: custom-property `--sp-11`
- L52: custom-property `--sp-12`
- L53: custom-property `--sp-13`
- L55: custom-property `--gutter`
- L56: custom-property `--maxw`
- L58: custom-property `--radius`
- L59: custom-property `--radius-sm`
- L60: custom-property `--shadow`
- L61: custom-property `--shadow-hover`
- L63: custom-property `--font-display`
- L64: custom-property `--font-body`
- L66: custom-property `--font-mono`
- L125: selector `#root`
- L142: selector `.mono`
- L144: selector `.eyebrow,`
- L156: selector `.eyebrow`
- L181: selector `.lead`
- L188: selector `.sr-only`
- L200: selector `.button`
- L218: selector `.button`
- L227: selector `.button`
- L228: selector `.button`
- L231: selector `.button`
- L236: selector `.button`
- L237: selector `.button`
- L240: selector `.button.primary`
- L245: selector `.button.primary`
- L250: selector `.button.secondary`
- L255: selector `.button.secondary`
- L261: selector `.button`
- L267: selector `.site-header`

[truncated for context pack]
```

### evidence/08_config_env.md

```markdown
# Config / Env Inventory

- VITE_SUPABASE_ANON_KEY
  found_in:
    - app/src/lib/supabase.js:L5
  value: redacted (name/参照のみ)
  requiredness: unknown
- VITE_SUPABASE_URL
  found_in:
    - app/src/lib/supabase.js:L4
  value: redacted (name/参照のみ)
  requiredness: unknown

## Scan Limitations

- required/optional は未確認。
- default 値は解析していない。
- secret 値は含めない。
```

### evidence/30_static_signal_hits.md

```markdown
# Static Signal Hits

This is a machine-generated signal inventory, not a decision.
Every row points back to grep evidence.

| query_id | hit_state | hits | evidence_ref | follow_up |
|---|---|---:|---|---|
| `todos` | `no_hit` | 0 | `file=evidence/grep/01_todos.md query_id=todos` | treat as no-hit, not absence |
| `job_lifecycle` | `matched` | 36 | `file=evidence/grep/02_job_lifecycle.md query_id=job_lifecycle` | review matching lines before deciding |
| `env_secret` | `matched` | 50 | `file= <REDACTED>
| `high_risk_ops` | `matched` | 6 | `file=evidence/grep/04_high_risk_ops.md query_id=high_risk_ops` | review matching lines before deciding |
| `auth_permission` | `matched` | 86 | `file=evidence/grep/05_auth_permission.md query_id=auth_permission` | review matching lines before deciding |
| `infra_surface` | `matched` | 12 | `file=evidence/grep/06_infra_surface.md query_id=infra_surface` | review matching lines before deciding |
| `change_signal:app/src/index.css` | `observed` | 3 | `file=evidence/10_observed_change_signals.md path=app/src/index.css` | inspect change history before editing |
| `change_signal:docs/runbooks/frontend-design-rebuild-runbook.md` | `observed` | 2 | `file=evidence/10_observed_change_signals.md path=docs/runbooks/frontend-design-rebuild-runbook.md` | inspect change history before editing |
| `change_signal:supabase/config.toml` | `observed` | 2 | `file=evidence/10_observed_change_signals.md path=supabase/config.toml` | inspect change history before editing |
| `change_signal:app/src/pages/Top.jsx` | `observed` | 2 | `file=evidence/10_observed_change_signals.md path=app/src/pages/Top.jsx` | inspect change history before editing |
| `change_signal:app/src/components/ConsultSection.jsx` | `observed` | 2 | `file=evidence/10_observed_change_signals.md path=app/src/components/ConsultSection.jsx` | inspect change history before editing |

## Guardrail

- Static signal entries are observations only. Decision Catalog claims still need explicit `evidence_ref` values.
```

### evidence/99_scan_limitations.md

```markdown
# Scan Limitations

## Parser Limitations (infra+web)

- シンボル抽出は行ベース heuristic であり AST ではない。
- Rust: macro / proc-macro 生成、複数行シグネチャ、conditional compilation は取りこぼす。
- Python: 動的生成 class/function、デコレータ経由の登録、import hook は静的には見えない。
- impl 内メソッドと自由関数の区別（Rust）は近似。

## Search Limitations

- grep は指定 query 語彙に依存する。no-hit は不存在の証明ではない。
- 同義語・ドメイン固有命名は取りこぼす可能性がある。

## Current Limits

- 検出したシンボルの責務は未判定（investigate / Decision Catalog で扱う）。
- env の required/optional、secret の取り扱いは未確認。
```

### evidence/evidence_index.jsonl

```markdown
{"evidence_id":"ev.00_scan_manifest_md","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"00_scan_manifest.md","line_start":1,"line_end":46,"sha256":"aa6bb155b9f94d3dbc6d1547d35d5f2cb180dfd59361f29fdc7df3ed4807a193"}
{"evidence_id":"ev.00_evidence_freshness_md","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"00_evidence_freshness.md","line_start":1,"line_end":12,"sha256":"2fa91a8252a7f8d34a42566da0952a97488cc2c60436e5612a4a58eba6bfa53c"}
{"evidence_id":"ev.01_file_tree_md","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"01_file_tree.md","line_start":1,"line_end":143,"sha256":"f99936c87d6d78d88fc61d55c993da113d8adfed2d4e2326f4970949ec8c1d9e"}
{"evidence_id":"ev.02_files_json","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"02_files.json","line_start":1,"line_end":143,"sha256":"5d4310c2e65209ff6d040176e07b72d7527d8feacd074630f2ae83ba84f7b0f9"}
{"evidence_id":"ev.03_symbols_md","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":1,"line_end":492,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_index_html","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":3,"line_end":6,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":7,"line_end":28,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":29,"line_end":32,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":33,"line_end":47,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_footer_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":48,"line_end":52,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_header_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":53,"line_end":56,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":57,"line_end":417,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_lib_ailimit_js","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":418,"line_end":423,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_lib_motion_js","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":424,"line_end":427,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_lib_supabase_js","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":428,"line_end":431,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_lib_viewtransition_js","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":432,"line_end":435,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_pages_aiconsult_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":436,"line_end":439,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_pages_career_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":440,"line_end":447,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_pages_cases_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":448,"line_end":452,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_pages_contact_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":453,"line_end":457,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_pages_services_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":458,"line_end":465,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_pages_top_jsx","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":466,"line_end":469,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_vite_config_js","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":470,"line_end":473,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.supabase_functions__shared_engineer_profile_ts","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":474,"line_end":482,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.supabase_functions_consult_engineer_index_ts","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":483,"line_end":492,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_index_html.root.l5","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":5,"line_end":5,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.counter.l9","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":9,"line_end":9,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.hero.l10","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":10,"line_end":10,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.base.l11","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":11,"line_end":11,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.framework.l12","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":12,"line_end":12,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.vite.l13","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":13,"line_end":13,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.base.l14","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":14,"line_end":14,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.framework.l15","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":15,"line_end":15,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.vite.l16","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":16,"line_end":16,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.framework.l17","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":17,"line_end":17,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.vite.l18","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":18,"line_end":18,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.center.l19","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":19,"line_end":19,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.next_steps.l20","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":20,"line_end":20,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.icon.l21","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":21,"line_end":21,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.docs.l22","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":22,"line_end":22,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.next_steps.l23","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":23,"line_end":23,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.logo.l24","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":24,"line_end":24,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.button_icon.l25","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":25,"line_end":25,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.spacer.l26","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":26,"line_end":26,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_css.ticks.l27","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":27,"line_end":27,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_app_jsx.app.l31","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":31,"line_end":31,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.contact_email.l35","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":35,"line_end":35,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.involvement_options.l36","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":36,"line_end":36,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.fit_meta.l37","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":37,"line_end":37,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.savetohistory.l38","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":38,"line_end":38,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.consultsection.l39","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":39,"line_end":39,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.setfield.l40","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":40,"line_end":40,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.handlesubmit.l41","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":41,"line_end":41,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.handlecopy.l42","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":42,"line_end":42,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.pipeline_stages.l43","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":43,"line_end":43,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.consultpipeline.l44","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":44,"line_end":44,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.stateof.l45","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":45,"line_end":45,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_consultsection_jsx.consultresult.l46","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":46,"line_end":46,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_footer_jsx.links.l50","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":50,"line_end":50,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_footer_jsx.footer.l51","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":51,"line_end":51,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_components_header_jsx.header.l55","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":55,"line_end":55,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.paper.l59","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":59,"line_end":59,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.paper_2.l60","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":60,"line_end":60,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.panel.l61","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":61,"line_end":61,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.panel_2.l62","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":62,"line_end":62,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.ink.l63","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":63,"line_end":63,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.ink_2.l64","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":64,"line_end":64,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.ink_3.l65","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":65,"line_end":65,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.line.l66","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":66,"line_end":66,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.line_soft.l67","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":67,"line_end":67,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.grid_line.l68","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":68,"line_end":68,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.blueprint.l69","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":69,"line_end":69,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.blueprint_ink.l70","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":70,"line_end":70,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.blueprint_soft.l71","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":71,"line_end":71,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.fit_high.l72","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":72,"line_end":72,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.fit_high_bg.l73","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":73,"line_end":73,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.fit_medium.l74","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":74,"line_end":74,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.fit_medium_bg.l75","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":75,"line_end":75,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.fit_low.l76","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":76,"line_end":76,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.fit_low_bg.l77","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":77,"line_end":77,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.fit_ng.l78","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":78,"line_end":78,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.fit_ng_bg.l79","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":79,"line_end":79,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_1.l80","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":80,"line_end":80,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_2.l81","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":81,"line_end":81,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_3.l82","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":82,"line_end":82,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_4.l83","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":83,"line_end":83,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_5.l84","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":84,"line_end":84,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_6.l85","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":85,"line_end":85,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_7.l86","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":86,"line_end":86,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_8.l87","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":87,"line_end":87,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_9.l88","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":88,"line_end":88,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_10.l89","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":89,"line_end":89,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_11.l90","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":90,"line_end":90,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_12.l91","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":91,"line_end":91,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sp_13.l92","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":92,"line_end":92,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.gutter.l93","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":93,"line_end":93,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.maxw.l94","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":94,"line_end":94,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.radius.l95","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":95,"line_end":95,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.radius_sm.l96","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":96,"line_end":96,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.shadow.l97","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":97,"line_end":97,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.shadow_hover.l98","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":98,"line_end":98,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.font_display.l99","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":99,"line_end":99,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.font_body.l100","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":100,"line_end":100,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.font_mono.l101","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":101,"line_end":101,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.root.l102","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":102,"line_end":102,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.mono.l103","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":103,"line_end":103,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.eyebrow.l104","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":104,"line_end":104,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.eyebrow.l105","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":105,"line_end":105,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.lead.l106","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":106,"line_end":106,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.sr_only.l107","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":107,"line_end":107,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button.l108","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":108,"line_end":108,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button.l109","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":109,"line_end":109,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button.l110","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":110,"line_end":110,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button.l111","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":111,"line_end":111,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button.l112","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":112,"line_end":112,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button.l113","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":113,"line_end":113,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button.l114","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":114,"line_end":114,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button_primary.l115","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":115,"line_end":115,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button_primary.l116","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":116,"line_end":116,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}
{"evidence_id":"ev.03_symbols_md.app_src_index_css.button_secondary.l117","scan_id":"20260705T052152Z_9b03d7722a7c","target_git_commit":"19c7911fcdb6a354a33e05f8d50a8ff33151e9a1","artifact":"03_symbols.md","line_start":117,"line_end":117,"sha256":"39ffd8cf4a3636335a3baebcc270c460865e9ef1e1e96f578ab4ac5771f90b09"}

[truncated for context pack]
```

### evidence/01_file_tree.md

```markdown
# File Tree

- .gitignore
- AGENTS.md
- CLAUDE.md
- Makefile
- README.md
- app/.env.local
- app/.env.local.example
- app/.gitignore
- app/.oxlintrc.json
- app/.wrangler/.claude/README.md
- app/.wrangler/.claude/hooks/detect-safety-boundary.sh
- app/.wrangler/.claude/hooks/detect-scope-creep.sh
- app/.wrangler/.claude/hooks/detect-unverified-claim.sh
- app/.wrangler/.claude/rules/docs.md
- app/.wrangler/.claude/rules/security.md
- app/.wrangler/.claude/settings.json
- app/.wrangler/.claude/skills/assess-risk/SKILL.md
- app/.wrangler/.claude/skills/check-claims/SKILL.md
- app/.wrangler/.claude/skills/classify-task/SKILL.md
- app/.wrangler/.claude/skills/control-change/SKILL.md
- app/.wrangler/.claude/skills/create-task/SKILL.md
- app/.wrangler/.claude/skills/distill-memory/SKILL.md
- app/.wrangler/.claude/skills/distill-spec/SKILL.md
- app/.wrangler/.claude/skills/execute-task/SKILL.md
- app/.wrangler/.claude/skills/log-decision/SKILL.md
- app/.wrangler/.claude/skills/plan-refactor/SKILL.md
- app/.wrangler/.claude/skills/plan-skeleton/SKILL.md
- app/.wrangler/.claude/skills/reconcile-task/SKILL.md
- app/.wrangler/.claude/skills/review-project/SKILL.md
- app/.wrangler/.claude/skills/review-task/SKILL.md
- app/.wrangler/.claude/skills/scan-decisions/SKILL.md
- app/.wrangler/.claude/skills/verify-completion/SKILL.md
- app/README.md
- app/e2e/routes.spec.js
- app/index.html
- app/package-lock.json
- app/package.json
- app/playwright.config.js
- app/public/_redirects
- app/public/favicon.svg
- app/public/icons.svg
- app/src/App.css
- app/src/App.jsx
- app/src/assets/hero.png
- app/src/assets/react.svg
- app/src/assets/vite.svg
- app/src/components/ConsultSection.jsx
- app/src/components/Footer.jsx
- app/src/components/Header.jsx
- app/src/data/cases.js
- app/src/data/consultExamples.js
- app/src/data/engineer-profile.js
- app/src/data/services.js
- app/src/index.css
- app/src/lib/aiLimit.js
- app/src/lib/motion.js
- app/src/lib/supabase.js
- app/src/lib/viewTransition.js
- app/src/main.jsx
- app/src/pages/AiConsult.jsx
- app/src/pages/Career.jsx
- app/src/pages/Cases.jsx
- app/src/pages/Contact.jsx
- app/src/pages/Services.jsx
- app/src/pages/Top.jsx
- app/test-results/.last-run.json
- app/vite.config.js
- docs/00_index.md
- docs/01_requirements.md
- docs/02_architecture.md
- docs/03_domain_model.md
- docs/04_workflows.md
- docs/05_data_model.md
- docs/06_error_policy.md
- docs/07_test_strategy.md
- docs/08_release_runbook.md
- docs/archive/ec-shop-brainstorm.md
- docs/archive/kurosawa-workbench-personal-site-brainstorm.md
- docs/decisions/decision-log.md
- docs/memory/README.md
- docs/memory/distilled-memory.md
- docs/memory/memory-candidates.md
- docs/memory/rejected-memory.md
- docs/specs/capability-boundary.md
- docs/specs/change-boundary.md
- docs/specs/evidence-policy.md
- docs/specs/judgment-memory.md
- docs/specs/kurosawa-thin-harness-architecture.md
- docs/specs/runtime-protocol.md
- docs/tasks/README.md
- docs/tasks/active/refactoring-candidates.md
- docs/tasks/backlog/kurosawa-workbench-personal-site-open-questions.md
- docs/tasks/backlog/sales-app-public-readiness.md
- docs/tasks/backlog/sales-site-page-structure.md
- docs/tasks/backlog/アニメーション対策.md
- docs/tasks/done/01-setup-vite-react.md
- docs/tasks/done/02-product-data.md
- docs/tasks/done/03-top-products-ui.md
- docs/tasks/done/04-concierge-screen.md
- docs/tasks/done/05-cart-checkout-complete.md
- docs/tasks/done/06-supabase-edge-functions.md
- docs/tasks/done/07-ai-reranking.md
- docs/tasks/done/08-admin-demo.md
- docs/tasks/done/09-deploy-cloudflare.md
- docs/tasks/done/2026-06-29-fix-product-images.md
- docs/tasks/done/2026-06-29-switch-to-deepseek.md
- docs/tasks/done/どのリポジトリを参考にするか.md
- docs/templates/capability-boundary.md
- docs/templates/change-boundary.md
- docs/templates/decision-log.md
- docs/templates/harness-weight-class.md
- docs/templates/human-judgment-gate.md
- docs/templates/operation-controller.md
- docs/templates/reality-check.md
- docs/templates/task-contract-full.md
- docs/templates/task-contract-lite.md
- docs/templates/tdd-contract.md
- doppler.yaml

[truncated for context pack]
```

### evidence/98_redaction_report.md

```markdown
# Redaction Report

status: passed
redacted_count: 30

checked_keywords:
  - secret
  - token
  - password
  - api_key
  - apikey
  - key

scope:
  - env_secret grep の代入形 (`KEY = ...` / `KEY: <REDACTED>

notes:
  - name / 参照箇所は残し、value のみ `<redacted>` に置換している。
  - これは網羅的な secret スキャンではない（高エントロピー文字列検出は対象外）。
  - env 参照の呼び出し（env::var / os.environ）は value を持たないため redaction 対象外。
```

## Investigated Findings

```markdown
# Investigated Findings

generated_by: dcm investigate
source: non_llm_evidence_investigation
judgment_status: llm_enriched

## observed_signals

- Evidence Pack exists and has the required scan, symbol, config, risk, and scan-limitation files. evidence_ref: file=evidence/00_scan_manifest.md
- Symbol evidence exists for code navigation and candidate responsibility boundaries. evidence_ref: file=evidence/03_symbols.md
- Configuration and environment evidence exists for secret and runtime-risk review. evidence_ref: file=evidence/08_config_env.md
- Static signal evidence exists and must be investigated before draft. evidence_ref: file=evidence/30_static_signal_hits.md
- Scan limitation evidence exists and can inform descriptive current implications when judgment-relevant. evidence_ref: file=evidence/99_scan_limitations.md

## available_evidence_files

- `00_evidence_freshness.md`
- `00_scan_manifest.md`
- `01_file_tree.md`
- `02_files.json`
- `03_symbols.md`
- `04_symbols.json`
- `05_tests.md`
- `07_entrypoints.md`
- `08_config_env.md`
- `09_diff_evidence.md`
- `10_observed_change_signals.json`
- `10_observed_change_signals.md`
- `11_dependency_inventory.json`
- `11_dependency_inventory.md`
- `12_code_metrics.json`
- `12_code_metrics.md`
- `13_public_api_surface.json`
- `13_public_api_surface.md`
- `14_code_excerpts.json`
- `14_code_excerpts.md`
- `15_decision_memory.json`
- `15_decision_memory.md`
- `30_static_signal_hits.md`
- `98_redaction_report.md`
- `99_scan_limitations.md`

## llm_enrichment

## item_meaning_candidates

- The extensive CSS design-token custom properties (`--ink`, `--paper`, `--blueprint`, `--fit-high`, `--sp-*`, `--radius`, `--shadow`, `--font-*`, etc.) in `app/src/index.css` indicate a systematic theme layer, possibly a blueprint/engineering aesthetic with low/high fit color coding. This suggests the UI has explicit visual states for different confidence or suitability levels.  
  *Reference:* `evidence/03_symbols.md` – `app/src/index.css` custom-property symbols (lines 10–66).

- The presence of `ConsultSection`, `AiConsult`, `ConsultPipeline`, `ConsultResult` components, alongside `consultEngineer` (async) and `AiLimitExceededError`, signals a dedicated AI‑powered consultation feature with rate limiting.  
  *Reference:* `evidence/03_symbols.md` – components and functions in `app/src/components/ConsultSection.jsx`, `app/src/pages/AiConsult.jsx`, `app/src/lib/aiLimit.js`, `app/src/lib/supabase.js`.

- The detection of `change_signal` on `app/src/index.css`, `docs/runbooks/frontend-design-rebuild-runbook.md`, and `supabase/config.toml` implies the design system, a related runbook, and Supabase infrastructure were recently modified.  
  *Reference:* `evidence/30_static_signal_hits.md` – rows with `query_id=change_signal:*` and their `evidence_ref`.

- The high hit count for `auth_permission` (86 matches) and `env_secret` (50 matches) suggests the codebase contains a substantial amount of authorization logic and secret references, likely in both frontend and backend code.  
  *Reference:* `evidence/30_static_signal_hits.md` – rows for `auth_permission` and `env_secret`.

- The `job_lifecycle` signal (36 matches) may correlate with the consultation pipeline stages (e.g., state transitions in `ConsultSection.jsx`) or another background job system.  
  *Reference:* `evidence/30_static_signal_hits.md` – `job_lifecycle` hit count; `evidence/03_symbols.md` – `PIPELINE_STAGES` and `stateOf` in `ConsultSection.jsx`.

- The presence of `infra_surface` hits (12 matches) points to traces of infrastructure configuration (likely Supabase or Vite configuration) surfacing in static analysis.  
  *Reference:* `evidence/30_static_signal_hits.md` – `infra_surface` row.

## role_notes

- **Page-level components** – `App` (`app/src/App.jsx`), `Top` (`app/src/pages/Top.jsx`), `Career` (`app/src/pages/Career.jsx`), `Cases` (`app/src/pages/Cases.jsx`), `Contact` (`app/src/pages/Contact.jsx`), `Services` (`app/src/pages/Services.jsx`), `AiConsult` (`app/src/pages/AiConsult.jsx`) – act as route endpoints.  
  *Reference:* `evidence/03_symbols.md` – symbol entries for these files.

- **Consultation pipeline** – `ConsultSection` orchestrates the form/result flow; `ConsultPipeline` renders pipeline stages; `ConsultResult` displays AI output; `stateOf` controls stage transitions.  
  *Reference:* `evidence/03_symbols.md` – `ConsultSection`, `ConsultPipeline`, `ConsultResult`, `stateOf` in `app/src/components/ConsultSection.jsx`.

- **Backend edge function** – `consultEngineer` (`app/src/lib/supabase.js`) is the async client‑side call; `supabase/functions/consult-engineer/index.ts` contains the server‑side handler with constructs `DEEPSEEK_MODEL`, `MAX_INQUIRY_LENGTH`, `CORS`, `FALLBACK`, `SYSTEM_PROMPT`.  
  *Reference:* `evidence/03_symbols.md` – `consultEngineer` in `app/src/lib/supabase.js`; symbols from `supabase/functions/consult-engineer/index.ts`.

- **AI usage governance** – `AiLimitExceededError`, `consumeAiLimit`, and `getAiUsageToday` (`app/src/lib/aiLimit.js`) enforce a daily call budget. `AI_DAILY_LIMIT` (`app/vite.config.js`) sets the limit.  
  *Reference:* `evidence/03_symbols.md` – symbols from `app/src/lib/aiLimit.js` and `app/vite.config.js`.

- **Design system constants** – `EASE` (`app/src/lib/motion.js`) likely contains animation easing values; `startViewTransition` (`app/src/lib/viewTransition.js`) abstracts browser view‑transition API.  
  *Reference:* `evidence/03_symbols.md` – `EASE` in `app/src/lib/motion.js`, `startViewTransition` in `app/src/lib/viewTransition.js`.

- **Environment configuration** – `VITE_SUPABASE_ANON_KEY` and `VITE_SUPABASE_URL` are consumed in `app/src/lib/supabase.js` to initialise the Supabase client.  
  *Reference:* `evidence/08_config_env.md` – `found_in` for both variables.

## current_implications

- The application is a full‑stack web system (profiles: `css,html,infra,node,typescript`) with a React‑style frontend and a Supabase backend powered by edge functions. The scan covered 141 files, extracted 430 symbols, and found 2 tests and 2 entrypoints.  
  *Reference:* `evidence/00_scan_manifest.md` – detected profiles, counts.

- The AI consultation feature is live and uses a daily limit. The presence of `AiLimitExceededError` indicates the app explicitly handles over‑quota scenarios.  
  *Reference:* `evidence/03_symbols.md` – `AiLimitExceededError`; `evidence/08_config_env.md` – `AI_DAILY_LIMIT` (as a component in vite.config.js).

- The design system is rich and likely supports responsive layout (spacing scale, max-width variable `--maxw`). The blueprint‑themed custom properties (`--blueprint`, `--blueprint-ink`) suggest a visual identity evoking engineering diagrams.  
  *Reference:* `evidence/03_symbols.md` – CSS custom properties in `app/src/index.css`.

- The configuration variables (`VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_URL`) are required by the Supabase client. Their presence in the scan confirms they are actively used, but their requiredness and default values are not confirmed.  
  *Reference:* `evidence/08_config_env.md` – variable entries.

- Static signal hits imply the codebase has extensive authentication/authorization logic (86 `auth_permission` hits), references to secrets (50 `env_secret` hits), and potential high‑risk operations (6 `high_risk_ops` hits). These are observations only and do not indicate defects.  
  *Reference:* `evidence/30_static_signal_hits.md` – hit counts; `evidence/99_scan_limitations.md` – limitations on grep coverage.

- The change signals on multiple files indicate the project is under active development, particularly the design system, the consultation component, the Supabase configuration, and the top page.  
  *Reference:* `evidence/30_static_signal_hits.md` – `change_signal` rows.

## uncertainty_notes

- The responsibilities of all 430 extracted symbols are not yet determined (per `evidence/99_scan_limitations.md`). Many CSS classes and components may serve roles that are not immediately inferable from symbol names alone.

- The requiredness, optionality, and default values for `VITE_SUPABASE_ANON_KEY` and `VITE_SUPABASE_URL` are unknown (`evidence/08_config_env.md` – “requiredness: unknown”, “default 値は解析していない”). Secret handling for these values is also not assessed.

- A line in `supabase/functions/consult-engineer/index.ts` is `<REDACTED>`. Its content is unknown but likely contains sensitive information (e.g., an API key or token).  
  *Reference:* `evidence/03_symbols.md` – line 4 redacted in that file.

- The two tests and two entrypoints identified by the scan are not specified in the provided evidence; their exact locations and purposes are uncertain.

- The grep‑based signals (`env_secret`, `high_risk_ops`, etc.) are vocabulary‑dependent. “No‑hit” for `todos` does not prove absence of TODOs in the codebase (`evidence/99_scan_limitations.md`). Similarly, 50 `env_secret` hits may include false positives or duplicate references.

- The coverage warning about unsupported extensions (`example`, `local`, `png`, `sh`, `svg`, `toml`) means some files were skipped. Relevant configuration or documentation in `.toml` or `.sh` files may have been missed.  
  *Reference:* `evidence/00_scan_manifest.md` – coverage_warnings.


[truncated for context pack]
```
