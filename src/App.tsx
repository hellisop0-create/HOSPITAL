/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Heart, 
  Stethoscope, 
  Activity, 
  ShieldCheck, 
  Users, 
  Calendar,
  Menu,
  X,
  ArrowRight,
  Star
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: 'cardiology',
    title: 'Cardiology',
    description: 'Expert heart care using advanced diagnostic tools and personalized treatment plans.',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-rose-50 text-rose-600'
  },
  {
    id: 'neurology',
    title: 'Neurology',
    description: 'Comprehensive treatment for brain, spine, and nervous system disorders.',
    icon: <Activity className="w-6 h-6" />,
    color: 'bg-indigo-50 text-indigo-600'
  },
  {
    id: 'pediatrics',
    title: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents in a kid-friendly environment.',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    id: 'diagnostics',
    title: 'Advanced Diagnostics',
    description: 'State-of-the-art imaging and laboratory services for accurate and timely results.',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'bg-amber-50 text-amber-600'
  }
];

const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Chief Cardiologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77e?auto=format&fit=crop&q=80&w=300&h=400',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=400',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    specialty: 'Pediatric Specialist',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=400',
    rating: 5.0
  }
];

// --- Components ---
const Section = ({ children, className = '', id = '' }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Stethoscope size={24} />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
            MediCare<span className="text-blue-600">Premium</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Services', 'Doctors', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Book Appointment
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden border-t border-slate-100"
          >
            <div className="flex flex-col gap-4">
              {['Home', 'Services', 'Doctors', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-slate-600 py-2 border-b border-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold mt-4">
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <Section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-200/40 rounded-full blur-3xl opacity-40" />

      <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            24/7 Premium Medical Care
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Compassionate <br /> Care, <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Advanced</span> Solutions.
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            Your health is our priority. We combine world-class medical expertise with personalized care to ensure you and your family live healthier lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200 group">
              Start Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all border-2 border-slate-200 flex items-center justify-center gap-2">
              View Departments
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Patient" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-sm font-medium text-slate-500">10k+ Happy Patients</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200&h=800" 
              alt="Hospital Interior" 
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          
          {/* Floating Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden lg:block max-w-[240px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Wait Time</p>
                <p className="text-sm font-bold text-slate-900">&lt; 15 Mins</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 italic">"Faster response times, better recovery."</p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

const Services = () => {
  return (
    <Section id="services" className="bg-white">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Specialized Services</h2>
        <p className="text-slate-600">We offer a wide range of medical specialties staffed by world-class experts dedicated to your well-being.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.description}</p>
            <button className="text-blue-600 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Learn More <ChevronRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Doctors = () => {
  return (
    <Section id="doctors" className="bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Specialist Team</h2>
          <p className="text-slate-600">A dedicated team of experts bringing years of clinical excellence to our patients every single day.</p>
        </div>
        <button className="bg-white text-slate-900 px-6 py-3 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
          View All Doctors <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {DOCTORS.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 group shadow-sm hover:shadow-lg transition-all"
          >
            <div className="relative overflow-hidden h-96">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{doctor.specialty}</p>
                  <p className="text-lg font-bold text-slate-900">{doctor.name}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold">{doctor.rating}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Contact = () => {
  return (
    <Section id="contact" className="bg-white">
      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white grid lg:grid-cols-2 gap-16 overflow-hidden relative">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Prioritize Your Health?</h2>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            Contact us today to schedule an appointment with one of our specialists. We're here to provide the care you deserve.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-2xl">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Emergency Call</p>
                <p className="text-xl font-bold">03123456</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-slate-800 p-3 rounded-2xl">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Location</p>
                <p className="text-xl font-bold">HYDERABAD, SINDH</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-slate-800 p-3 rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                <p className="text-xl font-bold">SAQLAINBHAI@GMAIL.COM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 text-slate-900">
          <h3 className="text-2xl font-bold mb-6">Schedule Visit</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-500 mb-2 block">Full Name</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600/20" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-500 mb-2 block">Email</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600/20" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">Select Department</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600/20">
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
                <option>Others</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">Message</label>
              <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600/20" placeholder="Tell us how we can help..."></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer className="bg-slate-50 pt-20 pb-10 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
      <div className="max-w-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Stethoscope size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            MediCare<span className="text-blue-600">Premium</span>
          </span>
        </div>
        <p className="text-slate-500 leading-relaxed">
          Providing world-class medical services with a heart. Dedicated to excellence, innovation, and compassion in healthcare since 1995.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Explore</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Our Doctors</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Services</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Specialties</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Cardiology</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Neurology</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Pediatrics</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Diagnostic</a></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
          <p className="text-sm text-slate-500 mb-4">Subscribe to our health tips and news.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none w-full" />
            <button className="bg-blue-600 text-white p-2 rounded-lg"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-xs text-slate-400 font-medium">© 2026 MediCare Premium Hospital. All rights reserved.</p>
      <div className="flex gap-6 text-xs text-slate-400 font-medium">
        <a href="#" className="hover:text-blue-600">Privacy Policy</a>
        <a href="#" className="hover:text-blue-600">Terms of Use</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      <Navbar />
      <Hero />
      <Services />
      <Doctors />
      <Contact />
      <Footer />
    </div>
  );
}
