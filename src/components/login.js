import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import '../styles/register-style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../services/auth-thunk';
import { resetLoginSuccess } from '../reducers/auth-reducer';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loginSuccess = useSelector(state => state.auth.loginSuccess);
  const currentUser = useSelector(state => state.auth.currentUser);
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginThunk({email, password}));
  };

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        navigate('/');
        dispatch(resetLoginSuccess()); // Reset the loginSuccess flag
      });
    }
  }, [dispatch, loginSuccess, navigate]);


    return (
        <div className="mask d-flex align-items-center h-100">
          <div className="container h-100">
            <div
                className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <form className="mb-3" onSubmit={handleSubmit}>
                      <h2 className="text-uppercase text-center mb-5">Sign
                        in</h2>
                      <div className="form-floating mb-3">
                        <input type="email" value={email}
                               className="form-control" id="floatingInput"
                               placeholder="name@example.com"
                               onChange={(event) => setEmail(
                                   event.target.value)}/>
                        <label htmlFor="floatingInput">Email address</label>
                      </div>

                      <div className="form-floating mb-3 show-password">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            className="form-control"
                            id="floatingPassword"
                            placeholder="password"
                            onChange={(event) => setPassword(
                                event.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        <div className="input-group-text"
                             onClick={() => setShowPassword(!showPassword)}>
                          <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}/>
                        </div>
                      </div>
                      {errorMessage && (
                          <p className="text-danger text-center mt-3">{errorMessage}</p>
                      )}
                      <div
                          className="d-flex justify-content-center mx-4 mt-4 mb-3 mb-lg-4">
                        <button type="submit"
                                className="btn btn-primary btn-lg">Sign in
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">Don't have
                        an account? <a href="/register"
                                       className="fw-bold text-body"><u>Register
                          here</u></a></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  };
export default Login;