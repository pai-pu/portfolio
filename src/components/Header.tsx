import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: '首页', href: '#hero' },
  { label: 'Work', href: '#works' },
  { label: '个人介绍', href: '#about' },
  { label: '联系我', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/70 backdrop-blur-xl border-b border-border/30'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#hero" className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
          <span className="text-primary">SY</span>
          <span className="mx-1 text-muted-foreground">·</span>
          <span className="font-light">孙悦</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors relative py-1 text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center h-10 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            联系我
          </a>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="菜单"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30"
          >
            <nav className="max-w-[1700px] mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-foreground py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center h-12 rounded-full bg-foreground text-background text-base font-medium mt-2"
              >
                联系我
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
