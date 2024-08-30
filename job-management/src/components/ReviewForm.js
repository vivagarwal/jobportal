// ReviewForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ReviewForm = ({ review, onSave, onCancel, companyId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (companyId) {
      axios.get(`/companies/${companyId}`)
        .then(response => setCompany(response.data))
        .catch(error => console.error('Error fetching company:', error));
    }
  }, [companyId]);

  useEffect(() => {
    if (review) {
      setTitle(review.title || '');
      setDescription(review.description || '');
      setRating(review.rating || '');
    }
  }, [review]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      title,
      description,
      rating: Math.floor(parseFloat(rating)) // Ensure rating is an integer
    };
    
    if (review) {
      axios.put(`/companies/${companyId}/reviews/${review.id}`, reviewData)
        .then(() => onSave())
        .catch(error => console.error('Error updating review:', error));
    } else {
      axios.post(`/companies/${companyId}/reviews`, reviewData)
        .then(() => onSave())
        .catch(error => console.error('Error adding review:', error));
    }
  };

  if (!company) return null;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{review ? 'Edit Review' : 'Add Review'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Company</label>
          <input
            type="text"
            value={company.name || ''}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {review ? 'Update Review' : 'Add Review'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  companyId: PropTypes.number.isRequired,
};

export default ReviewForm;
