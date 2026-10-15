import { useState } from 'react'
import type { Draft } from './types'
import { DEFAULT_MOMENTS } from './data'
import { Stepper } from './components/Stepper'
import { StepLevelSubject } from './steps/StepLevelSubject'
import { StepAssemble } from './steps/StepAssemble'
import { StepRefine } from './steps/StepRefine'
import { Done } from './steps/Done'
import { StepEditor } from './steps/StepEditor'

const EMPTY: Draft = { level: null, subject: null, theme: null, title: '', moments: DEFAULT_MOMENTS, apparatus: {}, placements: [] }

export default function App() {
  const [step, setStep] = useState(0)
  const [maxStep, setMaxStep] = useState(0)
  const [view, setView] = useState<'flow' | 'done' | 'editor'>('flow')
  const [draft, setDraft] = useState<Draft>(EMPTY)

  const go = (s: number) => { setStep(s); setMaxStep(m => Math.max(m, s)); window.scrollTo(0, 0) }
  const finished = view !== 'flow'

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand"><span className="brand__logo">lls</span> Créer un cours</div>
        <Stepper step={finished ? 3 : step} maxStep={finished ? 3 : maxStep} onGo={s => { setView('flow'); go(s) }} />
        <div className="topbar__right" />
      </header>
      {view === 'editor' ? (
        <StepEditor draft={draft} setDraft={setDraft} onBack={() => setView('done')} />
      ) : view === 'done' ? (
        <Done draft={draft} onGenerate={() => setView('editor')} onRestart={() => { setDraft(EMPTY); setView('flow'); setStep(0); setMaxStep(0) }} />
      ) : step === 0 ? (
        <StepLevelSubject draft={draft} setDraft={setDraft} onNext={() => go(1)} />
      ) : step === 1 ? (
        <StepAssemble draft={draft} setDraft={setDraft} onBack={() => go(0)} onNext={() => go(2)} />
      ) : (
        <StepRefine draft={draft} setDraft={setDraft} onBack={() => go(1)} onValidate={() => setView('done')} />
      )}
    </div>
  )
}
