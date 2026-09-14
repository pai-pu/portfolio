import { motion } from 'framer-motion';

const SKILL_TAGS = [
  { label: '海报设计', solid: false },
  { label: '3D建模', solid: false },
  { label: 'AI漫剧', solid: true },
  { label: '视频剪辑', solid: false },
  { label: '动态设计', solid: false },
  { label: 'UI设计', solid: false },
  { label: '插画', solid: false },
  { label: 'Blender', solid: true },
  { label: 'TouchDesigner', solid: false },
];

export default function MarqueeSection() {
  return (
    <section className="w-full py-6 md:py-10 lg:py-14 bg-[#CCFF00] overflow-hidden border-t border-foreground/10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
          <div
            className="flex gap-2 md:gap-4 w-max whitespace-nowrap"
            style={{
              animation: 'marquee 30s linear infinite',
              animationDuration: '40s',
            }}
          >
            {[...SKILL_TAGS, ...SKILL_TAGS, ...SKILL_TAGS, ...SKILL_TAGS].map((tag, i) => (
              <span
                key={`${tag.label}-${i}`}
                className={`px-3 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm lg:text-base font-bold uppercase tracking-wide border shrink-0 ${
                  tag.solid
                    ? 'bg-foreground text-[#CCFF00] border-foreground'
                    : 'bg-transparent text-foreground border-foreground/40'
                }`}
              >
              {tag.label}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
        `}</style>
      </motion.div>
    </section>
  );
}
