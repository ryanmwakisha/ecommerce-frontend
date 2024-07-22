import React, { useState } from 'react';
import api from '../api';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', form);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product Description" required></textarea>
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Product Price" required />
        <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Product Category" required />
        <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Product Image URL" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
