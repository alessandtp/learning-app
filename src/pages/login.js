import React, { useContext, useState } from 'react';
import { logInWithEmailAndPassword } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const { contextState } = useContext(GlobalContext);
  const { setIsLoggedIn } = contextState;
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    let { email, password } = input;
    if (email === '' || password === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Email atau password salah',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
    } else {
      logInWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
      navigate('/');
    }
  };
  return (
    <div className="login d-flex justify-content-center">

      <form onSubmit={handleLogin}>
        <h2 className='text-center'>Login</h2>
        <div className='form-group'>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            name="email"
            onChange={handleChange}
            value={input.email}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            name="password"
            onChange={handleChange}
            value={input.password}
            type="password"
            placeholder="Password"
          />
          <p className="float-start mt-3">
            <Link to="/register">Register</Link>
          </p>
          <button
            className="btn btn-success rounded-pill float-end mt-3"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

  );
};

export default Login;
