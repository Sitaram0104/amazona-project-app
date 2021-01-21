import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { listProductCategories } from "./actions/productActions.js";
import { signout } from "./actions/userActions.js";
import AdminRoute from "./components/AdminRoute.js";
import LoadingBox from "./components/LoadingBox.js";
import MessageBox from "./components/MessageBox.js";
import PrivateRoute from "./components/PrivateRoute.js";
import SearchBox from "./components/SearchBox.js";
import SellerRoute from "./components/SellerRoute.js";
import CartScreen from "./screens/CartScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import OrderHistoryScreen from "./screens/OrderHistoryScreen.js";
import OrderListScreen from "./screens/OrderListScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import PaymentMethodScreen from "./screens/PaymentMethodScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import SearchScreen from "./screens/SearchScreen.js";
import SellerScreen from "./screens/SellerScreen.js";
import ShippingAddressScreen from "./screens/ShippingAddressScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import UserEditScreen from "./screens/UserEditScreen.js";
import UserListScreen from "./screens/UserListScreen.js";

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <button
            type="button"
            className="open-sidebar"
            onClick={() => setSidebarIsOpen(true)}
          >
            <i className="fa fa-bars"></i>
          </button>
          <Link to="/" className="brand">
            Amazona
          </Link>
        </div>
        <div>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </div>
        <div>
          <Link to="/cart">
            Cart{" "}
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name}
                {"  "}
                <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          {userInfo && userInfo.isSeller && (
            <div className="dropdown">
              <Link to="#admin">
                Seller{"  "}
                <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/productlist/seller">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">Orders</Link>
                </li>
              </ul>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin{"  "}
                <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className={sidebarIsOpen ? "open" : ""}>
        <ul className="categories">
          <li>
            <strong>Categories</strong>
            <button
              type="button"
              className="close-sidebar"
              onClick={() => setSidebarIsOpen(false)}
            >
              <i className="fa fa-close"></i>
            </button>
          </li>
          {loadingCategories ? (
            <LoadingBox />
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories.map((c) => (
              <li key={c}>
                <Link
                  to={`/search/category/${c}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {c}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
      <main>
        <Route path="/seller/:id" component={SellerScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/product/:id" component={ProductScreen} exact />
        <Route path="/product/:id/edit" component={ProductEditScreen} exact />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/shipping" component={ShippingAddressScreen} />
        <Route path="/payment" component={PaymentMethodScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/orderhistory" component={OrderHistoryScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/search/name/:name?" component={SearchScreen} exact />
        <Route
          path="/search/category/:category"
          component={SearchScreen}
          exact
        />
        <Route
          path="/search/category/:category/name/:name"
          component={SearchScreen}
          exact
        />
        <Route
          path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
          component={SearchScreen}
          exact
        />
        <PrivateRoute path="/profile" component={ProfileScreen} />
        <AdminRoute path="/productlist" component={ProductListScreen} exact />
        <AdminRoute path="/orderlist" component={OrderListScreen} exact />
        <AdminRoute path="/userlist" component={UserListScreen} />
        <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
        <SellerRoute path="/productlist/seller" component={ProductListScreen} />
        <SellerRoute path="/orderlist/seller" component={OrderListScreen} />
        <Route path="/" component={HomeScreen} exact />
      </main>
      <footer className="row center">All rights reserved</footer>
    </div>
  );
}

export default App;
