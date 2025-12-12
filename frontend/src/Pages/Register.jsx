import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Home, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  
  const [formData, setFormData] = useState({
    salutation: 'Mr.',
    firstName: '',
    surname: '',
    mobile: '',
    email: '',
    password: '',       // Added
    confirmPassword: '' // Added
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // 1. Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const fullName = `${formData.salutation} ${formData.firstName} ${formData.surname}`;

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password // Sending the real password now
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Registration Successful! Please Login.");
        navigate('/login');
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Server Error:", error);
      alert("Could not connect to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col md:flex-row min-h-[800px]"
      >
        
        {/* LEFT SIDE: Visuals */}
        <div className="w-full md:w-5/12 bg-gray-50 p-10 flex flex-col relative justify-between">
           <div className="flex items-center gap-2">
             <div className="bg-blue-600 p-2 rounded-xl shadow-md">
                <Activity className="h-6 w-6 text-white" />
             </div>
             <span className="text-2xl font-bold text-gray-800">Fracture<span className="text-blue-600">AI</span></span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center">
             <img 
               src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg" 
               alt="Secure Registration"
               className="w-full max-w-xs object-contain mb-8 mix-blend-multiply"
             />
             <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the Network</h3>
             <ul className="text-left space-y-3 text-gray-600">
               <li className="flex items-center gap-3"><CheckCircle size={20} className="text-teal-500" /> Save patient diagnosis history</li>
               <li className="flex items-center gap-3"><CheckCircle size={20} className="text-teal-500" /> Generate PDF medical reports</li>
               <li className="flex items-center gap-3"><CheckCircle size={20} className="text-teal-500" /> 24/7 AI-Powered analysis</li>
             </ul>
          </div>

          <div className="mt-8">
             <Link to="/" className="text-gray-500 hover:text-blue-600 font-semibold flex items-center gap-2 transition">
               <Home size={18} /> Back to Home page
             </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Form (Teal Gradient) */}
        <div className="w-full md:w-7/12 bg-gradient-to-br from-teal-500 to-teal-700 p-12 text-white flex flex-col justify-center relative">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <h2 className="text-4xl font-bold mb-2">Create Account</h2>
          <p className="text-teal-100 mb-8">Register to access advanced fracture diagnostics.</p>

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
            
            <div className="md:col-span-2 grid grid-cols-12 gap-4">
               {/* Salutation */}
               <div className="col-span-4 md:col-span-3">
                  <label className="block text-sm mb-1 font-medium text-teal-50">Title</label>
                  <select name="salutation" className="w-full p-3 rounded-xl text-gray-800 bg-white focus:outline-none" onChange={handleChange}>
                    <option>Miss.</option>
                    <option>Mrs.</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                  </select>
               </div>
               {/* First Name */}
               <div className="col-span-8 md:col-span-9">
                  <label className="block text-sm mb-1 font-medium text-teal-50">First Name</label>
                  <input type="text" name="firstName" required className="w-full p-3 rounded-xl text-gray-800 focus:outline-none" onChange={handleChange} placeholder="Alice" />
               </div>
            </div>

            {/* Surname */}
            <div className="md:col-span-2">
               <label className="block text-sm mb-1 font-medium text-teal-50">Surname</label>
               <input type="text" name="surname" required className="w-full p-3 rounded-xl text-gray-800 focus:outline-none" onChange={handleChange} placeholder="Joe" />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm mb-1 font-medium text-teal-50">Mobile Number</label>
              <input type="tel" name="mobile" required className="w-full p-3 rounded-xl text-gray-800 focus:outline-none" onChange={handleChange} placeholder="+94 70 123 1234" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1 font-medium text-teal-50">Email Address</label>
              <input type="email" name="email" required className="w-full p-3 rounded-xl text-gray-800 focus:outline-none" onChange={handleChange} placeholder="Joe@gmail.com" />
            </div>

            {/* --- NEW PASSWORD FIELDS --- */}
            
            <div>
              <label className="block text-sm mb-1 font-medium text-teal-50">Password</label>
              <div className="relative">
                <input 
                  type={showPass ? "text" : "password"} 
                  name="password" 
                  required 
                  className="w-full p-3 rounded-xl text-gray-800 focus:outline-none" 
                  onChange={handleChange} 
                  placeholder="••••••••" 
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium text-teal-50">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                required 
                className="w-full p-3 rounded-xl text-gray-800 focus:outline-none" 
                onChange={handleChange} 
                placeholder="••••••••" 
              />
            </div>

            {/* --------------------------- */}

            {/* Terms */}
            <div className="md:col-span-2 flex items-start mt-2 bg-teal-800/30 p-3 rounded-xl border border-teal-400/30">
              <input type="checkbox" required className="mt-1 w-5 h-5 rounded text-teal-600 focus:ring-teal-500 bg-white" />
              <span className="ml-3 text-sm leading-tight text-teal-50 font-light">
                I agree to the <span className="underline decoration-pink-400 cursor-pointer hover:text-white">Terms of Service</span>.
              </span>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button 
                type="submit" 
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-pink-500/20 transition-all transform hover:-translate-y-1 text-lg tracking-wide"
              >
                COMPLETE REGISTRATION
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;