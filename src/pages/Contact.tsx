import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('subject') as HTMLSelectElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:trhmedical@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      {/* Contact Info */}
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-4">Get in Touch</h1>
          <p className="text-lg text-text-secondary">
            Have questions about our medical services, volunteering, or partnership opportunities? We'd love to hear from you.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Email Us</h3>
              <p className="text-text-secondary mb-1">For general inquiries and partnerships.</p>
              <a href="mailto:trhmedical@gmail.com" className="text-brand-secondary font-medium hover:underline">trhmedical@gmail.com</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-secondary/20 text-brand-secondary rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Call Us</h3>
              <p className="text-text-secondary mb-1">Mon-Sun from 9am to 5pm.</p>
              <a href="tel:+2348185546555" className="text-brand-secondary font-medium hover:underline">+234 (818) 554-6555</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-tertiary/20 text-brand-tertiary rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Visit Us</h3>
              <p className="text-text-secondary">
                The Reinvention House Ministries Global<br/>
                The Banquet Hall, Starjen Hotel,<br/>
                Doyin/Igbo Elerin Bus-Stop, Ojo, Okokomaiko,<br/>
                Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg-card p-6 rounded-2xl border border-white/10">
          <h4 className="font-bold text-text-primary mb-2">Medical Emergency?</h4>
          <p className="text-sm text-text-secondary mb-4">
            Please do not use this form for urgent medical situations. Use the emergency button below or call emergency services immediately.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-bg-card p-8 rounded-3xl border border-white/10 shadow-lg shadow-black/20">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Send a Message</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">First Name</label>
              <input name="firstName" type="text" className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none transition-all text-text-primary placeholder-text-secondary/50" placeholder="John" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Last Name</label>
              <input name="lastName" type="text" className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none transition-all text-text-primary placeholder-text-secondary/50" placeholder="Doe" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
            <input name="email" type="email" className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none transition-all text-text-primary placeholder-text-secondary/50" placeholder="john@example.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Subject</label>
            <select name="subject" className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none transition-all text-text-primary">
              <option>General Inquiry</option>
              <option>Volunteering</option>
              <option>Partnership</option>
              <option>Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Message</label>
            <textarea name="message" rows={4} className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none transition-all resize-none text-text-primary placeholder-text-secondary/50" placeholder="How can we help you?" required />
          </div>

          <button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-2">
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </form>
      </div>

    </div>
  );
}
