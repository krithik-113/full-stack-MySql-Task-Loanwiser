import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [errorMsg,setErrMsg] = useState('')
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm:"",
  });
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const name = e.target.name 
    const value = e.target.value 
    setForm(prev=>({...prev,[name]:value}))
  }
  const formData = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/auth/register', form)
      if (!data.success) {
       return setErrMsg(data.message)
      }
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
 //   setForm({ name: "", email: "", password: "", passwordConfirm:"" });
  }
  
  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">Register Form</div>
          <div className="card-body">
            <form onSubmit={formData}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

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

              <div className="form-group">
                <label htmlFor="passwordConfirm" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Register User
              </button>
            </form>
          </div>
        </div>
       {errorMsg && <h4 className="alert alert-danger mt-4">{errorMsg}</h4>}
      </div>
    </>
  );
};

export default Register;
