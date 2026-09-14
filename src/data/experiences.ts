// EXPORTS: IExperience, MOCK_EXPERIENCES
export interface IExperience {
  id: string
  company: string
  position: string
  period: string
  description: string
}

export const MOCK_EXPERIENCES: IExperience[] = [
  {
    id: '1',
    company: '作业帮',
    position: '海外素材设计',
    period: '2025.07 - 2025.12',
    description: '擅长通过高转化率的视频剪辑与吸睛的平面素材助力品牌出海，能够独立完成从素材剪辑、后期特效到平面视觉设计的全流程工作。'
  },
  {
    id: '2',
    company: '绘创（爱看互动郑州分公司）',
    position: 'AI 抽卡师与剪辑师',
    period: '2026.04 - 2026.09',
    description: '阅读剧本制作真人和AI漫剧的人物妆造与场景资产；使用likeAI和自动化AIGC生成工具生成AI视频分镜；对AI视频进行精剪，熟悉全流程制作AI真人剧与AI漫剧。'
  },
  {
    id: '3',
    company: '千宸嘉澜国际文化创意产业(南京)有限公司',
    position: '后期剪辑（实习）',
    period: '2025.05 - 2025.06',
    description: '用PR/AE/剪映完成素材剪辑、调色、字幕及特效，优化流程保障项目按时交付，参与抖音短剧相关内容制作。'
  },
  {
    id: '4',
    company: 'NUAMEDIA 校园专业公众号',
    position: '运营 / 排版',
    period: '2024.04 - 2024.05',
    description: '负责公众号排版（秀米）及图像后期（PS/AI），撰写《情绪档案馆》一文获阅读量800+、转载120+。'
  },
  {
    id: '5',
    company: '江苏省大学生创新训练计划',
    position: '视觉设计 / 技术支持',
    period: '2024.06 - 2025.06',
    description: '负责视觉设计与技术工作，以Touchdesigner制作动态投影，解构重组剪纸纹样与传统符号，融合现代舞蹈；通过Touchdesigner实时渲染与Mediapipe面部识别提供交互支持。'
  }
]