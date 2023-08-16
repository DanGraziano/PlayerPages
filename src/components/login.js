import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import '../styles/register-style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Send a request to the backend to login
  }

  // TODO determine if login should stay email or be username

  return (
      <div className="mask d-flex align-items-center h-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <form className="mb-3" onSubmit={handleLogin}>
                    <h2 className="text-uppercase text-center mb-5">Sign in</h2>
                    <div className="form-floating mb-3">
                      <input type="email" value={email} className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating mb-3 show-password">
                      <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          className="form-control"
                          id="floatingPassword"
                          placeholder="password"
                          onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      <div className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" className="btn btn-primary btn-lg">Sign in</button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">Don't have an account? <a href="/register" className="fw-bold text-body"><u>Register here</u></a></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;