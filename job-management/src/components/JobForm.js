import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobForm = ({ job, onSave, onCancel, companies }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minSalary: '',
    maxSalary: '',
    location: '',
    companyId: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        location: job.location,
        companyId: job.company ? job.company.id : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        minSalary: '',
        maxSalary: '',
        location: '',
        companyId: ''
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.minSalary || !formData.maxSalary || !formData.location || !formData.companyId) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    const formattedJob = {
      title: formData.title,
      description: formData.description,
      minSalary: formData.minSalary,
      maxSalary: formData.maxSalary,
      location: formData.location,
      company: {
        id: formData.companyId
      }
    };

    if (job && job.id) {
      axios.put(`/jobs/${job.id}`, formattedJob)
        .then(() => {
          onSave();
        })
        .catch(error => console.error('Error updating job:', error));
    } else {
      axios.post('/jobs', formattedJob)
        .then(() => {
          onSave();
        })
        .catch(error => console.error('Error creating job:', error));
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">{job ? 'Edit Job' : 'Create Job'}</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Salary</label>
            <input
              type="text"
              name="minSalary"
              value={formData.minSalary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Salary</label>
            <input
              type="text"
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <select
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Company</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {job ? 'Save Changes' : 'Create Job'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default JobForm;
