import React from "react";

import { Route, Routes, Link } from "react-router-dom";
import Login from "./view/Login";
import Register from "./view/Register";
import Home from "./components/Home";
const App = () => {
  return (
    <>
      <nav>
        <h4>Image Uploader</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
