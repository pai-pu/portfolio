// EXPORTS: IHonor, MOCK_HONORS
export interface IHonor {
  id: string
  title: string
  award: string
  year: string
}

export const MOCK_HONORS: IHonor[] = [
  {
    id: '1',
    title: '未来设计师大赛',
    award: '江苏省二等奖',
    year: '2024',
  },
  {
    id: '2',
    title: '紫金奖',
    award: '最具人气奖优秀奖',
    year: '2024',
  },
  {
    id: '3',
    title: 'GCROSS',
    award: '铜奖',
    year: '2023',
  },
]