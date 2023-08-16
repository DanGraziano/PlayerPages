import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/register-style.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('gamer');
  const [showPassword, setShowPassword] = useState(false); // Add this line

  const handleRegister = () => {
    // TODO Handle the registration process
    // TODO Send request to backend
  }

  return (
      <div className="mask d-flex align-items-center h-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <form className="mb-3" onSubmit={handleRegister}>
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <div className="form-floating mb-3">
                      <input type="username" value={username} className="form-control" id="floatingInput" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                      <label htmlFor="floatingInput">Username</label>
                    </div>
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

                    <div className="form-floating mb-4">
                      <select id="accountType" className="form-control form-control-lg" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                        <option value="gamer">Gamer</option>
                        <option value="streamer">Streamer</option>
                        <option value="moderator" disabled>Moderator</option>
                      </select>
                      <label htmlFor="accountType">Account Type</label>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" className="btn btn-primary btn-lg">Register</button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login" className="fw-bold text-body"><u>Login here</u></a></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Register;
