import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar'; // Correct Capitalized path
import { useLocation, Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Download, Activity, ArrowLeft } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  // Get the image passed from Dashboard
  const { fileUrl } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Simulate AI Processing time (2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // If someone goes to this page directly without uploading
  if (!fileUrl && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <h2 className="text-2xl font-bold text-gray-700">No Image Loaded</h2>
          <Link to="/dashboard" className="mt-4 text-blue-600 hover:underline">Go back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-10 px-4">
        
        {/* Back Button */}
        <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
          <ArrowLeft size={20} className="mr-2" /> Back to Upload
        </Link>

        {loading ? (
          /* LOADING SCREEN */
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-800">Analyzing X-Ray...</h3>
            <p className="text-gray-500 mt-2">Running Deep Learning Models (CNN)</p>
            <p className="text-sm text-gray-400 mt-1">Checking for fractures in bone structure</p>
          </div>
        ) : (
          /* RESULTS SCREEN */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT COLUMN: Image Viewer */}
            <div className="space-y-4">
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                {/* The Image */}
                <img 
                  src={fileUrl} 
                  alt="X-Ray Analysis" 
                  className="w-full h-[500px] object-contain bg-black rounded-xl" 
                />
                
                {/* Heatmap Overlay (Simulated with CSS) */}
                {showHeatmap && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/20 to-transparent mix-blend-overlay pointer-events-none rounded-xl" />
                )}
                
                {/* Heatmap Toggle Button */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm p-1 rounded-full flex gap-2">
                  <button 
                    onClick={() => setShowHeatmap(false)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${!showHeatmap ? 'bg-white text-gray-900' : 'text-white hover:bg-white/10'}`}
                  >
                    Original
                  </button>
                  <button 
                    onClick={() => setShowHeatmap(true)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${showHeatmap ? 'bg-red-500 text-white' : 'text-white hover:bg-white/10'}`}
                  >
                    Heatmap
                  </button>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500">
                AI uses Grad-CAM to highlight potential fracture zones (Red Zones).
              </p>
            </div>

            {/* RIGHT COLUMN: Report */}
            <div className="space-y-6">
              
              {/* Diagnosis Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-red-500">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Diagnosis Report</h2>
                    <p className="text-gray-500 text-sm mt-1">ID: #REQ-2025-8892 • {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-full">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-red-800 uppercase tracking-wide">Detected Issue</p>
                      <p className="text-2xl font-bold text-red-700">Femur Fracture (Comminuted)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-800">Confidence</p>
                      <p className="text-2xl font-bold text-red-700">98.2%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-500">Severity Level</p>
                        <p className="text-lg font-bold text-orange-600 flex items-center gap-2">
                          High / Severe
                        </p>
                     </div>
                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-500">Recommended Action</p>
                        <p className="text-lg font-bold text-blue-600">Urgent Ortho Consult</p>
                     </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Activity size={18} className="text-blue-500"/> Clinical Findings:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                      Discontinuity observed in the mid-shaft of the femur.
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                      Significant displacement of bone fragments detected.
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                      Surrounding tissue swelling is indicated by opacity changes.
                    </li>
                  </ul>
                </div>

                <button className="w-full mt-8 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200">
                  <Download size={20} /> Download PDF Report
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;