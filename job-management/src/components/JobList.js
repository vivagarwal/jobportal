import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobForm from './JobForm';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
  }, []);

  const fetchJobs = () => {
    axios.get('/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  };

  const fetchCompanies = () => {
    axios.get('/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  };

  const deleteJob = (id) => {
    axios.delete(`/jobs/${id}`)
      .then(() => fetchJobs())
      .catch(error => console.error('Error deleting job:', error));
  };

  const startEditJob = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleSave = () => {
    fetchJobs();
    setShowForm(false);
    setEditingJob(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  return (
    <div>
      {showForm ? (
        <div>
          <button
            onClick={() => {
              setEditingJob(null);
              setShowForm(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
          >
            Add New Job
          </button>

          <JobForm
            job={editingJob}
            onSave={handleSave}
            onCancel={handleCancel}
            companies={companies}
          />
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Job List</h2>
          <button
            onClick={() => {
              setEditingJob(null);
              setShowForm(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
          >
            Add New Job
          </button>

          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Id</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Description</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Min Salary</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Max Salary</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Location</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Company</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-sm text-gray-700">{job.id}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.title}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.description}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.minSalary}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.maxSalary}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.location}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.company.name}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => startEditJob(job)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobList;
