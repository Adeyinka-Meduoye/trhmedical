import React from 'react';
import { motion } from 'motion/react';
import { User, Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: "Dr. Simon Priestley",
    role: "Spiritual Director",
    specialty: "Mental Health & Wellness",
    image: "/images/team/simon-priestley.jpg"
  },
  {
    name: "Adeyinka Meduoye",
    role: "Emergency Response Lead",
    specialty: "Emergency Medicine",
    image: "/images/team/adeyinka.png"
  },
  {
    name: "Nurse Jennier Enwerem",
    role: "Nursing Coordinator",
    specialty: "Critical Care",
    image: "/images/team/nurse-jennier-enwerem.jpg"
  },
  {
    name: "Paramedic Faith",
    role: "Pharmacy Lead",
    specialty: "Clinical Pharmacy",
    image: "/images/team/pharm-david-wilson.jpg"
  },
  {
    name: "Nurse Jane",
    role: "Wellness Coordinator",
    specialty: "Public Health",
    image: "/images/team/nurse-jane.jpg"
  },
  {
    name: "Para. Christian Ekremide",
    role: "Logistics Officer",
    specialty: "Medical Logistics",
    image: "/images/team/christian-ekremide.jpg"
  }
];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

export default function Team() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 text-brand-secondary rounded-2xl mb-4 border border-brand-primary/30"
        >
          <User className="w-8 h-8" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-text-primary"
        >
          Meet Our Team
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-text-secondary leading-relaxed"
        >
          Dedicated professionals committed to serving God through healthcare excellence.
        </motion.p>
      </section>

      {/* Team Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {teamMembers.map((member, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="group relative bg-bg-card rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-80 z-10" />
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-brand-secondary uppercase bg-brand-primary/30 rounded-full backdrop-blur-md border border-brand-primary/20">
                  {member.role}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-slate-300 text-sm mb-4">{member.specialty}</p>
                
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <button className="p-2 rounded-full bg-white/10 hover:bg-brand-secondary hover:text-bg-dark text-white transition-colors backdrop-blur-sm">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-brand-secondary hover:text-bg-dark text-white transition-colors backdrop-blur-sm">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Join CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-brand-primary rounded-3xl p-12 text-center relative overflow-hidden border border-brand-secondary/20"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2187d80a16f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-white">Join Our Growing Team</h2>
          <p className="text-slate-300">
            Are you a medical professional looking to use your skills for the Kingdom? We'd love to have you on board.
          </p>
          <a 
            href="/volunteer" 
            className="inline-block px-8 py-4 bg-brand-secondary text-bg-dark font-bold rounded-xl hover:bg-brand-secondary/90 transition-colors shadow-lg shadow-brand-secondary/20"
          >
            Apply to Volunteer
          </a>
        </div>
      </motion.section>
    </div>
  );
}
