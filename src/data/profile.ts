// EXPORTS: IProfile, MOCK_PROFILE
export interface IProfile {
  id: string
  name: string
  title: string
  avatarUrl: string
  school: string
  major: string
  educationPeriod: string
  bio: string
  phone: string
  email: string
  location: string
  honors: string[]
}

export const MOCK_PROFILE: IProfile = {
  id: '1',
  name: '孙悦',
  title: '视觉设计师',
  avatarUrl: import.meta.env.BASE_URL + 'images/avatar.png',
  school: '南京艺术学院',
  major: '视觉传达设计',
  educationPeriod: '2021.09 - 2025.06',
  bio: '专注于视觉设计与跨媒介创作，擅长将传统美学与现代数字技术融合，用设计讲故事。',
  phone: '18651907563',
  email: '2269356609@qq.com',
  location: '南京 · Nanjing',
  honors: ['未来设计师大赛江苏省二等奖', '紫金奖最具人气奖优秀奖', 'GCROSS铜奖'],
}