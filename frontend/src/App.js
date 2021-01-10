import Product from "./components/Product.js";
import data from "./data.js";

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
        <div>
          <div className="row center">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <footer className="row center">All rights reserved</footer>
    </div>
  );
}

export default App;
