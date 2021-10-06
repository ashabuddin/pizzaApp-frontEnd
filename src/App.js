
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import { CartContext } from "./pages/CartContext";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import SingleProduct from "./pages/SingleProduct";
import { getCart, storeCart } from './pages/helper';


function App() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    //   const cart =  window.localStorage.getItem('cart');
    getCart().then(cart => {
      setCart(JSON.parse(cart));
    });
  }, [])

  useEffect(() => {
    storeCart(JSON.stringify(cart));
  }, [cart])


  return (
    <Router>
      <CartContext.Provider value={{ cart, setCart }}>
        <Navigation />
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/products" exact component={ProductsPage}></Route>
          <Route path="/products/:id"><SingleProduct /> </Route>
          <Route path="/cart" exact component={Cart}></Route>

        </Switch>

      </CartContext.Provider>

    </Router>
  );
}

export default App;
