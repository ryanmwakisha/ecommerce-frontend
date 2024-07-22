import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/actions/productActions';

const TraderDashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        productData.append(key, formData[key]);
      }
    }

    try {
      if (editingProduct) {
        await dispatch(updateProduct(editingProduct._id, productData));
      } else {
        await dispatch(addProduct(productData));
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null
    });
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', image: null });
    setEditingProduct(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="trader-dashboard">
      <h1>Trader Dashboard</h1>
      
      <section className="product-form">
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Product Price"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
          />
          <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
          {editingProduct && (
            <button type="button" onClick={resetForm}>Cancel Edit</button>
          )}
        </form>
      </section>

      <section className="product-list">
        <h2>Your Products</h2>
        {products.length === 0 ? (
          <p>No products yet. Start adding some!</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              {product.image && <img src={product.image} alt={product.name} />}
              <div className="product-actions">
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default TraderDashboard;
