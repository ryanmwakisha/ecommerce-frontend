import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ search, category }));
  };

  const handleClearSearch = () => {
    setSearch('');
    setCategory('');
    dispatch(fetchProducts());
  };

  return (
    <div className="container">
      <header>
        <h1>Welcome to Our E-commerce Store</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {user && user.role === 'trader' && (
          <Link to="/trader-dashboard">Trader Dashboard</Link>
        )}
      </nav>
      <main>
        <h2>Our Products</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
          <button type="submit">Search</button>
          <button type="button" onClick={handleClearSearch}>Clear Search</button>
        </form>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="card">
                {product.image && <img src={product.image} alt={product.name} />}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">${product.price.toFixed(2)}</p>
                <Link to={`/products/${product._id}`} className="btn">View Details</Link>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} E-commerce Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;