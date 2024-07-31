import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Product {
  name: string;
  price: number;
  description: string;
}

interface WelcomeProps {
  username: string | null;
}

const Welcome: React.FC<WelcomeProps> = ({ username }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!username) {
      navigate('/');
    } else {
      // Fetch products for the user
      axios.get(`http://localhost:3000/products?username=${username}`, { withCredentials: true })
        .then(response => setProducts(response.data.products))
        .catch(error => console.error('Error fetching products', error));
    }
  }, [username, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="container text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-4 mb-4">Welcome, {username}!</h1>
      <div className="row">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <button className="btn btn-primary mt-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Welcome;
