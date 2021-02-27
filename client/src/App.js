import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { FeaturedProducts, Products } from './IndexPage'
import NavBar from './NavBar'
import ProductPage from './ProductPage'
import CartPage from './CartPage'


function App() {
  return (
    <>
      <Router>
        <section className="mb-5">
          <NavBar></NavBar>
        </section>
        <Switch>
          <Route exact path="/">
            <div className="container-fluid container-width">
              <FeaturedProducts></FeaturedProducts>
            </div>
            <div className="container-fluid container-width">
              <h3 className="mb-4 mt-4" style={{ marginLeft: '8%' }}>Our Products</h3>
              <Products></Products>
            </div>
          </Route>
          <Route path="/product/:id">
            <ProductPage></ProductPage>
          </Route>
          <Route path="/cart">
            <CartPage></CartPage>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
