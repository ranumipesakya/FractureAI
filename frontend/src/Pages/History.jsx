import React from 'react';
import Navbar from '../Components/Navbar';

const History = () => {
  const records = [
    { id: 1, date: '2025-10-12', type: 'Full Body (Chest)', result: 'Rib Fracture', severity: 'Moderate' },
    { id: 2, date: '2025-10-10', type: 'Full Body (Hand)', result: 'Normal', severity: 'None' },
    { id: 3, date: '2025-09-28', type: 'Full Body (Skull)', result: 'Hairline Fracture', severity: 'High' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Patient Diagnosis History</h2>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Scan Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Diagnosis</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Severity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-700">{rec.date}</td>
                  <td className="px-6 py-4 text-gray-700">{rec.type}</td>
                  <td className="px-6 py-4 font-medium text-red-600">{rec.result}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${rec.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {rec.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline">View Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;