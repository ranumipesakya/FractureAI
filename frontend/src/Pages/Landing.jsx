import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, UserCheck, Activity, Zap, FileSearch } from 'lucide-react';

const Landing = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('fractureUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-teal-100/50 border border-teal-200 text-teal-700 px-4 py-2 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
              <ShieldCheck size={16} className="text-teal-600" /> 
              FDA-Standard AI Algorithms
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              Precision Diagnosis for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                 Fractures
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Utilizing advanced CNNs to detect <strong>all</strong> fractures with over high accuracy. Get instant, AI-powered insights visualized with Grad-CAM heatmaps.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              {user ? (
                <Link to="/dashboard" className="group bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-teal-200 flex items-center gap-3 transform hover:-translate-y-1">
                  <UserCheck size={20} /> 
                  <span>Start Diagnosis</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link to="/login" className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-3 transform hover:-translate-y-1">
                  Login / Sign Up
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              
              
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-6 text-gray-400 text-sm font-medium">
              <span>Trusted by:</span>
              <div className="flex gap-4 opacity-70 grayscale">
                <span>🏥 City Hospital</span>
                <span>🩺 OrthoClinic</span>
                <span>⚕️ MedTech Labs</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image with Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent z-10"></div>
              {/* Main Doctor Image */}
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/doctor.jpeg"; // Fallback to your local image
                }}
                alt="Doctor Analyzing X-Ray" 
                className="w-full h-[600px] object-cover"
              />
              
              {/* Floating AI Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-8 left-8 z-20 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-xs border-l-4 border-teal-500"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Activity size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Fracture Detected</h4>
                    <p className="text-xs text-gray-500 mt-1">Confidence Score: <span className="text-teal-600 font-bold">high</span></p>
                    <p className="text-xs text-gray-500">Region: <span className="font-medium">Distal Tibia</span></p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background Decorative Blobs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          </motion.div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="bg-teal-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-teal-500/50">
            <div>
              <div className="text-4xl font-bold text-white mb-1">90%+</div>
              <div className="text-teal-100 text-sm">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">&lt;2s</div>
              <div className="text-teal-100 text-sm">Analysis Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-teal-100 text-sm">Availability</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">0%</div>
              <div className="text-teal-100 text-sm">Radiation Risk</div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How FractureAI Works</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Our 3-step process simplifies complex medical diagnostics, assisting professionals in making faster decisions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <FileSearch size={32} />, 
                title: "1. Upload X-Ray", 
                desc: "Simply drag and drop your leg X-ray (JPEG/PNG). System pre-processes the image instantly." 
              },
              { 
                icon: <Zap size={32} />, 
                title: "2. AI Analysis", 
                desc: "Our CNN model scans for fractures  using deep learning." 
              },
              { 
                icon: <Activity size={32} />, 
                title: "3. Get Results", 
                desc: "View the diagnosis with a severity score and a Grad-CAM heatmap highlighting the injury." 
              }
            ].map((step, index) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={index} 
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-blue-600">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Fracture<span className="text-blue-500">AI</span>
            </span>
          </div>
          <p className="text-sm">© 2025 Fracture AI All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;