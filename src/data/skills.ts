// EXPORTS: ISkill, MOCK_SKILLS
export interface ISkill {
  id: string
  name: string
  category: 'design' | 'video' | '3d' | 'ai'
  level: 'proficient' | 'skilled' | 'familiar'
}

export const MOCK_SKILLS: ISkill[] = [
  { id: '1', name: 'Photoshop', category: 'design', level: 'proficient' },
  { id: '2', name: 'Illustrator', category: 'design', level: 'proficient' },
  { id: '3', name: 'InDesign', category: 'design', level: 'proficient' },
  { id: '4', name: 'Figma', category: 'design', level: 'proficient' },
  { id: '5', name: '剪映', category: 'video', level: 'proficient' },
  { id: '6', name: 'Premiere', category: 'video', level: 'skilled' },
  { id: '7', name: '达芬奇', category: 'video', level: 'skilled' },
  { id: '8', name: 'Blender', category: '3d', level: 'skilled' },
  { id: '9', name: 'Cinema 4D', category: '3d', level: 'familiar' },
  { id: '10', name: '即梦AI', category: 'ai', level: 'skilled' },
  { id: '11', name: '可灵AI', category: 'ai', level: 'skilled' },
  { id: '12', name: 'LikeAI', category: 'ai', level: 'proficient' },
]