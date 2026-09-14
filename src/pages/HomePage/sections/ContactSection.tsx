import { motion } from 'framer-motion';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import { MOCK_PROFILE } from '@/data/profile';

export default function ContactSection() {
  const profile = MOCK_PROFILE;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
       className="relative w-full min-h-[80vh] md:min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px] -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-accent/15 blur-[180px] translate-x-1/3 translate-y-1/3" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

       <div className="relative z-10 max-w-[1700px] mx-auto px-4 md:px-6 lg:px-10 py-20 md:py-24 lg:py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-medium text-primary/80 tracking-widest uppercase">
            Get In Touch
          </span>

           <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold mt-3 md:mt-4 tracking-tight text-background leading-[1.05]">
             <motion.span
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="block"
             >
               让我们一起
             </motion.span>
             <motion.span
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
             >
               创造点什么
             </motion.span>
           </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
             className="text-base md:text-lg lg:text-xl text-background/60 mt-6 md:mt-8 max-w-xl leading-relaxed"
          >
            欢迎随时联系我，让我们碰撞出创意的火花。
          </motion.p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
           className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-10 md:mt-16 lg:mt-20"
        >
          <a
            href={`tel:${profile.phone}`}
             className="group p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl bg-background/10 backdrop-blur-md border border-background/20 hover:border-primary/50 active:border-primary/50 hover:bg-background/15 transition-all"
          >
             <div className="flex items-center gap-3 md:gap-5 mb-4 md:mb-6">
               <div className="size-12 md:size-14 lg:size-16 rounded-xl md:rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                 <Phone className="size-5 md:size-6 lg:size-7 text-primary" />
              </div>
              <span className="text-sm text-background/50 tracking-wider uppercase">Phone · 电话</span>
            </div>
             <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-background flex items-center gap-2">
              {profile.phone}
              <ArrowUpRight className="size-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0" />
            </div>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="group p-10 md:p-12 rounded-3xl bg-background/10 backdrop-blur-md border border-background/20 hover:border-accent/50 hover:bg-background/15 transition-all"
          >
             <div className="flex items-center gap-3 md:gap-5 mb-4 md:mb-6">
               <div className="size-12 md:size-14 lg:size-16 rounded-xl md:rounded-2xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                 <Mail className="size-5 md:size-6 lg:size-7 text-accent" />
              </div>
              <span className="text-sm text-background/50 tracking-wider uppercase">Email · 邮箱</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-background flex items-center gap-2 break-all">
              {profile.email}
              <ArrowUpRight className="size-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0 shrink-0" />
            </div>
          </a>
        </motion.div>

        {/* Bottom footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
           className="mt-16 md:mt-24 lg:mt-32 pt-6 md:pt-8 border-t border-background/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4"
        >
           <div className="text-background/40 text-xs md:text-sm">
            © {new Date().getFullYear()} 孙悦 Sun Yue · All rights reserved
          </div>
          <button
            onClick={scrollToTop}
              className="text-background/60 hover:text-primary text-xs md:text-sm font-medium flex items-center gap-2 transition-colors min-h-[44px]"
          >
            回到顶部
            <ArrowUpRight className="size-4 -rotate-90" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
