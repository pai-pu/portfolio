import HeroSection from './sections/HeroSection';
import WorksSection from './sections/WorksSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import MarqueeSection from './sections/MarqueeSection';
import FloatingNav from '@/components/FloatingNav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <main className="space-y-0">
        {/* Hero */}
        <HeroSection />

        {/* Hero → About 渐变过渡：荧光绿 → 暖纸白背景 */}
        <div className="w-full h-10 bg-gradient-to-b from-[#CCFF00] to-background" />

        {/* About 个人介绍 */}
        <AboutSection />

        {/* About → Works 渐变过渡：背景 → 浅灰再回到背景 */}
        <div className="w-full h-10 bg-gradient-to-b from-background via-muted/40 to-background" />

        {/* Works 作品集 */}
        <WorksSection />

        {/* Contact 尾页 */}
        <ContactSection />

        {/* 首页最底部的技能标签跑马灯 */}
        <MarqueeSection />
      </main>
    </div>
  );
}
