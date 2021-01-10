import { Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a href="/" className="brand">
            Amazona
          </a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signin">Sign In</a>
        </div>
      </header>
      <main>
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">All rights reserved</footer>
    </div>
  );
}

export default App;
