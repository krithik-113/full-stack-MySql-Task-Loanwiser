import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
const Login = () => {
  
  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h1 className="display-4">Login</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It was utility classes for typography and spacing to space content out
          within the larger container.
        </p>
        <Link to="" className="btn btn-primary btn-lg" role="button">
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default Login;