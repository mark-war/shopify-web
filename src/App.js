import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

//services
import HttpService from './services/http-service';

//components
import Product from './product/product';
import WishList from './wishlist/wishlist';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const http = new HttpService();    

    const loadData = () => {
      http.getProducts().then(data => {
        setProducts(data);
        console.log(data);
      }, err => {
        // Handle any errors here
        console.error(err);
      });
    };

    loadData();
  }, []);

  const productList = () => {
    return products.map((product) => {
      return ( <div className="col-sm-4" key={product._id}>
        <Product product={product} />
      </div> );
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Shopaholic</h2>        
      </header>
      <div className="container-fluid App-main">
        <div className="row">
          <div className='col-sm-9'>
            <div className="row">
              {productList()}
            </div>
          </div>
          <div className='col-sm-3'>
            <WishList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
