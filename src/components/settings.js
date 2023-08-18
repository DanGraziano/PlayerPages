import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Settings = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    birthday: '',
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Fetch the user data from the backend
    const fetchUserData = async () => {
      // Replace with actual data fetching logic
      const data = {
        email: currentUser.email,
        phone: currentUser.phone,
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        username: currentUser.username,
        birthday: currentUser.birthday,
      };
      setUserData(data);
    };

    fetchUserData();
  }, [isLoggedIn, currentUser]);

  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the updated data and profile image to your backend API

    // Send user to profile page after saving
  };

  return (
      <div className="container p-0">
        <h2 className="text-uppercase text-center mb-5">Settings</h2>
        <div className="d-flex justify-content-center">
          <div className="col-md-8 col-xl-8">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="account" role="tabpanel">

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Public info</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="form-group col-md-11 mt-2">
                            <label htmlFor="inputUsername">Username</label>
                            <input disabled type="text" className="form-control mt-2 mb-3" id="inputUsername" value={userData.username} placeholder="Username" />
                          </div>
                          <div className="form-group col-md-11 mt-2">
                            <label htmlFor="inputAbout">About</label>
                            <textarea rows="2" className="form-control mt-2 mb-3" id="inputBio" placeholder="Tell something about yourself"></textarea>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <img alt="Profile Picture" src="/defaultPhoto.png" className="rounded-circle img-responsive mt-2" width="128" height="128"  onChange={handleImageChange}  />
                            <div className="mt-2">
                              <button type="submit"
                                      className="btn btn-outline-primary ms-1">Choose Image
                              </button>
                            </div>
                            <small>For best results, use an image at least 128px by 128px in .jpg format</small>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">Save changes</button>
                    </form>
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header">
                    <h5 className="card-title mt-0">Private info</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-8 mt-2">
                          <label htmlFor="inputFirstName">First name</label>
                          <input type="text" className="form-control mt-2 mb-3" id="inputFirstName" value={userData.firstname} placeholder="First name" onChange={handleInputChange} />
                        </div>
                        <div className="form-group col-md-8 mt-2">
                          <label htmlFor="inputLastName">Last name</label>
                          <input type="text" className="form-control mt-2 mb-3" id="inputLastName" placeholder="Last name" value={userData.lastname} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="form-group col-md-8 mt-2">
                        <label htmlFor="inputBirthday">Birthday</label>
                        <input
                            type="date"
                            className="form-control mt-2 mb-3"
                            id="inputBirthday"
                            placeholder="Birthday"
                            value={userData.birthday}
                            onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group col-md-8 mt-2">
                        <label htmlFor="inputEmail">Email</label>
                        <input disabled type="email" className="form-control mt-2 mb-3" id="inputEmail" value={userData.email} placeholder="Email" />
                      </div>
                      <button type="submit" className="btn btn-primary mt-4">Save changes</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Settings;
