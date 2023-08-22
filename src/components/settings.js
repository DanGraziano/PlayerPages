import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import '../styles/stylesheet.css';
import {useNavigate} from "react-router-dom";


const Settings = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [bio, setBio] = useState("");
  const SERVER_API_URL = "http://localhost:4000/api" // TODO fix process.env.REACT_APP_SERVER_URL;
  const USERS_URL = `${SERVER_API_URL}/users`;
  const [profilePicture, setProfilePicture] = useState(null);
  const userId = currentUser._id;
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');
  const [isValid, setValid] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
  });

  useEffect(() => {
    // Get username and email, which can't be changed
    const fetchUserData = async () => {
      if (currentUser) {
        const data = {
          email: currentUser?.email,
          username: currentUser?.username,
        };
        setUserData(data);
      }
    };

    fetchUserData();
  }, [isLoggedIn, currentUser]);

  const validateInputs = () => {
    const bio = document.getElementById("inputBio").value;
    const firstName = document.getElementById("inputFirstName").value;
    const lastName = document.getElementById("inputLastName").value;
    const birthday = document.getElementById("inputBirthday").value;

    return bio && firstName && lastName && birthday; // returns true if all fields are filled, false otherwise
  };

    const handleSaveChanges = async () => {
      const bio = document.getElementById("inputBio").value;
      const firstName = document.getElementById("inputFirstName").value;
      const lastName = document.getElementById("inputLastName").value;
      const birthday = document.getElementById("inputBirthday").value;

      if (!bio || !firstName || !lastName || !birthday) {
        setValid(true);
        return;
      } else {
        setValid(false);
      }

    try {
      const updateData = {
        bio: bio,
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
      }

      const response = await axios.put(`${USERS_URL}/${userId}`, updateData);

      if (response.status === 200) {
        console.log("User updated successfully");
        setUpdateSuccess(true);
      }
    } catch (err) {
      console.error("Error updating user:", err.message);
      setUpdateSuccess(false);
    }
  };

  useEffect(() => {
    if (updateSuccess === true) {
      setUpdateMessage('Data update successful!');
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    } else if (updateSuccess === false) {
      setUpdateMessage('Data update failed. Please try again.');
    } else {
      setUpdateMessage('');
    }
  }, [updateSuccess, navigate]);

  return (
      <div className="container p-0 minHeightContainer">
        <h2 className="text-uppercase text-center mb-5">Settings</h2>
        <div className="d-flex justify-content-center">
          <div className="col-md-8 col-xl-8">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="account" role="tabpanel">
                <form>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Public info</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                          <div className="form-group col-md-11 mt-2">
                            <label htmlFor="inputUsername">Username</label>
                            <input disabled type="text" className="form-control mt-2 mb-3" id="inputUsername" value={userData.username} placeholder="Username" />
                          </div>
                          <div className="form-group col-md-11 mt-2">
                            <label htmlFor="inputAbout">About</label>
                            <textarea
                                rows="2"
                                className="form-control mt-2 mb-3"
                                id="inputBio"
                                placeholder="Write something about yourself"/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <img alt="Profile Picture" src="/defaultPhoto.png" className="rounded-circle img-responsive mt-2" width="128" height="128"  />
                            <div className="mt-2">
                              <button type="submit"
                                      className="btn btn-outline-primary ms-1">Choose Image
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header">
                    <h5 className="card-title mt-0">Private info</h5>
                  </div>
                  <div className="card-body">
                      <div className="form-row">
                        <div className="form-group col-md-8 mt-2">
                          <label htmlFor="inputFirstName">First name</label>
                          <input type="text" className="form-control mt-2 mb-3" id="inputFirstName" placeholder="First name"/>
                        </div>
                        <div className="form-group col-md-8 mt-2">
                          <label htmlFor="inputLastName">Last name</label>
                          <input type="text" className="form-control mt-2 mb-3" id="inputLastName" placeholder="Last name" />
                        </div>
                      </div>
                      <div className="form-group col-md-8 mt-2">
                        <label htmlFor="inputBirthday">Birthday</label>
                        <input
                            type="date"
                            className="form-control mt-2 mb-3"
                            id="inputBirthday"
                            placeholder="Birthday"/>
                      </div>
                      <div className="form-group col-md-8 mt-2">
                        <label htmlFor="inputEmail">Email</label>
                        <input disabled type="email" className="form-control mt-2 mb-3" id="inputEmail" value={userData.email} placeholder="Email" />
                      </div>
                    <div className="d-flex align-items-center mt-4">
                      <button onClick={handleSaveChanges} type="button" className="btn btn-primary">Save changes</button>
                      <span className={`ps-3 ${updateSuccess ? 'success' : 'failure'}`}>{updateMessage}
                        {isValid && <p className="text-danger mt-2">All fields are required.</p>}
                      </span>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Settings;
