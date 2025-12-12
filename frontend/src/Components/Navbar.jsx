import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('fractureUser'));

  const handleLogout = () => {
    localStorage.removeItem('fractureUser');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                Fracture<span className="text-blue-600">AI</span>
              </span>
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-6">
            {user ? (
              /* If User is Logged In */
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
                <div className="h-6 w-px bg-gray-200"></div>
                <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              /* If NOT Logged In - ONLY Show Login Button */
              <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2">
                <User size={18} /> Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;