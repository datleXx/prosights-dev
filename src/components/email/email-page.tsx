import React from 'react';

const EmailPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Your emails</h1>
        <p className="text-gray-600 mb-6">All your emails accessible in one place.</p>
        <div className="flex space-x-4 mb-6">
          <button className="px-4 py-2 bg-gray-200 rounded-md">All inbox</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Gmail</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Outlook</button>
        </div>
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add account +</button>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Heads up!</p>
          <p>We are in the process of getting SOC2 Certification. Its safe to proceed through the Google Authentication warning screen.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Gmail</h2>
          <input
            type="text"
            placeholder="Search for file"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="bg-gray-200 h-12 mb-2"></div>
          <div className="bg-gray-200 h-12 mb-2"></div>
          <div className="bg-gray-200 h-12 mb-2"></div>
          <div className="bg-gray-200 h-12 mb-2"></div>
          <div className="bg-gray-200 h-12 mb-2"></div>
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
