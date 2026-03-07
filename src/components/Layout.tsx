import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Activity, Users, Calendar, Phone, FileText, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import WhatsAppEmergencyButton from './WhatsAppButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Heart },
    { name: 'Services', path: '/services', icon: Activity },
    { name: 'Volunteer', path: '/volunteer', icon: Users },
    { name: 'Check-up', path: '/workforce', icon: Calendar },
    { name: 'Emergency', path: '/emergency', icon: Phone },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Admin', path: '/admin', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-bg-dark font-sans text-text-primary">
      {/* Navigation */}
      <nav className="bg-bg-dark/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <img src="/images/logo-trans.png" alt="TRH Medical" className="w-10 h-10 rounded-lg" />
                <div>
                  <h1 className="font-bold text-lg leading-none text-text-primary">TRH Medical</h1>
                  <p className="text-[10px] font-medium text-brand-secondary uppercase tracking-wider">Reinvention House</p>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isActive
                        ? 'bg-brand-primary/20 text-brand-secondary border border-brand-primary/30'
                        : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="ml-4 px-4 py-2 bg-brand-secondary text-bg-dark text-sm font-bold rounded-lg hover:bg-brand-secondary/90 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-text-secondary hover:bg-white/5 hover:text-text-primary"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden border-t border-white/10 bg-bg-dark"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-text-secondary hover:bg-white/5 hover:text-text-primary flex items-center gap-3"
                >
                  <item.icon className="w-5 h-5 text-text-secondary" />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-bg-card border-t border-white/10 text-text-secondary py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-brand-primary rounded flex items-center justify-center">
                <img src="/images/TRH-white-trans.png"
                  alt="TRH Medical"
                  className="h-8 w-auto"
                />
              </div>
              <span className="font-bold text-text-primary">TRH Medical Organisation</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-text-secondary">
              Providing excellence in healthcare support, emergency response, and wellness education for The Reinvention House Ministries Global.
            </p>
          </div>
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-secondary transition-colors">About Us</Link></li>
              <li><Link to="/team" className="hover:text-brand-secondary transition-colors">Our Team</Link></li>
              <li><Link to="/services" className="hover:text-brand-secondary transition-colors">Services</Link></li>
              <li><Link to="/volunteer" className="hover:text-brand-secondary transition-colors">Join the Team</Link></li>
              <li><Link to="/emergency" className="hover:text-brand-secondary transition-colors">Emergency Support</Link></li>
              <li><Link to="/blog" className="hover:text-brand-secondary transition-colors">Health & Wellness Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>trhmedical@gmail.com</li>
              <li>+2348185546555</li>
              <li>The Banquet Hall, Starjen Hotel, Doyin/Igbo Elerin Bus-Stop, Ojo, Okokomaiko, Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary">
          <p>© {new Date().getFullYear()} TRH Medical Organisation. All rights reserved.</p>
          <p className="opacity-70">Developed by TRH Innovation & Technology Organisation</p>
        </div>
      </footer>

      {/* Global Emergency Button */}
      <WhatsAppEmergencyButton />
    </div>
  );
}
