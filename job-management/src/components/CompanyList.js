import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyForm from './CompanyForm';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    axios.get('/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  };

  const deleteCompany = (id) => {
    axios.delete(`/companies/${id}`)
      .then(() => fetchCompanies())
      .catch(error => console.error('Error deleting company:', error));
  };

  const startEditCompany = (company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleCompanyAdded = () => {
    fetchCompanies();
    setEditingCompany(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingCompany(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Company List</h2>

      {showForm ? (
        <CompanyForm
          companyToEdit={editingCompany}
          onCompanyAdded={handleCompanyAdded}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          >
            Add New Company
          </button>

          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Id</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Description</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr key={company.id} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-sm text-gray-700">{company.id}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{company.name}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{company.description}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    <button
                      onClick={() => deleteCompany(company.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => startEditCompany(company)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CompanyList;
