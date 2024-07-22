import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../api';

const EditProduct = () => {
  const { id } = useParams();
  const history = useHistory();
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, form);
      alert('Product updated successfully!');
      history.push('/trader-dashboard/manage-products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product Description" required></textarea>
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Product Price" required />
        <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Product Category" required />
        <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Product Image URL" required />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
