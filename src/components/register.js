import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/register-style.css';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('gamer');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // TODO figure out why .env file isn't working
  const SERVER_API_URL = "http://localhost:4000/api"
  console.log(SERVER_API_URL);
  const USERS_URL = `${SERVER_API_URL}/users`;

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const user = {
      email: email,
      username: username,
      password: password,
      accountType: accountType
    };

    try {
      const response = await axios.post(`${USERS_URL}/register`, user);

      if (response.status === 200) {
        console.log('User registered successfully', response.data);
        setSuccessMessage('Registered Successfully! Please login to continue.');
        // Redirect user to login page after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        console.log('Error registering user', response.data);
        setErrorMessage('Registration failed. Please try again.');
      }
    }
    catch (error) {
      console.error('Error registering user', error);
      if (error.response && error.response.data && typeof error.response.data.message === 'string') {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  }

  return (
      <div className="mask d-flex align-items-center h-100">
        <div className="container h-100">
          <div
              className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <form className="mb-3" onSubmit={handleRegister}>
                    <h2 className="text-uppercase text-center mb-5">Create an
                      account</h2>
                    <div className="form-floating mb-3">
                      <input type="username" value={username}
                             className="form-control" id="floatingInput"
                             placeholder="Username"
                             onChange={(event) => setUsername(event.target.value)}/>
                      <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="email" value={email} className="form-control"
                             id="floatingInput" placeholder="name@example.com"
                             onChange={(event) => setEmail(event.target.value)}/>
                      <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating mb-3 show-password">
                      <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          className="form-control"
                          id="floatingPassword"
                          placeholder="password"
                          onChange={(event) => setPassword(event.target.value)}
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      <div className="input-group-text"
                           onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}/>
                      </div>
                    </div>

                    <div className="form-floating mb-4">
                      <select id="accountType"
                              className="form-control form-control-lg"
                              value={accountType}
                              onChange={(event) => setAccountType(event.target.value)}>
                        <option value="gamer">Gamer</option>
                        <option value="streamer">Streamer</option>
                        <option value="moderator" disabled>Moderator</option>
                      </select>
                      <label htmlFor="accountType">Account Type</label>
                    </div>
                    <div
                        className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                          type="submit"
                          className="btn btn-primary btn-lg">Register
                      </button>
                    </div>
                    {errorMessage && (
                        <p className="text-danger text-center">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-success text-center">{successMessage}</p>
                    )}
                    <p className="text-center text-muted mt-5 mb-0">Have already
                      an account? <a href="/login"
                                     className="fw-bold text-body"><u>Login
                        here</u></a></p>
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
