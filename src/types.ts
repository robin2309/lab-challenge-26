export type ResourceType = 'Vidéo' | 'Audio' | 'Image' | 'Interactif' | 'PDF'

export type ResourceKind = 'generateur' | 'cahier' | 'jeu-papier' | 'jeu-num' | 'video' | 'document' | 'carte' | 'labo'

export interface Resource {
  id: string
  title: string
  kind: ResourceKind
  type: ResourceType
  description: string
  tags: string[]
}


export type Modality = 'Individuel' | 'Binôme' | 'Groupe' | 'Classe entière'
export type Differentiation = 'Standard' | 'Renforcement' | 'Approfondissement'

export interface Placement {
  uid: string
  momentId: string
  resourceId: string
  modality: Modality
  differentiation: Differentiation
  note: string
  aiApparatus: boolean
}

export interface Draft {
  level: string | null
  subject: string | null
  theme: string | null
  title: string
  moments: string[]
  apparatus: Record<string, string> // texte de l'appareil pédagogique par placement
  placements: Placement[]
}
