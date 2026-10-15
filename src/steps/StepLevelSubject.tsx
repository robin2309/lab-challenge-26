import { LEVELS, SUBJECTS, THEMES } from '../data'
import type { Draft } from '../types'

export function StepLevelSubject({ draft, setDraft, onNext }: { draft: Draft; setDraft: (d: Draft) => void; onNext: () => void }) {
  const themes = draft.subject ? THEMES[draft.subject] : []
  const ready = draft.level && draft.subject && draft.theme
  return (
    <div className="page page--narrow">
      <h1>Pour quelle classe préparez-vous votre cours ?</h1>
      <p className="lead">Nous vous proposerons les ressources Lelivrescolaire adaptées au programme.</p>

      <h2 className="label">1. Niveau</h2>
      <div className="choices">
        {LEVELS.map(l => (
          <button key={l.id} className={`choice ${draft.level === l.id ? 'choice--on' : ''}`} onClick={() => setDraft({ ...draft, level: l.id })}>
            <strong>{l.label}</strong><small>{l.cycle}</small>
          </button>
        ))}
      </div>

      <h2 className="label">2. Matière</h2>
      <div className="choices choices--wide">
        {SUBJECTS.map(s => (
          <button
            key={s.id}
            className={`choice choice--subject ${draft.subject === s.id ? 'choice--on' : ''}`}
            style={{ ['--kind' as string]: s.color }}
            onClick={() => setDraft({ ...draft, subject: s.id, theme: null, title: '' })}
          >
            <span className="choice__icon">{s.icon}</span><strong>{s.id}</strong>
          </button>
        ))}
      </div>

      {draft.subject && (
        <>
          <h2 className="label">3. Thème de la séance</h2>
          <div className="choices choices--list">
            {themes.map(t => (
              <button key={t} className={`choice choice--row ${draft.theme === t ? 'choice--on' : ''}`} onClick={() => setDraft({ ...draft, theme: t, title: t })}>
                {t}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="actions">
        <button className="btn btn--primary" disabled={!ready} onClick={onNext}>Continuer vers l’assemblage →</button>
      </div>
    </div>
  )
}
