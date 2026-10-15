import { TYPES, RESOURCES } from '../data'
import type { Placement } from '../types'

const Y_PATTERN = [72, 34, 78, 34]
const W = 1000

function geometry(n: number) {
  const xs = Array.from({ length: n }, (_, i) => ((i + 0.5) / n) * W)
  const ys = xs.map((_, i) => Y_PATTERN[i % Y_PATTERN.length])
  let d = `M0,${ys[0]} L${xs[0]},${ys[0]}`
  for (let i = 1; i < n; i++) {
    const mx = (xs[i - 1] + xs[i]) / 2
    d += ` C${mx},${ys[i - 1]} ${mx},${ys[i]} ${xs[i]},${ys[i]}`
  }
  d += ` L${W},${ys[n - 1]}`
  return { xs, ys, d }
}

interface Props {
  moments: string[]
  placements: Placement[]
  mode: 'assemble' | 'refine'
  selectedMoment?: string | null
  onSelectMoment?: (id: string) => void
  onAddMoment?: () => void
  onRemoveMoment?: (id: string) => void
  selectedUid?: string | null
  onSelectPlacement?: (uid: string) => void
  onRemove?: (uid: string) => void
}

export function Timeline({ moments, placements, mode, selectedMoment, onSelectMoment, onAddMoment, onRemoveMoment, selectedUid, onSelectPlacement, onRemove }: Props) {
  const n = moments.length
  const { xs, ys, d } = geometry(n)
  return (
    <div className="timeline">
      {mode === 'assemble' && (
        <div className="timeline__tools">
          <button className="btn btn--sm" onClick={onAddMoment}>+ Ajouter une étape</button>
        </div>
      )}
      <div className="timeline__scroll">
        <div className="timeline__inner" style={{ minWidth: n * 190 }}>
          <div className="timeline__wave">
            <svg viewBox={`0 0 ${W} 110`} preserveAspectRatio="none" aria-hidden>
              <path d={d} className="timeline__path" vectorEffect="non-scaling-stroke" />
            </svg>
            {moments.map((id, i) => {
              const count = placements.filter(p => p.momentId === id).length
              return (
                <button
                  key={id}
                  className={`node ${selectedMoment === id ? 'node--active' : ''} ${count ? 'node--filled' : ''}`}
                  style={{ left: `${xs[i] / 10}%`, top: `${(ys[i] / 110) * 100}%` }}
                  onClick={() => onSelectMoment?.(id)}
                  disabled={mode === 'refine'}
                  aria-label={`Étape ${i + 1} (${count} ressource${count > 1 ? 's' : ''})`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="timeline__cols" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
            {moments.map((id, i) => {
              const items = placements.filter(p => p.momentId === id)
              const active = selectedMoment === id
              return (
                <section key={id} className={`col ${active ? 'col--active' : ''}`} onClick={() => mode === 'assemble' && onSelectMoment?.(id)}>
                  {mode === 'assemble' && n > 2 && items.length === 0 && (
                    <button className="col__x" onClick={e => { e.stopPropagation(); onRemoveMoment?.(id) }} aria-label={`Supprimer l’étape ${i + 1}`} title="Supprimer cette étape vide">×</button>
                  )}
                  {items.length === 0 && (
                    <div className="slot-empty">{mode === 'assemble' ? (active ? 'Choisissez une ressource ci-dessous' : 'Cliquer pour sélectionner') : 'Aucune ressource'}</div>
                  )}
                  {items.map(p => {
                    const res = RESOURCES.find(r => r.id === p.resourceId)!
                    const k = TYPES[res.type]
                    const sel = selectedUid === p.uid
                    return (
                      <article
                        key={p.uid}
                        className={`pcard ${sel ? 'pcard--selected' : ''}`}
                        style={{ ['--kind' as string]: k.color }}
                        onClick={e => { if (mode === 'refine') { e.stopPropagation(); onSelectPlacement?.(p.uid) } }}
                      >
                        <span className="pcard__icon">{k.icon}</span>
                        <div className="pcard__body">
                          <strong>{res.title}</strong>
                          {mode === 'refine' && p.aiApparatus && <em className="chip chip--ai">✨ Appareil péda.</em>}
                        </div>
                        {mode === 'assemble' && (
                          <button className="pcard__x" onClick={e => { e.stopPropagation(); onRemove?.(p.uid) }} aria-label="Retirer">×</button>
                        )}
                      </article>
                    )
                  })}
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
