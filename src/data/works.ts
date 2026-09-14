// EXPORTS: IWork, MOCK_WORKS
// public 资源在子路径部署时需拼接 Vite 的 base（import.meta.env.BASE_URL 以 / 结尾）
const IMG = import.meta.env.BASE_URL + 'images/'
const VID = import.meta.env.BASE_URL + 'videos/'

export interface IWork {
  id: string
  title: string
  category: 'ai-comic' | 'poster' | '3d-modeling'
  description: string
  coverGradient: string
  year: string
  douyinUrl?: string
  coverImageUrl?: string
  previewVideoUrl?: string
}

export const MOCK_WORKS: IWork[] = [
  // ===== AI 真人漫剧（5 张）=====
  {
    id: 'ai-5',
    title: 'Cool',
    category: 'ai-comic',
    description: 'AI 视频作品，动态视觉短片',
    coverGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    coverImageUrl: IMG + 'cool-cover.png',
    year: '2026',
    previewVideoUrl: VID + 'cool.mp4',
  },
  {
    id: 'ai-1',
    title: '万物有声，逆袭农女不好惹',
    category: 'ai-comic',
    description: 'AI漫剧作品，古装双穿题材，讲述双穿男女在古代生活故事',
    coverGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #764ba2 100%)',
    coverImageUrl: IMG + 'wanwuyousheng-cover.jpg',
    year: '2026',
    previewVideoUrl: VID + 'wanwuyousheng-trailer.mp4',
    douyinUrl: 'https://www.douyin.com/search/%E4%B8%87%E7%89%A9%E6%9C%89%E5%A3%B0%E9%80%86%E8%A2%AD%E5%86%9C%E5%A5%B3%E4%B8%8D%E5%A5%BD%E6%83%B9?aid=deeb0517-4fd7-488a-881f-e040837c1558&modal_id=7678698742869953843&type=general',
  },
  {
    id: 'ai-2',
    title: '跨朝搭档',
    category: 'ai-comic',
    description: 'AI真人漫剧作品，跨朝代搭档题材，现代与古代角色碰撞的趣味故事',
    coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    year: '2026',
    coverImageUrl: IMG + 'kuachao-cover.png',
    douyinUrl: 'https://www.douyin.com/search/%E8%B7%A8%E6%9C%9D%E6%90%AD%E6%A1%A3?aid=b2b973d0-9696-428e-8277-b692162b47d3&modal_id=7672980595118460196&type=general',
  },
  {
    id: 'ai-3',
    title: '穿成炮灰后全家觉醒了',
    category: 'ai-comic',
    description: 'AI真人漫剧作品，穿书觉醒题材，主角穿成炮灰后全家觉醒反套路故事',
    coverGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #f5576c 100%)',
    coverImageUrl: IMG + 'chuanchengpaohui-cover.png',
    year: '2026',
    douyinUrl: 'https://www.douyin.com/search/%E7%A9%BF%E6%88%90%E7%82%AE%E7%81%B0%E5%90%8E%E5%85%A8%E5%AE%B6%E8%A7%89%E9%86%92%E4%BA%86?aid=ebbbba37-87ff-4d98-a166-4c667ee12ef1&modal_id=7641141470224813353&type=general',
  },
  {
    id: 'ai-4',
    title: '替嫁冷面权臣后前夫悔哭了',
    category: 'ai-comic',
    description: 'AI真人漫剧作品，替嫁权谋题材，替嫁冷面权臣后前夫追悔莫及的甜虐故事',
    coverGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #a8edea 100%)',
    year: '2026',
    coverImageUrl: IMG + 'tijiaolingmian-cover.png',
    douyinUrl: 'https://www.douyin.com/search/%E6%9B%BF%E5%AB%81%E5%86%B7%E9%9D%A2%E6%9D%83%E8%87%A3%E5%90%8E%E5%89%8D%E5%A4%AB%E6%82%94%E5%93%AD%E4%BA%86?aid=34ba9b87-251d-4f42-bca1-4bedb5d795ae&modal_id=7644527317758397759&type=general',
  },
  // ===== 海报设计（6 张）=====
  {
    id: 'p-1',
    title: '春日限定',
    category: 'poster',
    description: '春日主题插画海报，绿橙暖色调，花器、向日葵与少女形象，活动周期 04.27-05.23',
    coverGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #84fab0 100%)',
    year: '2026',
    coverImageUrl: IMG + 'chunri-cover.png',
  },
  {
    id: 'p-2',
    title: '时光旅行',
    category: 'poster',
    description: '潮酷旅行主题海报，黑底荧光撞色，背包客、行李箱、相机与球鞋元素，"Enjoy THE Time"',
    coverGradient: 'linear-gradient(135deg, #232526 0%, #414345 50%, #f5515f 100%)',
    year: '2026',
    coverImageUrl: IMG + 'shiguang-cover.png',
  },
  {
    id: 'p-3',
    title: '快乐の研究所',
    category: 'poster',
    description: '治愈系卡通海报，蓝绿撞色，心形拟人角色与花朵，"快乐の研究所"',
    coverGradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 50%, #a8edea 100%)',
    year: '2026',
    coverImageUrl: IMG + 'kuaile-cover.png',
  },
  {
    id: 'p-4',
    title: '玩物丧志',
    category: 'poster',
    description: '潮玩主题海报，荧光蓝底，荧光绿青蛙潮玩角色与大字标题',
    coverGradient: 'linear-gradient(135deg, #00c6fb 0%, #005bea 50%, #667eea 100%)',
    year: '2026',
    coverImageUrl: IMG + 'wanwu-cover.png',
  },
  {
    id: 'p-5',
    title: '小说狂迷·沉浸式追更',
    category: 'poster',
    description: '阅读类产品 KV 主视觉，绿色毛绒小鸟角色趴书堆看手机，蓝色夜景台灯氛围，「小说狂迷！沉浸式追更」',
    coverGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)',
    year: '2026',
    coverImageUrl: IMG + 'xiaoshuokuangmi-cover.png',
  },
  {
    id: 'p-6',
    title: '街头野性·即刻登场',
    category: 'poster',
    description: '潮酷 3D KV，红发红瞳白猫角色穿黑色卫衣跃出，涂鸦街头背景，「街头野性 即刻登场」',
    coverGradient: 'linear-gradient(135deg, #7f1d1d 0%, #f59e0b 50%, #0ea5e9 100%)',
    year: '2026',
    coverImageUrl: IMG + 'jietou-cover.png',
  },

  // ===== 建模作品（7 张）=====
  {
    id: '3d-1',
    title: '山水诗韵',
    category: '3d-modeling',
    description: '三维场景短片，东方水墨意境，雨幕、水纹与书法字体的视觉诗',
    coverGradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    year: '2026',
    coverImageUrl: IMG + 'shanshui-cover.png',
    previewVideoUrl: VID + 'shanshui.mp4',
  },
  {
    id: '3d-2',
    title: '竹林禅意',
    category: '3d-modeling',
    description: '东方禅意场景建模，雾效、竹林、石灯笼与透明材质人物',
    coverGradient: 'linear-gradient(135deg, #a8edea 0%, #8fd3f4 50%, #667eea 100%)',
    year: '2026',
    coverImageUrl: IMG + 'zhulin-cover.png',
  },
  {
    id: '3d-3',
    title: '唐宫乐伎',
    category: '3d-modeling',
    description: '国风Q版角色群像，唐代仕女乐队，卡通渲染与荷花荷塘场景',
    coverGradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 50%, #f6d365 100%)',
    year: '2026',
    coverImageUrl: IMG + 'tanggong-cover.png',
  },
  {
    id: '3d-4',
    title: '水晶兰花',
    category: '3d-modeling',
    description: '微观自然特写，透明材质兰花与苔藓岩壁，水滴与景深',
    coverGradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 50%, #a18cd1 100%)',
    year: '2026',
    coverImageUrl: IMG + 'shuijinglanhua-cover.png',
  },
  {
    id: '3d-5',
    title: '云水之间',
    category: '3d-modeling',
    description: '黄昏湖景场景，松林、倒影与透明水晶书法字的写意画面',
    coverGradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 50%, #f6d365 100%)',
    year: '2026',
    coverImageUrl: IMG + 'yunshui-cover.png',
  },
  {
    id: '3d-6',
    title: '林涧幽池',
    category: '3d-modeling',
    description: '森林溪池场景建模，植被、水泽与自然光效',
    coverGradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 50%, #a8e063 100%)',
    year: '2026',
    coverImageUrl: IMG + 'linjian-cover.png',
  },
  {
    id: '3d-7',
    title: '粒子光绘',
    category: '3d-modeling',
    description: '粒子艺术实验，点阵聚合与色散光效，抽象视觉探索',
    coverGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    year: '2026',
    coverImageUrl: IMG + 'lizi-cover.png',
  },
]
