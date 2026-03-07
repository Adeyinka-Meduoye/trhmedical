import React from 'react';
import { Shield, Heart, Users, BookOpen, Activity, Ambulance, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MedicalServices() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 text-brand-secondary rounded-2xl mb-4 border border-brand-primary/30">
          <Activity className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary">Medical Services</h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          TRH Medical Organisation provides a holistic range of health services designed to ensure safety during worship and promote long-term wellness for our community.
        </p>
      </section>

      {/* Core Services Detail */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Event Coverage */}
        <div className="bg-bg-card p-8 rounded-3xl border border-white/10 shadow-sm hover:border-brand-secondary/30 transition-colors">
          <div className="w-12 h-12 bg-brand-primary/20 text-brand-secondary rounded-xl flex items-center justify-center mb-6 border border-brand-primary/30">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Event Medical Coverage</h3>
          <p className="text-text-secondary mb-6">
            We provide on-site medical standby for all major church gatherings. Our team is equipped with first aid kits, AEDs, and emergency response protocols to handle incidents swiftly.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-brand-secondary" />
              <span>Sunday & Midweek Services</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-brand-secondary" />
              <span>Concerts & Conferences</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-brand-secondary" />
              <span>Crowd Safety Management</span>
            </li>
          </ul>
        </div>

        {/* Workforce Wellness */}
        <div className="bg-bg-card p-8 rounded-3xl border border-white/10 shadow-sm hover:border-brand-secondary/30 transition-colors">
          <div className="w-12 h-12 bg-brand-tertiary/20 text-brand-tertiary rounded-xl flex items-center justify-center mb-6 border border-brand-tertiary/30">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Workforce Wellness</h3>
          <p className="text-text-secondary mb-6">
            Ensuring our pastors, ministers, and volunteers are physically fit to serve. We offer regular screenings to detect and manage lifestyle conditions early.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-brand-tertiary" />
              <span>Blood Pressure Monitoring</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-brand-tertiary" />
              <span>Blood Sugar Checks</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-brand-tertiary" />
              <span>BMI & Nutritional Advice</span>
            </li>
          </ul>
          <div className="mt-8">
            <Link to="/workforce" className="text-brand-tertiary font-semibold hover:text-text-primary flex items-center gap-2 transition-colors">
              Book a Checkup <Calendar className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Emergency Response */}
        <div className="bg-bg-card p-8 rounded-3xl border border-white/10 shadow-sm hover:border-brand-secondary/30 transition-colors">
          <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center mb-6 border border-red-500/30">
            <Ambulance className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Emergency Response</h3>
          <p className="text-text-secondary mb-6">
            A rapid response system for critical medical situations. We coordinate with local hospitals and ambulance services to ensure seamless transfer of care when needed.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-red-500" />
              <span>Triage & Stabilization</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-red-500" />
              <span>Hospital Referral Network</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-red-500" />
              <span>Ambulance Coordination</span>
            </li>
          </ul>
          <div className="mt-8">
            <Link to="/emergency" className="text-red-500 font-semibold hover:text-text-primary flex items-center gap-2 transition-colors">
              View Emergency Protocols <Calendar className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Community Outreach */}
        <div className="bg-bg-card p-8 rounded-3xl border border-white/10 shadow-sm hover:border-brand-secondary/30 transition-colors">
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6 border border-purple-500/30">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Community Outreach</h3>
          <p className="text-text-secondary mb-6">
            Extending the healing hand of Jesus to our local community. We organize periodic medical missions to provide free healthcare to the underserved.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-purple-500" />
              <span>Free Medical Consultations</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-purple-500" />
              <span>Drug Distribution</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-purple-500" />
              <span>Health Education Seminars</span>
            </li>
          </ul>
        </div>

        {/* Health Education */}
        <div className="bg-bg-card p-8 rounded-3xl border border-white/10 shadow-sm hover:border-brand-secondary/30 transition-colors">
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6 border border-blue-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Health Education</h3>
          <p className="text-text-secondary mb-6">
            Workshops and seminars on preventive health, nutrition, mental health, and first aid training for church workers.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <span>Preventive Health Workshops</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <span>First Aid Training</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <span>Mental Health Seminars</span>
            </li>
          </ul>
        </div>

        {/* Tele-Consultation */}
        <div className="bg-bg-card p-8 rounded-3xl border border-white/10 shadow-sm hover:border-brand-secondary/30 transition-colors">
          <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-6 border border-green-500/30">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Tele-Consultation</h3>
          <p className="text-text-secondary mb-6">
            Remote medical advice and triage for members who cannot make it to the church clinic physically, utilizing our digital platforms.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Remote Triage</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Digital Health Advice</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Virtual Follow-ups</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Education & Resources */}
      <section className="bg-brand-primary rounded-3xl p-8 md:p-12 text-white overflow-hidden relative border border-brand-secondary/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Health Education</span>
            </div>
            <h2 className="text-3xl font-bold">Knowledge is Health</h2>
            <p className="text-slate-300 text-lg">
              We believe in the power of preventive education. Access our library of health tips, first aid guides, and wellness articles.
            </p>
            <Link to="/blog" className="inline-block px-6 py-3 bg-brand-secondary text-bg-dark font-bold rounded-xl hover:bg-brand-secondary/90 transition-colors">
              Browse Health Articles
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="grid grid-cols-2 gap-4 opacity-80">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                <h4 className="font-bold mb-1">CPR Basics</h4>
                <p className="text-xs text-slate-400">Life-saving techniques</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm mt-8 border border-white/5">
                <h4 className="font-bold mb-1">Diet & Nutrition</h4>
                <p className="text-xs text-slate-400">Eating for longevity</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                <h4 className="font-bold mb-1">Mental Health</h4>
                <p className="text-xs text-slate-400">Managing stress</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm mt-8 border border-white/5">
                <h4 className="font-bold mb-1">Child Safety</h4>
                <p className="text-xs text-slate-400">Protecting our little ones</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
