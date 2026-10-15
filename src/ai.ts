import type { Draft, Resource } from './types'

const KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined
const MODEL = (import.meta.env.VITE_ANTHROPIC_MODEL as string | undefined) || 'claude-sonnet-4-5'

export const hasApiKey = Boolean(KEY)

function prompt(draft: Draft, r: Resource) {
  return `Tu es un concepteur pédagogique pour Lelivrescolaire.fr. Rédige en français l'appareil pédagogique de la ressource suivante, destiné à un enseignant.

Ressource : « ${r.title} » (type : ${r.type})
Séance : ${draft.title || draft.theme || 'non précisée'}
Niveau : ${draft.level ?? 'non précisé'} · Matière : ${draft.subject ?? 'non précisée'}

Structure attendue (texte simple, titres en majuscules, pas de markdown lourd) :
OBJECTIFS D'APPRENTISSAGE (2 à 3)
CONSIGNE ÉLÈVE (courte, claire)
QUESTIONS (4 à 5, de difficulté croissante)
GLOSSAIRE (3 à 5 termes)
PISTES DE DIFFÉRENCIATION (renforcement / approfondissement)
ÉLÉMENTS DE CORRECTION`
}

function mock(draft: Draft, r: Resource) {
  return `OBJECTIFS D'APPRENTISSAGE
- Maîtriser la notion travaillée dans « ${r.title} ».
- Réinvestir la notion dans une situation proche de celles du cours.

CONSIGNE ÉLÈVE
Utilise la ressource (${r.type}) puis réponds aux questions ci-dessous dans ton cahier.

QUESTIONS
1. Que peux-tu dire de la situation proposée ?
2. Quelle méthode utilises-tu pour répondre ?
3. Vérifie ton résultat avec une autre méthode.
4. Explique ta démarche à un camarade.

GLOSSAIRE
- (termes clés de « ${draft.theme ?? r.title} »)

PISTES DE DIFFÉRENCIATION
- Renforcement : aide méthodologique pas à pas.
- Approfondissement : variante avec des nombres plus complexes.

ÉLÉMENTS DE CORRECTION
(Exemple généré en mode démo : aucune clé API détectée.)`
}

export async function generateApparatus(draft: Draft, r: Resource): Promise<string> {
  if (!KEY) {
    await new Promise(res => setTimeout(res, 700))
    return mock(draft, r)
  }
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': KEY,
      'anthropic-version': '2023-06-01',
      // POC uniquement : appel direct depuis le navigateur (la clé est visible côté client)
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 1500, messages: [{ role: 'user', content: prompt(draft, r) }] }),
  })
  if (!res.ok) throw new Error(`API Anthropic ${res.status} : ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  return (data.content as { type: string; text?: string }[]).filter(b => b.type === 'text').map(b => b.text).join('\n')
}
