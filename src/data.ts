import type { Resource, ResourceKind, ResourceType } from './types'

export const LEVELS = [
  { id: '6e', label: '6e', cycle: 'Cycle 3' },
  { id: '5e', label: '5e', cycle: 'Cycle 4' },
  { id: '4e', label: '4e', cycle: 'Cycle 4' },
  { id: '3e', label: '3e', cycle: 'Cycle 4' },
  { id: '2nde', label: '2nde', cycle: 'Lycée' },
  { id: '1ere', label: '1re', cycle: 'Lycée' },
  { id: 'Tle', label: 'Terminale', cycle: 'Lycée' },
]

export const SUBJECTS = [
  { id: 'Histoire-Géographie', icon: '🌍', color: '#d97706' },
  { id: 'Mathématiques', icon: '📐', color: '#2563eb' },
  { id: 'Français', icon: '📖', color: '#db2777' },
  { id: 'SVT', icon: '🧬', color: '#16a34a' },
  { id: 'Physique-Chimie', icon: '⚗️', color: '#7c3aed' },
  { id: 'Anglais', icon: '💬', color: '#0891b2' },
]

export const THEMES: Record<string, string[]> = {
  'Histoire-Géographie': ['Les Lumières et la Révolution', 'La Première Guerre mondiale', 'Les mobilités humaines'],
  Mathématiques: ['Fonctions affines', 'Théorème de Pythagore', 'Probabilités'],
  Français: ['Le récit d’aventures', 'La poésie lyrique', 'Argumenter'],
  SVT: ['La cellule', 'Génétique et hérédité', 'Écosystèmes'],
  'Physique-Chimie': ['Les circuits électriques', 'Les transformations chimiques', 'Mouvement et forces'],
  Anglais: ['Talking about the past', 'Cultural diversity', 'Future plans'],
}

export const DEFAULT_MOMENTS = ['m1', 'm2', 'm3', 'm4']

export const TYPES: Record<ResourceType, { icon: string; color: string }> = {
  Vidéo: { icon: '🎬', color: '#dc2626' },
  Audio: { icon: '🎧', color: '#d97706' },
  Image: { icon: '🖼️', color: '#16a34a' },
  Interactif: { icon: '🧮', color: '#4f46e5' },
  PDF: { icon: '📄', color: '#0f766e' },
}

export const TYPE_LIST = Object.keys(TYPES) as ResourceType[]

export const KINDS: Record<ResourceKind, { label: string; icon: string; color: string }> = {
  generateur: { label: 'Générateur d’exercices', icon: '🧮', color: '#4f46e5' },
  cahier: { label: 'Cahier', icon: '📓', color: '#2563eb' },
  'jeu-papier': { label: 'Jeu déployable', icon: '🎲', color: '#d97706' },
  'jeu-num': { label: 'Jeu numérique', icon: '🎮', color: '#7c3aed' },
  video: { label: 'Vidéo', icon: '🎬', color: '#dc2626' },
  document: { label: 'Document', icon: '📄', color: '#0f766e' },
  carte: { label: 'Carte / infographie', icon: '🗺️', color: '#16a34a' },
  labo: { label: 'Livret labo & affiches', icon: '🔬', color: '#db2777' },
}

// POC : liste de ressources identique quels que soient le niveau et la matière choisis.
// Source : https://www.lelivrescolaire.fr/manuels/mathematiques-5eme-2026/ressources
export const RESOURCES: Resource[] = [
  { id: 'g1', title: 'Additionner et soustraire des fractions', kind: 'generateur', type: 'Image', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g2', title: 'Reconnaître une situation de proportionnalité', kind: 'generateur', type: 'Audio', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g3', title: 'Lier une expression à une probabilité', kind: 'generateur', type: 'Interactif', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g4', title: 'Positionner un événement sur une échelle de probabilités', kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g5', title: 'Identifier des polygones particuliers', kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g6', title: "Calculer le troisième angle d'un triangle", kind: 'generateur', type: 'PDF', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g7', title: 'Reconnaître un triangle particulier', kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g8', title: "Déterminer différentes écritures d'un nombre", kind: 'generateur', type: 'Image', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g9', title: 'Connaître le vocabulaire des angles', kind: 'generateur', type: 'PDF', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g10', title: "Reconnaître et construire le symétrique d'un point par rapport à une droite", kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g11', title: 'Convertir des unités de volume', kind: 'generateur', type: 'PDF', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g12', title: 'Reconnaître un patron de cube', kind: 'generateur', type: 'Audio', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g13', title: "Dénombrer le nombre de cubes d'un empilement", kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g14', title: 'Placer un nombre décimal sur une demi-droite', kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g15', title: 'Compléter une suite de motifs évolutive', kind: 'generateur', type: 'Interactif', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g16', title: 'Calculer un pourcentage', kind: 'generateur', type: 'Interactif', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g17', title: "Écrire une fraction sous la forme d'un nombre mixte", kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g18', title: 'Compléter une addition à trou', kind: 'generateur', type: 'Audio', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g19', title: 'Additionner et soustraire des décimaux', kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g20', title: 'Multiplier des nombres décimaux', kind: 'generateur', type: 'PDF', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g21', title: 'Trouver des diviseurs', kind: 'generateur', type: 'Interactif', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g22', title: 'Connaître les critères de divisibilité', kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g23', title: 'Connaître les tables de multiplication', kind: 'generateur', type: 'PDF', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g24', title: 'Résoudre un problème de proportionnalité', kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g25', title: "Convertir des unités d'aires", kind: 'generateur', type: 'Audio', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g26', title: "Lire l'abscisse d'un point", kind: 'generateur', type: 'PDF', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g27', title: "Calculer une fraction d'un nombre", kind: 'generateur', type: 'Vidéo', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g28', title: 'Comparer deux fractions', kind: 'generateur', type: 'PDF', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g29', title: 'Comprendre le lien entre fraction et quotient', kind: 'generateur', type: 'PDF', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
  { id: 'g30', title: "Passer de l'écriture fractionnaire à l'écriture décimale", kind: 'generateur', type: 'Interactif', description: 'Générateur d’exercices avec correction automatique.', tags: [] },
]
