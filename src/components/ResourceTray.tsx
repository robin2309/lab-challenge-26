import { useState } from 'react'
import { RESOURCES, TYPES, TYPE_LIST } from '../data'
import type { Placement, ResourceType } from '../types'

interface Props {
  placements: Placement[]
  targetLabel: string | null
  onAdd: (resourceId: string) => void
}

export function ResourceTray({ placements, targetLabel, onAdd }: Props) {
  const [type, setType] = useState<ResourceType | 'all'>('all')
  const list = RESOURCES.filter(r => type === 'all' || r.type === type)
  return (
    <footer className="tray">
      <div className="tray__bar">
        <div className="tray__title">
          <strong>Ressources ({list.length})</strong>
          <span>{targetLabel ? <>Ajout dans : <b>{targetLabel}</b></> : 'Sélectionnez une étape de la timeline'}</span>
        </div>
        <div className="tray__filters">
          <button className={type === 'all' ? 'on' : ''} onClick={() => setType('all')}>Tout</button>
          {TYPE_LIST.map(t => (
            <button key={t} className={type === t ? 'on' : ''} onClick={() => setType(t)}>{TYPES[t].icon} {t}</button>
          ))}
        </div>
      </div>
      <div className="tray__list">
        {list.map(r => {
          const t = TYPES[r.type]
          const n = placements.filter(p => p.resourceId === r.id).length
          return (
            <button key={r.id} className="rcard" style={{ ['--kind' as string]: t.color }} onClick={() => onAdd(r.id)} disabled={!targetLabel}>
              <span className="rcard__kind">{t.icon} {r.type}</span>
              <strong>{r.title}</strong>
              <small>{r.description}</small>
              {n > 0 && <span className="rcard__foot"><i>✓ ajouté{n > 1 ? ` ×${n}` : ''}</i></span>}
            </button>
          )
        })}
      </div>
    </footer>
  )
}
