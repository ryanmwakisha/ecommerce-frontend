import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import ReviewForm from '../components/ReviewForm';
import { fetchReviews } from '../redux/actions/reviewActions';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
    dispatch(fetchReviews(id));
  }, [id, dispatch]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {product.image && <img src={product.image} alt={product.name} />}
      <ReviewForm productId={id} />
      <div>
        {reviews.map((review) => (
          <div key={review._id}>
            <p>{review.user.username}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
