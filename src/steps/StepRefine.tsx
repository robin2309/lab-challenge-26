import { useState } from 'react'
import { TYPES, RESOURCES } from '../data'
import type { Draft, Placement } from '../types'
import { Timeline } from '../components/Timeline'


export function StepRefine({ draft, setDraft, onBack, onValidate }: { draft: Draft; setDraft: (d: Draft) => void; onBack: () => void; onValidate: () => void }) {
  const [uid, setUid] = useState<string | null>(draft.placements[0]?.uid ?? null)
  const sel = draft.placements.find(p => p.uid === uid)
  const res = sel && RESOURCES.find(r => r.id === sel.resourceId)
  const count = draft.placements.length

  const patch = (changes: Partial<Placement>) => setDraft({ ...draft, placements: draft.placements.map(p => (p.uid === uid ? { ...p, ...changes } : p)) })
  const moveTo = (dir: -1 | 1) => {
    if (!sel) return
    const i = draft.moments.indexOf(sel.momentId) + dir
    if (i >= 0 && i < draft.moments.length) patch({ momentId: draft.moments[i] })
  }
  const remove = () => {
    setDraft({ ...draft, placements: draft.placements.filter(p => p.uid !== uid) })
    setUid(null)
  }

  return (
    <div className="page">
      <div className="page__head">
        <div className="titlefield">
          <label>Titre de la séance</label>
          <input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} />
        </div>
        <div className="summary"><b>{count}</b> ressource{count > 1 ? 's' : ''}</div>
      </div>

      <Timeline moments={draft.moments} placements={draft.placements} mode="refine" selectedUid={uid} onSelectPlacement={setUid} />

      <div className="refine">
        {sel && res ? (
          <div className="panel">
            <div className="panel__head">
              <span className="pcard__icon" style={{ ['--kind' as string]: TYPES[res.type].color }}>{TYPES[res.type].icon}</span>
              <div><h3>{res.title}</h3><small>{res.type} · étape {draft.moments.indexOf(sel.momentId) + 1}</small></div>
            </div>
            <label className="panel__note">Note pour la séance
              <textarea rows={2} placeholder="Consigne, rappel, matériel à prévoir…" value={sel.note} onChange={e => patch({ note: e.target.value })} />
            </label>
            <label className="check">
              <input type="checkbox" checked={sel.aiApparatus} onChange={e => patch({ aiApparatus: e.target.checked })} />
              ✨ Ajouter un appareil pédagogique généré par l’IA (questions, aide, glossaire)
            </label>
            <div className="panel__actions">
              <button className="btn btn--sm" onClick={() => moveTo(-1)}>← Étape précédente</button>
              <button className="btn btn--sm" onClick={() => moveTo(1)}>Étape suivante →</button>
              <button className="btn btn--sm btn--danger" onClick={remove}>Retirer</button>
            </div>
          </div>
        ) : (
          <div className="panel panel--empty">Cliquez sur une ressource de la timeline pour l’affiner.</div>
        )}
      </div>

      <div className="actions actions--inline">
        <button className="btn" onClick={onBack}>← Modifier l’assemblage</button>
        <button className="btn btn--primary" disabled={draft.placements.length === 0} onClick={onValidate}>Valider la séance ✓</button>
      </div>
    </div>
  )
}
