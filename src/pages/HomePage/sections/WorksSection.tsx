import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { MOCK_WORKS, type IWork } from '@/data/works';
import { Image } from '@/components/ui/image';
import { useIsMobile } from '@/hooks/use-mobile';

const CATEGORIES = [
  { key: 'all', label: '全部作品' },
  { key: 'ai-comic', label: 'AI 视频' },
  { key: 'poster', label: '视觉设计' },
  { key: '3d-modeling', label: '建模作品' },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]['key'];

export default function WorksSection() {
  const [category, setCategory] = useState<CategoryKey>('all');
  const [selectedWork, setSelectedWork] = useState<IWork | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const isMobile = useIsMobile();

  const filteredWorks = useMemo(() => {
    if (category === 'all') return MOCK_WORKS;
    return MOCK_WORKS.filter((w) => w.category === category);
  }, [category]);

  // 分类切换后重置
  useEffect(() => {
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [category]);

  // 选中目标索引的卡片，平滑滚动使其居中可见
  const selectCard = (index: number) => {
    const clamped = Math.max(0, Math.min(filteredWorks.length - 1, index));
    if (clamped === activeIndex) return;
    setActiveIndex(clamped);

    // 滚动到对应卡片，保证首尾项也能完整显示
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('[data-card]') as NodeListOf<HTMLElement>;
      const target = cards[clamped];
      if (target) {
        target.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      }
    }
  };

  // 鼠标滚轮翻卡：deltaY > 0 翻下一张，deltaY < 0 翻上一张
  // 到首尾时保持选中（不失效、不循环），始终接管滚轮事件
  const wheelAccumulator = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    const { deltaY } = e;
    if (filteredWorks.length <= 1) return;

    // 始终接管滚轮（到边界也不还给页面），保持交互一致性
    e.preventDefault();

    wheelAccumulator.current += deltaY;
    const threshold = 60;
    if (Math.abs(wheelAccumulator.current) >= threshold) {
      const dir = wheelAccumulator.current > 0 ? 1 : -1;
      const target = activeIndex + dir;
      // 到首尾时停止，不循环、不跳过
      if (target >= 0 && target < filteredWorks.length) {
        selectCard(target);
      }
      wheelAccumulator.current = 0;
    }
  };

  const handleMouseEnter = () => {
    document.body.style.overflowY = 'hidden';
  };
  const handleMouseLeave = () => {
    document.body.style.overflowY = '';
    wheelAccumulator.current = 0;
  };

  // 拖拽滚动
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    startScrollLeft.current = carouselRef.current.scrollLeft;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = startScrollLeft.current - walk;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // 箭头/进度点等触发的单步翻卡
  const scrollByStep = (dir: number) => {
    selectCard(activeIndex + dir);
  };

  // 3D Coverflow 样式：中间最大，两侧依次旋转+缩小+后退，形成透视隧道（仅桌面端；移动端平面卡片）
  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);
    const isHovered = hoveredIndex === index;

    // 移动端：平面布局，仅中间卡片轻微放大，其他保持原样
    if (isMobile) {
      const isActive = absOffset === 0;
      return {
        transform: `scale(${isActive ? 1 : 0.9})`,
        opacity: isActive ? 1 : 0.6,
        zIndex: isActive ? 10 : 1,
      };
    }

    // 旋转：左右两侧分别绕 Y 轴旋转
    const rotateY = offset * -25; // 正数 offset -> 负角度（朝里转）
    // 缩放：中间卡片默认 1.1（浮起状态），两侧每远离1层减0.12；hover 时再放大到 1.18
    const baseScale = absOffset === 0 ? 1.1 : 1 - absOffset * 0.12;
    const hoverScale = absOffset === 0 ? 1.18 : 1.12;
    const scale = Math.max(0.6, baseScale) * (isHovered ? hoverScale / baseScale : 1);
    // 水平位移：两侧卡片向中间靠，形成重叠遮挡
    const translateX = offset * -100;
    // Z 位移（透视深度）：中间靠前 60px，两侧后退；hover 时再往前推 50px
    const baseTranslateZ = absOffset === 0 ? 60 : -absOffset * 120;
    const translateZ = baseTranslateZ + (isHovered ? 50 : 0);
    // Y 偏移：中间上浮 25px，两侧轻微下沉；hover 时再上浮 18px
    const baseTranslateY = absOffset === 0 ? -25 : absOffset * 10;
    const translateY = baseTranslateY + (isHovered ? -18 : 0);
    // 透明度：越远越淡
    const opacity = Math.max(0.5, 1 - absOffset * 0.2);
    // z-index：中间最高
    const zIndex = 100 - absOffset + (isHovered ? 50 : 0);

    return {
      transform: `perspective(1200px) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transformStyle: 'preserve-3d' as const,
    };
  };

  return (
    <section
       id="works"
       className="w-full py-20 md:py-28 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden"
     >
       <div className="max-w-[1700px] mx-auto px-4 md:px-6 lg:px-10 flex flex-col justify-center">
         {/* 顶部：右侧大二级标题 WORK */}
         <div className="flex items-end justify-between mb-6 md:mb-8 gap-3">
           <div className="flex gap-2 overflow-x-auto scrollbar-hide min-w-0 flex-1 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
             {CATEGORIES.map((cat) => (
               <button
                 key={cat.key}
                 onClick={() => setCategory(cat.key)}
                 className={`shrink-0 snap-start px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors active:scale-95 ${category === cat.key ? 'text-foreground bg-card border border-border/50 shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
               >
                 <span>{cat.label}</span>
               </button>
             ))}
           </div>
           <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-foreground/10 leading-none shrink-0 hidden sm:block">
             WORK
           </h2>
         </div>

        {/* 3D Coverflow 轮播 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          className="relative flex flex-col justify-center h-auto md:h-[500px] w-full"
        >
             {/* 箭头按钮 + 进度指示：左右箭头夹着进度点；移动端仅显示进度点 */}
             <div className="flex items-center justify-between w-full m-0">
               <button
                 onClick={() => scrollByStep(-1)}
                 className="hidden md:flex size-10 rounded-full bg-card border border-border/50 shadow-md items-center justify-center text-foreground hover:bg-foreground hover:text-background active:bg-foreground/80 transition-colors m-[0px_200px_0px_200px] min-h-[44px] min-w-[44px]"
                 aria-label="上一张"
               >
                 <ChevronLeft className="size-4" />
               </button>

               {/* 进度指示点 */}
               <div className="flex items-center gap-2 md:mx-auto">
                 {filteredWorks.map((_, i) => (
                   <button
                     key={i}
                      onClick={() => selectCard(i)}
                     className={`h-1.5 rounded-full transition-all duration-300 min-h-[44px] min-w-[24px] ${i === activeIndex ? 'w-6 bg-foreground' : 'w-2 bg-border hover:bg-muted-foreground/50'}`}
                     aria-label={`第 ${i + 1} 个作品`}
                   />
                 ))}
               </div>

               <button
                 onClick={() => scrollByStep(1)}
                 className="hidden md:flex size-10 rounded-full bg-card border border-border/50 shadow-md items-center justify-center text-foreground hover:bg-foreground hover:text-background active:bg-foreground/80 transition-colors m-[0px_200px_0px_200px] min-h-[44px] min-w-[44px]"
                 aria-label="下一张"
               >
                 <ChevronRight className="size-4" />
               </button>
             </div>

              <div
                ref={carouselRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={(e) => { handleMouseUp(); handleMouseLeave(); }}
                onMouseEnter={handleMouseEnter}
                className="w-full overflow-x-auto scroll-smooth scrollbar-hide cursor-grab active:cursor-grabbing md:h-[500px] touch-pan-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
              <div className="flex items-center gap-4 md:gap-10 py-4 md:py-6 pl-0 pr-4 md:pr-[15%] min-w-max md:min-w-max pl-4 md:pl-0">
                {filteredWorks.map((work, i) => {
                  const style = getCardStyle(i);
                  const isActive = i === activeIndex;
                  return (
                     <motion.div
                       key={work.id}
                       data-card
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: '-50px' }}
                       transition={{
                         duration: 0.6,
                         delay: i * 0.05,
                         ease: [0.16, 1, 0.3, 1],
                       }}
                       onClick={() => setSelectedWork(work)}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="w-[85vw] sm:w-[70vw] md:w-[280px] lg:w-[340px] xl:w-[380px] max-w-[340px] md:max-w-none shrink-0 cursor-pointer"
                      style={{
                        ...style,
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                      }}
                    >
                      <div className={`group relative aspect-[4/3] rounded-[28px] overflow-hidden transition-all duration-500 ease-out ${isActive ? 'shadow-[0_35px_70px_-20px_rgba(204_255_0_0.55)] shadow-primary/70 ring-2 ring-primary/50' : 'shadow-2xl shadow-foreground/20'} hover:shadow-[0_40px_80px_-20px_rgba(204_255_0_0.7)] hover:shadow-primary/80 hover:ring-2 hover:ring-primary/80 ${work.category === 'poster' && work.coverImageUrl ? 'bg-white' : 'bg-muted'}`}>
                         {/* 封面层：优先真实图，都没有时用渐变兜底 */}
                         {work.coverImageUrl ? (
                           <Image
                             src={work.coverImageUrl}
                             alt={work.title}
                             className={`w-full h-full ${work.category === 'poster' ? 'object-contain' : 'object-cover'}`}
                           />
                         ) : (
                           <div
                             className="absolute inset-0 -z-0"
                             style={{ background: work.coverGradient }}
                           />
                         )}
                         {/* 有视频时右上角叠加播放角标 */}
                         {work.previewVideoUrl && (
                           <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 size-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center ring-2 ring-white/40">
                             <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white ml-0.5">
                               <path d="M8 5v14l11-7z" />
                             </svg>
                           </div>
                         )}
                        {/* 底部黑渐隐蒙层：保证标题/标签文字与封面有足够对比；海报类用更浅蒙层保护画面完整性；hover 时淡出 */}
                         <div className={`absolute inset-x-0 bottom-0 h-2/3 pointer-events-none transition-opacity duration-500 md:group-hover:opacity-0 ${
                           work.category === 'poster'
                             ? 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
                             : 'bg-gradient-to-t from-black/75 via-black/40 to-transparent'
                         }`} />

                        {/* 中央叠字标题：hover 时淡出 */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 md:group-hover:opacity-0 ${
                          isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-90'
                        }`}>
                          <div className="text-white/80 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-2">
                            SUN YUE
                          </div>
                          <h3
                            className="text-white font-black leading-[0.9] tracking-tight uppercase"
                            style={{
                              fontSize: isActive ? 'clamp(1.8rem, 4vw, 3.2rem)' : 'clamp(1.2rem, 2.5vw, 1.8rem)',
                              WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                              textShadow: '0 4px 24px rgba(0,0,0,0.3)',
                            }}
                          >
                            {work.title}
                          </h3>
                          <div className="mt-3 h-px w-12 bg-white/40" />
                          <div className="mt-3 text-white/70 text-xs font-medium tracking-widest uppercase">
                            {work.year} · Work
                          </div>
                        </div>

                        {/* 左上索引 + 右上分类：hover 时淡出 */}
                         <div className="absolute top-5 left-5 text-white/60 text-xs font-bold tracking-wider transition-opacity duration-500 md:md:group-hover:opacity-0">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                         <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium uppercase tracking-wider transition-opacity duration-500 md:md:group-hover:opacity-0">
                           {work.category === 'ai-comic' ? 'AI视频' : work.category === 'poster' ? '视觉设计' : '3D 建模'}
                        </div>

                        {/* 底部标签：hover 时淡出 */}
                         <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between transition-opacity duration-500 md:md:group-hover:opacity-0">
                          <div className="text-white/90 text-xs font-medium tracking-wide">
                            Creative &amp; Collection
                          </div>
                          <div className="size-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <ChevronRight className="size-3.5 text-white" />
                          </div>
                        </div>

                        {/* Hover 蒙层 */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 作品预览弹层 */}
      <AnimatePresence>
        {selectedWork && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.3 }}
             className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8 bg-black/70 backdrop-blur-sm"
             onClick={() => setSelectedWork(null)}
           >
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] overflow-hidden md:rounded-3xl bg-card md:shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
               {/* 关闭按钮 */}
               <button
                 onClick={() => setSelectedWork(null)}
                 className="absolute top-4 right-4 z-20 size-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                 aria-label="关闭"
               >
                 <X className="size-5" />
               </button>

               {/* 可滚动内容区 */}
                <div className="h-full max-h-screen md:max-h-[90vh] overflow-y-auto [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-foreground/40">
                  {/* 预览主视觉：视频优先，其次图片，最后渐变兜底；统一 object-contain 完整展示不裁切 */}
                  <div className="w-full bg-[#0f1115] flex items-center justify-center">
                    {selectedWork.previewVideoUrl ? (
                      <video
                        src={selectedWork.previewVideoUrl}
                        controls
                        className="w-full max-h-[50vh] md:max-h-[70vh] object-contain bg-black"
                        poster={selectedWork.coverImageUrl}
                      />
                    ) : selectedWork.coverImageUrl ? (
                      <Image
                        src={selectedWork.coverImageUrl}
                        alt={selectedWork.title}
                        className="w-full max-h-[50vh] md:max-h-[70vh] object-contain"
                      />
                    ) : (
                      <div
                        className="w-full aspect-[16/10]"
                        style={{ background: selectedWork.coverGradient }}
                      />
                    )}
                  </div>

                  {/* 信息区 */}
                  <div className="p-5 md:p-6 lg:p-8">
                   <div className="flex flex-wrap items-baseline gap-4 mb-3">
                     <span className="text-xs font-bold tracking-widest uppercase text-[#191c24]">
                       {selectedWork.category === 'ai-comic' ? 'AI 视频' : selectedWork.category === 'poster' ? '视觉设计' : '建模作品'}
                     </span>
                     <span className="text-sm text-muted-foreground">{selectedWork.year}</span>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold mb-3 break-words">{selectedWork.title}</h3>
                   <p className="text-foreground/70 leading-relaxed mb-6 whitespace-pre-wrap">{selectedWork.description}</p>
                   {selectedWork.douyinUrl && (
                     <a
                       href={selectedWork.douyinUrl}
                       target="_blank"
                       rel="noreferrer"
                       className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/80 transition-colors"
                     >
                       查看原片
                       <ExternalLink className="size-4" />
                     </a>
                   )}
                 </div>
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
