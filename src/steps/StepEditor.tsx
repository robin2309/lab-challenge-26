import { useState } from 'react'
import { RESOURCES, TYPES } from '../data'
import { generateApparatus, hasApiKey } from '../ai'
import type { Draft } from '../types'

export function StepEditor({ draft, setDraft, onBack }: { draft: Draft; setDraft: (d: Draft) => void; onBack: () => void }) {
  const ordered = [...draft.placements].sort((a, b) => draft.moments.indexOf(a.momentId) - draft.moments.indexOf(b.momentId))
  const [uid, setUid] = useState<string | null>(ordered[0]?.uid ?? null)
  const [loading, setLoading] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const sel = ordered.find(p => p.uid === uid)
  const res = sel && RESOURCES.find(r => r.id === sel.resourceId)

  const setText = (id: string, text: string) => setDraft({ ...draft, apparatus: { ...draft.apparatus, [id]: text } })

  const generate = async (id: string, current: Draft = draft) => {
    const p = current.placements.find(x => x.uid === id)!
    const r = RESOURCES.find(x => x.id === p.resourceId)!
    setLoading(s => new Set(s).add(id))
    setError(null)
    try {
      const text = await generateApparatus(current, r)
      setDraft({ ...current, apparatus: { ...current.apparatus, [id]: text } })
      return { ...current, apparatus: { ...current.apparatus, [id]: text } }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      return current
    } finally {
      setLoading(s => { const n = new Set(s); n.delete(id); return n })
    }
  }
  const generateAll = async () => {
    let current = draft
    for (const p of ordered) if (!current.apparatus[p.uid]) current = await generate(p.uid, current)
  }

  const stepOf = (momentId: string) => draft.moments.indexOf(momentId) + 1

  return (
    <div className="page editor-page">
      <div className="page__head">
        <div>
          <h1>Appareil pédagogique</h1>
          <p className="lead">{draft.title} · {ordered.length} ressource{ordered.length > 1 ? 's' : ''}</p>
        </div>
        <div className="editor__head-actions">
          <button className="btn" onClick={onBack}>← Retour</button>
          <button className="btn btn--primary" onClick={generateAll} disabled={loading.size > 0}>✨ Tout générer avec l’IA</button>
        </div>
      </div>
      {!hasApiKey && <div className="banner">Mode démo : aucune clé API détectée (<code>VITE_ANTHROPIC_API_KEY</code> dans <code>.env.local</code>). Les textes générés sont des exemples.</div>}
      {error && <div className="banner banner--error">{error}</div>}

      <div className="editor">
        <aside className="editor__list">
          {ordered.map(p => {
            const r = RESOURCES.find(x => x.id === p.resourceId)!
            const t = TYPES[r.type]
            return (
              <button key={p.uid} className={`eitem ${uid === p.uid ? 'eitem--on' : ''}`} style={{ ['--kind' as string]: t.color }} onClick={() => setUid(p.uid)}>
                <span className="eitem__meta">Étape {stepOf(p.momentId)} · {t.icon} {r.type}</span>
                <strong>{r.title}</strong>
                <small>{loading.has(p.uid) ? '⏳ Génération…' : draft.apparatus[p.uid] ? '✓ Appareil rédigé' : 'Pas encore d’appareil'}</small>
              </button>
            )
          })}
        </aside>
        <section className="editor__main">
          {sel && res ? (
            <>
              <div className="editor__bar">
                <div><h3>{res.title}</h3><small>Étape {stepOf(sel.momentId)} · {res.type}</small></div>
                <button className="btn btn--sm" onClick={() => generate(sel.uid)} disabled={loading.has(sel.uid)}>
                  {loading.has(sel.uid) ? 'Génération…' : draft.apparatus[sel.uid] ? '✨ Régénérer' : '✨ Générer'}
                </button>
              </div>
              <textarea
                className="editor__text"
                value={draft.apparatus[sel.uid] ?? ''}
                placeholder="Rédigez l’appareil pédagogique ou cliquez sur « Générer »…"
                onChange={e => setText(sel.uid, e.target.value)}
              />
            </>
          ) : <div className="panel panel--empty">Aucune ressource sélectionnée.</div>}
        </section>
      </div>
    </div>
  )
}
