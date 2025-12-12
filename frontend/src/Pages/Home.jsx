
import React, { useState } from 'react';
import Navbar from '../Components/Navbar'; // Check if your folder is named 'Components' or 'components'
import { UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);

  // 1. Handle Drag Enter
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // 2. Handle Drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // 3. Handle Manual File Selection
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // 4. Send File to Results Page
  const handleFile = (file) => {
    const fileUrl = URL.createObjectURL(file);
    // This sends the user to the '/results' page with the image data
    navigate('/results', { state: { fileUrl, fileName: file.name } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Content Body */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Upload Leg X-Ray</h2>
          <p className="text-gray-500 mt-2">
            AI Detection for Femur, Tibia, and Fibula Fractures
          </p>
        </div>

        {/* Drag & Drop Box */}
        <div 
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-200 ease-in-out ${dragActive ? 'border-medical-500 bg-medical-50' : 'border-gray-300 bg-white'}`}
          onDragEnter={handleDrag} 
          onDragLeave={handleDrag} 
          onDragOver={handleDrag} 
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept="image/*"
          />
          
          <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
            <div className="p-4 bg-medical-100 rounded-full">
              <UploadCloud className="h-10 w-10 text-medical-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Drag & Drop X-Ray here</h3>
            <p className="text-gray-400">or click to browse files</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home