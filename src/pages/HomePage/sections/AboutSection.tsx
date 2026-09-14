import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { MOCK_PROFILE } from '@/data/profile';
import { MOCK_EXPERIENCES } from '@/data/experiences';
import { MOCK_SKILLS } from '@/data/skills';
import { MOCK_HONORS } from '@/data/honors';
import { Image } from '@/components/ui/image';

const PORTRAIT_IMAGE = import.meta.env.BASE_URL + 'images/avatar.png';

const SKILL_CATEGORIES = [
  { key: 'design', label: '平面设计', color: 'bg-[#CCFF00] text-foreground' },
  { key: 'video', label: '视频剪辑', color: 'bg-foreground text-white' },
  { key: '3d', label: '三维建模', color: 'bg-muted text-foreground' },
  { key: 'ai', label: 'AI 创作', color: 'bg-[#CCFF00]/30 text-foreground border border-[#CCFF00]' },
] as const;

export default function AboutSection() {
  const profile = MOCK_PROFILE;

  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
       <div className="max-w-[1700px] mx-auto px-4 md:px-6 lg:px-10">
        {/* 顶部右侧大二级标题 */}
         <div className="flex items-end justify-end mb-4 md:mb-8">
           <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground/10 leading-none text-right">
            个人介绍
          </h2>
        </div>

        {/* =========== 顶部：左右分栏 =========== */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-0 mb-16 md:mb-24 lg:mb-32">
          {/* ========== 左侧文字区（约55%） ========== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-muted/30 rounded-[28px] md:rounded-[40px] p-6 md:p-10 lg:p-16 relative overflow-hidden order-1 lg:order-2"
          >
            {/* 背景装饰：白色半透明圆环 */}
            <div className="absolute -right-20 top-1/4 w-64 h-64 rounded-full bg-white/60 blur-2xl" />
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border-[12px] border-white/30" />
            <div className="absolute right-20 bottom-20 w-20 h-20 rounded-full bg-white/50" />

            <div className="relative z-10">
              {/* 副标题 */}
               <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                 <Sparkles className="size-4 md:size-5 text-foreground" />
                 <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-foreground/70">
                   视觉设计师 · CREATIVE
                 </span>
               </div>

               {/* 超大标题 */}
               <h2 className="font-black leading-[0.85] tracking-tight text-foreground mb-6 md:mb-8">
                 <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl uppercase">
                   孙悦
                 </span>
                 <span className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase text-[#CCFF00] h-[55px] p-[8px_0px_8px_0px]" style={{ WebkitTextStroke: '1.5px #000000' }}>Sūn yuè</span>
              </h2>

               {/* 介绍正文 */}
               <div className="max-w-xl space-y-3 md:space-y-4 mb-6 md:mb-10">
                 <p className="text-sm md:text-base lg:text-lg leading-relaxed text-foreground/80">
                   {profile.bio}
                 </p>
                 <p className="text-xs md:text-sm lg:text-base leading-relaxed text-muted-foreground">
                   擅长平面设计、视频剪辑与 AI 影像创作，对视觉语言有敏锐的洞察力。
                   热爱探索跨媒介艺术表达，将传统设计思维与前沿 AI 工具结合，
                   不断突破创意边界。
                 </p>
               </div>

               {/* 署名信息 */}
               <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                 <div className="size-10 md:size-12 rounded-full bg-foreground flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#CCFF00] fill-current">
                    <polygon points="20,4 36,36 4,36" />
                    <polygon points="20,16 28,32 12,32" className="fill-foreground" />
                  </svg>
                </div>
                 <div>
                   <div className="text-base md:text-lg font-bold text-foreground">{profile.name}</div>
                   <div className="text-xs md:text-sm text-muted-foreground">{profile.title}</div>
                 </div>
              </div>

               {/* 底部：小logo + 技能关键词 */}
               <div className="flex flex-wrap items-center gap-2 md:gap-3">
                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/50 mr-1 md:mr-2 w-full md:w-auto mb-1 md:mb-0">
                   Skills
                 </span>
                 {['PS', 'AI', 'Figma', 'Blender', '剪映', 'TouchDesigner'].map((s) => (
                   <span
                     key={s}
                     className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wide border border-foreground/20 text-foreground/70 bg-white/50"
                   >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ========== 右侧人物区（约45%） ========== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-2 lg:order-1 lg:mr-[-60px] lg:mt-12 relative z-10"
          >
            {/* 荧光绿色块背景 */}
            <div className="relative bg-[#CCFF00] rounded-[40px] overflow-hidden aspect-[4/5]">
              {/* 装饰几何 */}
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-white/30 blur-xl" />
              <div className="absolute bottom-12 left-6 w-16 h-16 rounded-full border-4 border-white/40" />

              {/* 人物图 - 占约70%高度，居中偏下 */}
              <div className="absolute inset-0 flex items-end justify-center pb-0 group/portrait overflow-hidden rounded-b-[40px]">
                <motion.div
                  whileHover={{
                    rotate: [0, -3, 2, -2, 1, 0],
                    y: [0, -8, -6, -4, -2, 0],
                    transition: { duration: 0.8, ease: 'easeInOut' },
                  }}
                  className="h-[75%] w-auto"
                >
                  <Image
                    src={PORTRAIT_IMAGE}
                    alt={profile.name}
                    className="h-full w-auto object-contain drop-shadow-2xl rounded-2xl"
                  />
                </motion.div>
              </div>

              {/* 悬浮标签 */}
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-foreground text-[#CCFF00] text-xs font-bold uppercase tracking-widest">
                Designer
              </div>
              <div className="absolute top-6 right-6 text-foreground text-xs font-bold tracking-widest">
                NUART
              </div>
            </div>

              {/* 联系方式卡片 */}
              <div className="mt-4 md:mt-6 grid grid-cols-2 gap-2 md:gap-3">
              <a
                href={`tel:${profile.phone}`}
                 className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-card border border-border/50 hover:border-[#CCFF00]/50 active:border-[#CCFF00]/50 transition-colors"
              >
                 <div className="size-8 md:size-10 rounded-full bg-[#CCFF00]/20 flex items-center justify-center shrink-0">
                   <Phone className="size-3.5 md:size-4 text-foreground" />
                 </div>
                 <div className="min-w-0">
                   <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground">Phone</div>
                   <div className="font-semibold text-foreground text-xs md:text-sm truncate">
                    {profile.phone}
                  </div>
                </div>
              </a>
              <a
                href={`mailto:${profile.email}`}
                 className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-card border border-border/50 hover:border-[#CCFF00]/50 active:border-[#CCFF00]/50 transition-colors"
              >
                 <div className="size-8 md:size-10 rounded-full bg-foreground flex items-center justify-center shrink-0">
                   <Mail className="size-3.5 md:size-4 text-[#CCFF00]" />
                 </div>
                 <div className="min-w-0">
                   <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground">Email</div>
                   <div className="font-semibold text-foreground text-xs md:text-sm truncate">
                    {profile.email}
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* =========== 底部通栏：教育 + 技能 + 经历 =========== */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* 左：教育背景 + 荣誉 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
             className="lg:col-span-4 space-y-4 md:space-y-6"
          >
            {/* 教育背景 */}
             <div className="p-5 md:p-8 rounded-[22px] md:rounded-[28px] bg-[#CCFF00]/10 border border-[#CCFF00]/20">
               <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
                 <div className="size-8 md:size-10 rounded-full bg-[#CCFF00] flex items-center justify-center">
                   <GraduationCap className="size-4 md:size-5 text-foreground" />
                 </div>
                 <h3 className="text-lg md:text-xl font-bold">教育背景</h3>
               </div>
               <div className="space-y-2 md:space-y-3">
                 <div className="font-bold text-base md:text-lg text-foreground">{profile.school}</div>
                 <div className="text-sm text-foreground/70">
                   {profile.major} · {profile.educationPeriod}
                 </div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <MapPin className="size-3.5 md:size-4" />
                   <span>南京 · 可远程</span>
                 </div>
               </div>
             </div>

            {/* 荣誉 */}
             <div className="p-5 md:p-8 rounded-[22px] md:rounded-[28px] bg-card border border-border/50">
               <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-5">所获荣誉</h3>
               <div className="space-y-2 md:space-y-3">
                 {MOCK_HONORS.map((honor, i) => (
                   <motion.div
                     key={honor.id}
                     initial={{ opacity: 0, x: -10 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.4, delay: i * 0.1 }}
                     className="flex items-center justify-between p-2.5 md:p-3 rounded-lg md:rounded-xl bg-muted/50 border border-border/30"
                   >
                     <div className="font-medium text-foreground text-xs md:text-sm">
                       {honor.title}
                     </div>
                     <div className="text-[10px] md:text-xs font-bold text-[#CCFF00] whitespace-nowrap ml-2 md:ml-3 bg-foreground px-2 py-0.5 rounded-full">
                      {honor.award}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右：技能卡片 + 工作经历时间线 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
             className="lg:col-span-8 space-y-8 md:space-y-10"
          >
            {/* 职业技能 */}
            <div>
               <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                 <div className="size-8 md:size-10 rounded-full bg-foreground flex items-center justify-center">
                   <Sparkles className="size-4 md:size-5 text-[#CCFF00]" />
                 </div>
                 <h3 className="text-lg md:text-2xl font-bold">职业技能</h3>
              </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {SKILL_CATEGORIES.map((cat) => {
                  const skills = MOCK_SKILLS.filter((s) => s.category === cat.key);
                  return (
                    <div
                      key={cat.key}
                       className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-card border border-border/50 hover:border-[#CCFF00]/40 active:border-[#CCFF00]/40 transition-colors"
                    >
                      <div
                         className={`inline-block px-2.5 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 md:mb-4 ${cat.color}`}
                      >
                        {cat.label}
                      </div>
                       <div className="flex flex-wrap gap-1.5 md:gap-2">
                         {skills.map((skill) => (
                           <span
                             key={skill.id}
                             className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-xs md:text-sm font-medium ${
                               skill.level === 'proficient'
                                 ? 'bg-foreground text-white'
                                 : skill.level === 'skilled'
                                   ? 'bg-muted text-foreground'
                                   : 'bg-muted/50 text-muted-foreground'
                             }`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 工作经历时间线 */}
            <div>
               <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                 <div className="size-8 md:size-10 rounded-full bg-[#CCFF00] flex items-center justify-center">
                   <Briefcase className="size-4 md:size-5 text-foreground" />
                 </div>
                 <h3 className="text-lg md:text-2xl font-bold">工作经历</h3>
              </div>

               <div className="relative pl-4 md:pl-6 lg:pl-8">
                 <div className="absolute left-[7px] md:left-[11px] lg:left-[15px] top-1 bottom-1 w-px bg-gradient-to-b from-[#CCFF00] via-border to-border" />

                 <div className="space-y-4 md:space-y-6">
                   {MOCK_EXPERIENCES.map((exp, i) => (
                     <motion.div
                       key={exp.id}
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true, margin: '-50px' }}
                       transition={{ duration: 0.5, delay: i * 0.08 }}
                       className="relative"
                     >
                       <div className="absolute -left-[18px] md:-left-[22px] lg:-left-[24px] top-2 size-2.5 md:size-3 rounded-full bg-[#CCFF00] ring-3 md:ring-4 ring-[#CCFF00]/20 z-10" />

                       <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-card border border-border/50 hover:border-[#CCFF00]/30 transition-all hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-md hover:shadow-[#CCFF00]/5">
                         <div className="flex flex-wrap items-baseline gap-x-3 md:gap-x-4 gap-y-1 mb-2">
                           <h4 className="text-base md:text-lg font-bold text-foreground">
                             {exp.company}
                           </h4>
                           <span className="text-xs md:text-sm font-semibold text-foreground bg-[#CCFF00]/20 px-2 md:px-2.5 py-0.5 rounded-full">
                             {exp.position}
                           </span>
                         </div>
                         <div className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                           {exp.period}
                         </div>
                         <p className="text-xs md:text-sm leading-relaxed text-foreground/70">
                          {exp.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
