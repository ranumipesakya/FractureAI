import React from 'react';
import Navbar from '../Components/Navbar';

const Physiotherapy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Physiotherapy Guidelines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Immediate Care (R.I.C.E)</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>**Rest:** Avoid putting weight on the injured area.</li>
              <li>**Ice:** Apply ice packs for 20 minutes every 2 hours.</li>
              <li>**Compression:** Use a bandage to reduce swelling.</li>
              <li>**Elevation:** Keep the injured limb raised above heart level.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
             <h3 className="text-xl font-bold text-blue-600 mb-2">Post-Cast Exercises</h3>
             <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Gentle range-of-motion stretching.</li>
              <li>Strengthening exercises with resistance bands.</li>
              <li>Balance training for leg fractures.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Physiotherapy;