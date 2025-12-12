import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, ArrowLeft } from 'lucide-react';
import Navbar from '../Components/Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Connect to your REAL backend URL
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('✅ Success! Check your Backend Terminal/Console for the Reset Link.');
      } else {
        setError('❌ ' + data.message);
      }
    } catch (err) {
      setError('❌ Server error. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <div className="flex items-center justify-center py-20 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-teal-500">
          
          <div className="text-center mb-8">
            <div className="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100">
              <Activity className="h-10 w-10 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Forgot Password?</h2>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              Don't worry! Enter your registered email address and we will generate a secure reset link for you.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="p-4 mb-6 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium text-center animate-pulse">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  required 
                  className="w-full pl-11 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-gray-700"
                  placeholder="doctor@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/30 transition-all transform active:scale-95"
            >
              {loading ? 'Searching Database...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <Link to="/login" className="text-gray-500 hover:text-teal-600 font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;