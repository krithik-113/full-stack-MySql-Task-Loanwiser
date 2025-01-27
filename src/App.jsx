import React, { useContext } from "react";

import { Route, Routes, Link } from "react-router-dom";
import Login from "./view/Login";
import Register from "./view/Register";
import Home from "./components/Home";
import { ImageUploaderDatas } from "./components/context API/DocumentsContext";
const App = () => {
  const { token, logout } = useContext(ImageUploaderDatas);
  return (
    <>
      <nav>
        <h4>Image Uploader</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!token ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li onClick={logout}>
              <Link to="">Logout</Link>
            </li>
          )}
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
