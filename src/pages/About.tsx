import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, Users, Heart, Target, Eye } from 'lucide-react';

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-brand-primary text-white py-24 px-6 md:px-12 text-center border border-brand-secondary/20 shadow-2xl shadow-brand-primary/20">
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/90 to-brand-primary/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2187d80a16f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm"
          >
            <Heart className="w-4 h-4 text-brand-secondary" fill="currentColor" />
            <span>About TRH Medical</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            <span 
              className="bg-clip-text text-transparent bg-[linear-gradient(to_left,#ffffff,#9ca3af,#ffffff)] bg-[length:200%_auto] animate-shimmer-left"
            >
              Preserving Life,
            </span>
            <br className="hidden md:block" />{" "}
            <span
              className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#2a1b5e,#f69d1a,#e85615,#2a1b5e)] bg-[length:200%_auto] animate-gradient-right"
            >
              Promoting Health
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            We are the health and wellness arm of The Reinvention House Ministries Global, committed to preserving life and promoting health within our community.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-bg-card p-8 rounded-3xl border border-white/10 shadow-sm hover:border-brand-secondary/30 transition-colors"
        >
          <div className="w-12 h-12 bg-brand-primary/20 text-brand-secondary rounded-xl flex items-center justify-center mb-6 border border-brand-primary/30">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-4">Our Assignment</h2>
          <p className="text-text-secondary leading-relaxed">
            To provide immediate, professional, and compassionate medical support during church gatherings, while empowering our community with the knowledge and resources to live healthier lives for God's glory.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-bg-card p-8 rounded-3xl border border-white/10 shadow-sm hover:border-brand-secondary/30 transition-colors"
        >
          <div className="w-12 h-12 bg-brand-tertiary/20 text-brand-tertiary rounded-xl flex items-center justify-center mb-6 border border-brand-tertiary/30">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-4">Our Long-Term View</h2>
          <p className="text-text-secondary leading-relaxed">
            To be a world-class faith-based medical organization that sets the standard for excellence in church health management and community medical outreach globally.
          </p>
        </motion.div>
      </section>

      {/* Core Values */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Our Core Values</h2>
          <p className="text-text-secondary">The principles that guide our service.</p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {[
            { title: "Honour", desc: "Respecting God, leadership, and one another.", icon: Award, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
            { title: "Excellence", desc: "Upholding the highest medical standards.", icon: Star, color: "text-brand-secondary", bg: "bg-brand-secondary/10", border: "border-brand-secondary/20" },
            { title: "Accountability", desc: "Taking responsibility for our actions and care.", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { title: "Result", desc: "Delivering tangible health outcomes.", icon: Activity, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
            { title: "Trust", desc: "Building confidence through integrity and care.", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" }
          ].map((value, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className={`p-6 rounded-2xl border ${value.border} ${value.bg} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
            >
              <value.icon className={`w-8 h-8 ${value.color} mb-4`} />
              <h3 className={`text-lg font-bold ${value.color} mb-2`}>{value.title}</h3>
              <p className="text-sm text-text-secondary">{value.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="bg-bg-card rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-text-primary">Our Story</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                The TRH Medical Organisation was established out of a burden to ensure that the physical well-being of worshippers is prioritized alongside their spiritual growth. Recognizing that a healthy body is the temple of the Holy Spirit, leadership saw the need for a structured medical unit.
              </p>
              <p>
                What started as a small first-aid team has grown into a fully structured department comprising doctors, nurses, pharmacists, and emergency responders. Today, we not only cover church services but also extend our reach into the community through medical missions and health advocacy.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay z-10" />
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Medical Team History" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Star(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function Activity(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
