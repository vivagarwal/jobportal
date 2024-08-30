// ReviewList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const ReviewList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    axios.get('/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const fetchReviews = (companyId) => {
    axios.get(`/companies/${companyId}/reviews`)
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  };

  const handleCompanySelect = (e) => {
    const companyId = e.target.value;
    setSelectedCompanyId(companyId);
    fetchReviews(companyId);
  };

  const deleteReview = (id) => {
    axios.delete(`/companies/${selectedCompanyId}/reviews/${id}`)
      .then(() => fetchReviews(selectedCompanyId))
      .catch(error => console.error('Error deleting review:', error));
  };

  const startEditReview = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleSave = () => {
    fetchReviews(selectedCompanyId);
    setShowForm(false);
    setEditingReview(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Review Management</h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Select Company</label>
        <select
          value={selectedCompanyId || ''}
          onChange={handleCompanySelect}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCompanyId && (
        <>
          <button
            onClick={() => {
              setEditingReview(null);
              setShowForm(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
          >
            Add New Review
          </button>

          {showForm && (
            <ReviewForm
              review={editingReview}
              onSave={handleSave}
              onCancel={handleCancel}
              companyId={selectedCompanyId}
            />
          )}

          <div className="mt-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews found for this company.</p>
            ) : (
              <ul className="space-y-4">
                {reviews.map(review => (
                  <li
                    key={review.id}
                    className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-bold">{review.title}</h3>
                      <p className="text-gray-600">{review.description}</p>
                      <p className="text-yellow-500">Rating: {review.rating}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditReview(review)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewList;
