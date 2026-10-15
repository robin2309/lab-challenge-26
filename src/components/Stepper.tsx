const STEPS = ['Niveau & matière', 'Assemblage de la séance', 'Validation & affinement']

export function Stepper({ step, maxStep, onGo }: { step: number; maxStep: number; onGo: (s: number) => void }) {
  return (
    <ol className="stepper">
      {STEPS.map((label, i) => {
        const state = i === step ? 'current' : i < step ? 'done' : 'todo'
        const clickable = i <= maxStep && i !== step
        return (
          <li key={label} className={`stepper__item stepper__item--${state}`}>
            <button disabled={!clickable} onClick={() => onGo(i)}>
              <span className="stepper__dot">{state === 'done' ? '✓' : i + 1}</span>
              <span className="stepper__label">{label}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
