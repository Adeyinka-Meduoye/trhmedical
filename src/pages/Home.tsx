import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart, Shield, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-brand-primary text-white py-20 px-6 md:px-12 flex flex-col items-center text-center gap-12 border border-brand-secondary/20 shadow-2xl shadow-brand-primary/20">
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/90 to-brand-primary/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center opacity-30" />
        
        <div className="relative z-20 flex flex-col items-center space-y-6 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/20 border border-brand-secondary/30 text-brand-secondary text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
            </span>
            Medical Team Active
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
              Serving with Compassion,
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#2a1b5e,#f69d1a,#e85615,#2a1b5e)] bg-[length:200%_auto] animate-gradient-right"
            >
              Treating with Excellence
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            TRH Medical Organisation provides comprehensive medical support, emergency response, and wellness education for The Reinvention House Ministries Global.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <div className="rounded-xl overflow-hidden">
              <Link 
                to="/volunteer" 
                className="px-6 py-3 text-white font-bold rounded-xl transition-colors flex items-center gap-2 h-full w-full bg-[linear-gradient(to_right,#2a1b5e,#f69d1a,#e85615,#2a1b5e)] bg-[length:200%_auto] animate-gradient-right hover:opacity-90"
              >
                Join Medical Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <Link to="/emergency" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-colors border border-white/10">
              Emergency Support
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Our Core Services</h2>
          <p className="text-text-secondary">We are dedicated to ensuring the health and safety of every member, visitor, and workforce member.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Event Coverage",
              desc: "On-site first aid and emergency response during Sunday services, concerts, and special programs."
            },
            {
              icon: Heart,
              title: "Workforce Wellness",
              desc: "Regular health checks (BP, Sugar) and wellness consultations for church workforce members."
            },
            {
              icon: Users,
              title: "Community Outreach",
              desc: "Extending medical love to our local community through free checkups and health education."
            }
          ].map((service, i) => (
            <div key={i} className="bg-bg-card p-8 rounded-2xl border border-white/10 shadow-sm hover:border-brand-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-primary/20 text-brand-secondary rounded-xl flex items-center justify-center mb-6 border border-brand-primary/30 group-hover:bg-brand-primary/30 transition-colors">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{service.title}</h3>
              <p className="text-text-secondary leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule Section */}
      <section className="bg-bg-card rounded-3xl p-8 md:p-12 border border-white/10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Medical Team Availability</h2>
            <p className="text-text-secondary">Our team is physically present during these times:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-2/3">
            <div className="flex items-center gap-3 bg-bg-input p-4 rounded-xl border border-white/10">
              <Clock className="w-5 h-5 text-brand-secondary" />
              <div>
                <p className="font-semibold text-text-primary">Sundays</p>
                <p className="text-xs text-text-secondary">7:00 AM - 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-bg-input p-4 rounded-xl border border-white/10">
              <Clock className="w-5 h-5 text-brand-secondary" />
              <div>
                <p className="font-semibold text-text-primary">Wednesdays</p>
                <p className="text-xs text-text-secondary">5:30 PM - 8:30 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-bg-input p-4 rounded-xl border border-white/10">
              <Clock className="w-5 h-5 text-brand-secondary" />
              <div>
                <p className="font-semibold text-text-primary">Special Events</p>
                <p className="text-xs text-text-secondary">As Scheduled</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-bg-input p-4 rounded-xl border border-white/10">
              <Clock className="w-5 h-5 text-brand-secondary" />
              <div>
                <p className="font-semibold text-text-primary">On-Call</p>
                <p className="text-xs text-text-secondary">24/7 Emergency</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
