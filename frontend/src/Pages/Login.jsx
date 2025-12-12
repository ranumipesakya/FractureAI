import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Home, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [customerType, setCustomerType] = useState('guest');
  
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // UPDATED LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // FIX: Changed endpoint to /login (was /register)
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is ok before parsing JSON to avoid "<" syntax error
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server sent invalid response (not JSON)");
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('fractureUser', JSON.stringify(data.user));
        navigate('/dashboard'); // Change this to your actual dashboard route
        alert("Login Successful!");
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Cannot connect to server. Ensure Backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (customerType === 'register') {
      navigate('/register');
    } else {
      alert("Guest feature coming soon. Please register.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col md:flex-row min-h-[650px]"
      >
        
        {/* LEFT SIDE: New Customer */}
        <div className="w-full md:w-1/2 p-12 bg-white flex flex-col relative justify-center">
          
          <div className="absolute top-8 left-8 flex items-center gap-2">
             <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
                <Activity className="h-6 w-6 text-white" />
             </div>
             <span className="text-2xl font-bold text-gray-800 tracking-tight">
               Fracture<span className="text-blue-600">AI</span>
             </span>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">New Customer</h2>
            <div className="h-1 w-20 bg-blue-500 rounded-full mb-8"></div>
            
            <div className="space-y-6 mb-10">
              <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${customerType === 'guest' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${customerType === 'guest' ? 'border-blue-600' : 'border-gray-300'}`}>
                  {customerType === 'guest' && <motion.div layoutId="dot" className="w-3 h-3 bg-blue-600 rounded-full" />}
                </div>
                <input type="radio" className="hidden" checked={customerType === 'guest'} onChange={() => setCustomerType('guest')} />
                <div>
                   <span className="block text-gray-900 font-bold text-lg">Guest Checkout</span>
                   <span className="text-sm text-gray-500">Quick access without saving history</span>
                </div>
              </label>
              
              <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${customerType === 'register' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${customerType === 'register' ? 'border-blue-600' : 'border-gray-300'}`}>
                  {customerType === 'register' && <motion.div layoutId="dot" className="w-3 h-3 bg-blue-600 rounded-full" />}
                </div>
                <input type="radio" className="hidden" checked={customerType === 'register'} onChange={() => setCustomerType('register')} />
                <div>
                   <span className="block text-gray-900 font-bold text-lg">Register Account</span>
                   <span className="text-sm text-gray-500">Save full diagnosis history & reports</span>
                </div>
              </label>
            </div>

            <button 
              onClick={handleContinue}
              className="group w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              CONTINUE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* RIGHT SIDE: User Login */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-teal-500 to-teal-700 p-12 text-white relative flex flex-col justify-center">
          
          <Link to="/" className="absolute top-8 right-8 flex items-center gap-2 text-white/80 hover:text-white transition font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
             <Home size={16} /> Back
          </Link>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">User Login</h2>

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-500/80 text-white p-3 rounded-lg mb-4 text-center text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 ml-1 text-teal-50">Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="doctor@hospital.com"
                  className="w-full p-4 rounded-xl bg-white/20 border border-white/10 text-white placeholder-teal-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 ml-1 text-teal-50">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="••••••••"
                    className="w-full p-4 rounded-xl bg-white/20 border border-white/10 text-white placeholder-teal-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-teal-100 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                <div className="text-right mt-3">
                   <button 
                    type="button" 
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-teal-100 hover:text-white font-medium hover:underline"
                   >
                     Forgot Password?
                   </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'LOGGING IN...' : 'SECURE LOGIN'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
               <p className="text-teal-100 text-sm">Don't have an account? <span onClick={() => navigate('/register')} className="text-white font-bold cursor-pointer hover:underline">Register Here</span></p>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;