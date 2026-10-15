import { RESOURCES } from '../data'
import type { Draft } from '../types'

export function Done({ draft, onRestart, onGenerate }: { draft: Draft; onRestart: () => void; onGenerate: () => void }) {
  return (
    <div className="page page--narrow done">
      <div className="done__badge">✓</div>
      <h1>Séance « {draft.title} » validée</h1>
      <p className="lead">{draft.placements.length} ressources · {draft.subject} {draft.level}</p>
      <ul className="recap">
        {draft.moments.map((m, i) => {
          const items = draft.placements.filter(p => p.momentId === m)
          if (!items.length) return null
          return <li key={m}><b>Étape {i + 1}</b>{items.map(p => RESOURCES.find(r => r.id === p.resourceId)!.title).join(' · ')}</li>
        })}
      </ul>
      <p className="muted">Prochaine étape : génération des supports (cours éditable + PPT).</p>
      <div className="actions">
        <button className="btn" onClick={onRestart}>Créer un autre cours</button>
        <button className="btn btn--primary" onClick={onGenerate}>Générer les supports →</button>
      </div>
    </div>
  )
}
