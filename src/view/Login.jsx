import React, { useContext, useState } from "react";
import { ImageUploaderDatas } from "../components/context API/DocumentsContext";
import axios from "axios";
const Login = () => {
  
  const { errorMsg,setForm, setErrMsg,form,navigate, handleInputChange,setToken } =
    useContext(ImageUploaderDatas);
  const formData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', form)
      if (!data.success) {
      return setErrMsg(data.message)
      }
      setForm({name:"",email:"",password:"",passwordConfirm:""})
      setErrMsg("")
      setToken(data.token)
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h1 className="display-4">Login</h1>
        <form onSubmit={formData}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login User
          </button>
        </form>
      </div>
      {errorMsg && (
        <h4
          className={`alert ${
            errorMsg === "Login Successfully" ? "alert-success" : "alert-danger"
          } mt-4`}
        >
          {errorMsg}
        </h4>
      )}
    </div>
  );
};

export default Login;