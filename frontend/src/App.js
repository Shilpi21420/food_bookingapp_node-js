// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";
import { CartProvider } from "./components/ContextReducer";

import Home from "./screens/Home";
import Login from "./screens/Login";
import MyOrder from "./screens/MyOrder";
import Signup from "./screens/Signup";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/creatuser" element={<Signup />}></Route>
          <Route path='/myorder' element={<MyOrder />}></Route>
      
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
