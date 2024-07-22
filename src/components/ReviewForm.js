import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../redux/actions/reviewActions';

const ReviewForm = ({ productId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview({ product: productId, rating, comment }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="0">Select Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment"
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
