import { useState } from 'react'
import type { Draft } from '../types'
import { Timeline } from '../components/Timeline'
import { ResourceTray } from '../components/ResourceTray'

export function StepAssemble({ draft, setDraft, onBack, onNext }: { draft: Draft; setDraft: (d: Draft) => void; onBack: () => void; onNext: () => void }) {
  const [moment, setMoment] = useState<string | null>('m1')
  const idx = draft.moments.indexOf(moment ?? '')
  const targetLabel = idx >= 0 ? `Étape ${idx + 1}` : null

  const add = (resourceId: string) => {
    if (!moment) return
    setDraft({
      ...draft,
      placements: [...draft.placements, {
        uid: crypto.randomUUID(), momentId: moment, resourceId,
        modality: 'Classe entière', differentiation: 'Standard', note: '', aiApparatus: false,
      }],
    })
  }
  const addMoment = () => {
    const id = 'm' + crypto.randomUUID().slice(0, 6)
    setDraft({ ...draft, moments: [...draft.moments, id] })
    setMoment(id)
  }
  const removeMoment = (id: string) => {
    setDraft({ ...draft, moments: draft.moments.filter(m => m !== id) })
    if (moment === id) setMoment(null)
  }
  const remove = (uid: string) => setDraft({ ...draft, placements: draft.placements.filter(p => p.uid !== uid) })

  return (
    <div className="page page--tray">
      <div className="page__head">
        <div>
          <h1>Assemblez votre séance</h1>
          <p className="lead">{draft.theme} · {draft.subject} · {draft.level}</p>
        </div>
        <div className="summary"><b>{draft.placements.length}</b> ressource{draft.placements.length > 1 ? 's' : ''}</div>
      </div>
      <Timeline moments={draft.moments} onAddMoment={addMoment} onRemoveMoment={removeMoment} placements={draft.placements} mode="assemble" selectedMoment={moment} onSelectMoment={setMoment} onRemove={remove} />
      <div className="actions actions--inline">
        <button className="btn" onClick={onBack}>← Retour</button>
        <button className="btn btn--primary" disabled={draft.placements.length === 0} onClick={onNext}>Valider la structure →</button>
      </div>
      <ResourceTray placements={draft.placements} targetLabel={targetLabel} onAdd={add} />
    </div>
  )
}
