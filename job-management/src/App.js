import React, { useState } from 'react';
import JobList from './components/JobList';
import CompanyList from './components/CompanyList';
import ReviewList from './components/ReviewList';

const App = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div>
      <div className="bg-gray-800 text-white py-2">
        <nav className="max-w-4xl mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 ${activeTab === 'jobs' ? 'bg-gray-700' : ''}`}
          >
            Jobs
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-4 py-2 ${activeTab === 'companies' ? 'bg-gray-700' : ''}`}
          >
            Companies
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 ${activeTab === 'reviews' ? 'bg-gray-700' : ''}`}
          >
            Reviews
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'jobs' && (
          <>
            <JobList />
          </>
        )}
        {activeTab === 'companies' && <CompanyList />}
        {activeTab === 'reviews' && <ReviewList/>}
      </div>
    </div>
  );
};

export default App;
