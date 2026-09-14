import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: '首页', href: '#hero' },
  { label: '个人介绍', href: '#about' },
  { label: 'Work', href: '#works' },
  { label: 'Contact', href: '#contact' },
];

export default function FloatingNav() {
  const [isFixed, setIsFixed] = useState(false);
  const [activeHash, setActiveHash] = useState('#hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // 1. 监听滚动：离开 Hero 后切换为 fixed 固定态
  useEffect(() => {
    heroRef.current = document.getElementById('hero');

    const onScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setIsFixed(heroBottom < 80);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 2. IntersectionObserver 监听各 section，高亮当前项
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.href.slice(1))
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveHash(`#${visible[0].target.id}`);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: '-80px 0px -40% 0px',
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        'w-full z-[100] transition-all duration-500 pointer-events-none',
        isFixed
          ? 'fixed top-0 left-0 right-0 pt-3 md:pt-4 pb-2'
          : 'absolute top-0 left-0 right-0 pt-6 md:pt-8'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-3 md:px-6 lg:px-8 pointer-events-auto">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            'flex items-center justify-between h-12 md:h-14 lg:h-16 px-2.5 md:px-4 lg:px-5 rounded-full transition-all duration-500 border',
            isFixed
              ? 'bg-white/70 backdrop-blur-xl border-white/40 shadow-xl shadow-foreground/10'
              : 'bg-white/85 backdrop-blur-md border-white/50 shadow-lg shadow-foreground/10'
          )}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 shrink-0"
          >
             <div className="relative size-6 md:size-7 lg:size-8">
              <svg viewBox="0 0 40 40" className="w-full h-full text-foreground fill-current">
                <polygon points="20,2 38,38 2,38" />
                <polygon points="20,14 30,34 10,34" className="fill-[#CCFF00]" />
              </svg>
            </div>
             <span className="text-sm font-bold tracking-tight text-foreground hidden sm:block uppercase">
               SŪN YUÈ
             </span>
          </a>

          {/* Center nav links - desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300',
                    'hover:-translate-y-0.5',
                    isActive
                      ? 'bg-[#CCFF00] text-foreground shadow-sm'
                      : 'text-foreground/75 hover:text-foreground hover:bg-foreground/5'
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right side: CTA + mobile menu */}
           <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
             <a
               href="#contact"
               className="inline-flex items-center h-9 px-3.5 md:px-4 lg:px-5 rounded-full bg-foreground text-[#CCFF00] text-xs font-bold uppercase tracking-wider hover:bg-foreground/90 active:bg-foreground/80 transition-colors whitespace-nowrap"
             >
               <span className="hidden md:inline">联系我</span>
               <span className="md:hidden">联系</span>
               <ChevronRight className="size-3 ml-0.5 hidden md:block" />
             </a>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 -mr-1 text-foreground"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="菜单"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mt-3 overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg border border-white/50"
          >
            <nav className="p-3 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeHash === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'text-sm font-semibold px-4 py-3 rounded-xl transition-colors',
                      isActive
                        ? 'bg-[#CCFF00] text-foreground'
                        : 'text-foreground/80 hover:bg-foreground/5'
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </div>
    </div>
  );
}
