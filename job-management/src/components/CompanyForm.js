import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyForm = ({ companyToEdit, onCompanyAdded, onCancel }) => {
  const [company, setCompany] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (companyToEdit) {
      setCompany({
        name: companyToEdit.name,
        description: companyToEdit.description
      });
    }
  }, [companyToEdit]);

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.name || !company.description) {
      setError('Please fill in all fields.');
      return;
    }

    const request = companyToEdit
      ? axios.put(`/companies/${companyToEdit.id}`, company)
      : axios.post('/companies', company);

    request
      .then(() => {
        setCompany({ name: '', description: '' });
        setError('');
        onCompanyAdded();
      })
      .catch(error => {
        console.error('Error saving company:', error);
        setError('An error occurred while saving the company.');
      });
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {companyToEdit ? 'Edit Company' : 'Add New Company'}
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={company.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {companyToEdit ? 'Update Company' : 'Add Company'}
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

export default CompanyForm;
