import { motion } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const HERO_VIDEO_URL = import.meta.env.BASE_URL + 'videos/hero-bg.mp4';

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const waveformBase = [15, 25, 18, 32, 22, 38, 28, 20, 30, 24, 35, 18, 28, 32, 20, 26, 30, 22, 34, 18, 24, 28, 20, 30, 22, 26, 18, 24];
  const [waveHeights, setWaveHeights] = useState(waveformBase);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // 音波动画：取消静音时每帧随机微调高度，模拟音波跳动
  useEffect(() => {
    if (isMuted) {
      setWaveHeights(waveformBase);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime > 80) {
        lastTime = time;
        setWaveHeights(waveformBase.map((h, i) => {
          const wave = Math.sin(time / 200 + i * 0.6) * 12;
          const noise = (Math.random() - 0.5) * 16;
          return Math.max(8, Math.min(100, h + wave + noise));
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMuted]);

  const [heroHovered, setHeroHovered] = useState(false);

  // 挂载时强制视频静音，与 React 状态保持一致，防止浏览器 autoplay 策略差异导致默认出声
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // 自动播放被阻止时静默失败，等用户交互后再播放
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-[#CCFF00]"
      onMouseEnter={() => setHeroHovered(true)}
      onMouseLeave={() => setHeroHovered(false)}
    >
      {/* 视频背景（最底层） */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />
      {/* 荧光绿径向渐变遮罩：中心50%→边缘80%，hover Hero 时整体淡出显视频 */}
      <div
        className="absolute inset-0 z-[1] transition-opacity duration-[600ms] ease-out border border-[#dddfe300] backdrop-blur-md"
        style={{
          background: 'radial-gradient(circle at center, rgba(204,255,0,0.5) 0%, rgba(204,255,0,0.5) 100%)',
          opacity: heroHovered ? 0 : 1,
        }}
      >
        {/* Giant title - 移入遮罩层内 */}
        <div className="relative w-full h-full flex items-center justify-center mix-blend-luminosity">
          <h1 className="text-[16vw] md:text-[14vw] lg:text-[12vw] font-black leading-none tracking-[0.075em] uppercase select-none whitespace-nowrap text-[#000000]">
            PORTFOLIO
          </h1>
        </div>
      </div>
      {/* Subtitle top-left - below floating nav */}
       <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.3 }}
         className="relative z-20 max-w-[1700px] mx-auto px-4 md:px-6 lg:px-10 pt-24 md:pt-28 lg:pt-32 text-center md:text-left"
       >
         <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
           <Sparkles className="size-3 md:size-4 text-foreground" />
           <span className="text-xs md:text-sm lg:text-base font-black uppercase tracking-wider text-foreground leading-tight">
             Hello visitor
           </span>
         </div>
         <span className="text-xs md:text-sm lg:text-base font-black uppercase tracking-wider text-foreground">
           Welcome to my homepage
         </span>
       </motion.div>

      {/* Bottom-left: bubble CTA card */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.8 }}
         className="absolute bottom-20 md:bottom-24 left-4 md:left-10 lg:left-16 z-30 max-w-xs w-[80%] md:w-auto"
       >
         {/* Arrow indicator */}
         <div className="flex items-end gap-4 mb-2 md:mb-3">
           <div className="text-foreground">
             <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="md:w-9 md:h-9">
               <path d="M4 4 L20 28 L20 12 L32 28 L20 12" fill="none" />
             </svg>
           </div>
           <div className="flex-1" />
         </div>

         {/* Bubble card */}
         <div className="relative bg-white/90 backdrop-blur-sm rounded-[24px] md:rounded-[32px] px-4 md:px-6 py-3.5 md:py-5 shadow-xl">
           {/* Top row: play button + waveform */}
           <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
             <button
               onClick={toggleMute}
               className="size-9 md:size-11 rounded-full bg-foreground flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform active:bg-foreground/80"
               aria-label={isMuted ? '取消静音' : '静音'}
             >
               {isMuted ? (
                 <VolumeX className="size-3.5 md:size-4 text-[#CCFF00]" />
               ) : (
                 <Volume2 className="size-3.5 md:size-4 text-[#CCFF00]" />
               )}
             </button>
             <div className="flex-1 h-6 md:h-8 flex items-center gap-[2px]">
              {waveHeights.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-foreground rounded-full"
                  style={{
                    height: `${h}%`,
                    transition: !isMuted ? 'height 0.08s ease-out' : 'height 0.3s ease-out',
                  }}
                />
              ))}
            </div>
          </div>

           {/* Bottom row: text + arrow */}
           <a
             href="#works"
             className="flex items-center justify-between"
           >
             <span className="text-xs md:text-sm font-black uppercase tracking-wider text-foreground">
               View my work — Scroll down
             </span>
             <ArrowDown className="size-4 md:size-5 text-foreground" />
           </a>

           {/* Bubble tail */}
           <div className="absolute -top-1.5 md:-top-2 left-5 md:left-6 w-3.5 h-3.5 md:w-4 md:h-4 bg-white/90 rotate-45 rounded-sm" />
         </div>
       </motion.div>



      {/* Scroll indicator bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/60">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-4 text-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
