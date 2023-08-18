import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  useEffect(() => {
    // Fetch the user data from your backend or state management library
    const fetchUserData = async () => {
      // Replace with actual data fetching logic
      const data = {
        username: "Gamer123",
        currentlyPlaying: ["Game A", "Game B"],
        wantToPlay: ["Game C", "Game D"],
        played: ["Game E", "Game F"],
        followers: 100,
        following: 50,
        reviews: 20,
        birthday: "01/01/1989",
        firstname: "John",
        lastname: "Doe",
        email: "Lorem.ipsum@gmail.com",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
            + "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation "
            + "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit "
            + "in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, "
            + "sunt in culpa qui officia deserunt mollit anim id est laborum."
      };

      setUserData(data);
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  // TODO users who are not logged in can't follow other users
  // TODO only the specific logged in user can see personal details
  // TODO The choose image is only for the specific logged in user on their profile page
  // TODO add follower list of users
  // TODO clicking on the game names will take you to the game details page where you can see reviews and add to one of the three lists

  // TODO added liked list of games based on one-click button in details page
  // TODO add disliked games list based on one-click button in details page

  return (
      <div className="container py-4 border">

        <div className="row">

          <div className="col-lg-4">

            <div className="card mb-4">
              <p> Inside profile</p>
              <div className="card-body text-center">
                <img
                    src="https://pbs.twimg.com/profile_images/1044707640163618816/yCgHHS2v_200x200.jpg"
                    alt="avatar"
                    className="rounded-circle img-fluid"/>
                <h4 className="my-3">{currentUser.username}'s Profile</h4>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">Follow
                  </button>
                </div>
              </div>
            </div>

            <div className="card mt-4 mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <div className="card-header">
                    <h5 className="card-title mt-1">Private info</h5>
                  </div>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0 ">Name: {userData.firstname + " " + userData.lastname}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">Birthday {userData.birthday}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">Email address:: {userData.email}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card mt-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <div className="card-header">
                    <h5 className="card-title mt-1">About</h5>
                  </div>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0 ">{userData.bio}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card mb-4 mt-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <div className="card-header">
                    <h5 className="card-title mt-1">Stats</h5>
                  </div>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0 ">Followers: {userData.followers}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">Following: {userData.following}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">Reviews: {userData.reviews}</p>
                  </li>
                </ul>
              </div>
            </div>

          </div>



          <div className="col-lg-8">

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Currently Playing</h3>
              </div>
              <div className="card-body p-4">
                <p>Add game images and names here</p>
                <ul>
                  {userData.currentlyPlaying.map((game, index) => (
                      <li key={index}>{game}</li>
                  ))}
                </ul>
              </div>
            </div>


            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Want to Play</h3>
              </div>
              <div className="card-body p-4">
                <p>Add game images and names here</p>
                <ul>
                  {userData.wantToPlay.map((game, index) => (
                      <li key={index}>{game}</li>
                  ))}
                </ul>
              </div>
            </div>


            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Played</h3>
              </div>
              <div className="card-body p-4">
                <p>Add game images and names here</p>
                <ul>
                  {userData.played.map((game, index) => (
                      <li key={index}>{game}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;