import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);

  // SECURITY CHECK: If no user, kick them out
  useEffect(() => {
    const user = localStorage.getItem('fractureUser');
    if (!user) {
      navigate('/register');
    }
  }, [navigate]);

  const handleFile = (file) => {
    const fileUrl = URL.createObjectURL(file);
    navigate('/results', { state: { fileUrl, fileName: file.name } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">New Diagnosis</h2>
        <p className="text-gray-500 mb-8">Upload X-rays for immediate AI Analysis.</p>

        <div 
          className="bg-white border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center hover:border-blue-500 transition-colors"
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
        >
          <div className="flex flex-col items-center">
            <div className="bg-blue-50 p-6 rounded-full mb-4">
              <UploadCloud className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Drag & Drop X-Ray Image</h3>
            <p className="text-gray-400 mt-2 mb-6">Supported: JPEG, PNG, DICOM</p>
            <input 
              type="file" 
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden" 
              id="fileUpload" 
            />
            <label htmlFor="fileUpload" className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Browse Files
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;