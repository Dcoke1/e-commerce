import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";
import { useSelector } from "react-redux";
import Scrolltotop from "./components/ScrollToTop";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Scrolltotop />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/products/:categories" element={<ProductList/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>} />
        <Route path="/forgot" element={user ? <Navigate to="/" /> : <Forgot/>} />
        <Route path="/myaccount" element={user ? <MyAccount /> : <Login/>} />
      </Routes>
    </Router>
  );
};

export default App;
