import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);

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
      };

      setUserData(data);
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  // TODO users who are not logged in can't follow other users
  // TODO The choose image is only for the specific logged in user on their profile page
  // TODO clicking on the game names will take you to the game details page where you can see reviews and add to one of the three lists

  return (
      <div className="container py-5 border">

        <div className="row">

          <div className="col-lg-4">
            <p> Left side</p>

            <div className="card mb-4">
              <p> Inside profile</p>
              <div className="card-body text-center">
                <img
                    src="https://pbs.twimg.com/profile_images/1044707640163618816/yCgHHS2v_200x200.jpg"
                    alt="avatar"
                    className="rounded-circle img-fluid"/>
                <h4 className="my-3">{userData.username}'s Profile</h4>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">Follow
                  </button>
                  <button type="button"
                          className="btn btn-outline-primary ms-1">Choose Image
                  </button>
                </div>
              </div>
            </div>

            <p> Bottom box </p>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0 ">First name: {userData.followers}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">Birthday {userData.following}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">Email address:: {userData.reviews}</p>
                  </li>
                </ul>
              </div>
            </div>

            <p> Second Bottom box TBD </p>

            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
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

            <p>Right side</p>

            <p>Box 1</p>

            <div className="card mb-4">
              <div className="card-body p-4">
                <h3 className="mb-3">Currently Playing</h3>
                <hr className="my-4"/>
                <p>Add game images and names here</p>
                <ul>
                  {userData.currentlyPlaying.map((game, index) => (
                      <li key={index}>{game}</li>
                  ))}
                </ul>
              </div>
            </div>


            <p>Box 2</p>

            <div className="card mb-4">
              <div className="card-body p-4">
                <h3 className="mb-3">Want to play</h3>
                <hr className="my-4"/>
                <p>Add game images and names here</p>
                <ul>
                  {userData.wantToPlay.map((game, index) => (
                      <li key={index}>{game}</li>
                  ))}
                </ul>
              </div>
            </div>


            <p>Box 3</p>

            <div className="card mb-4">
              <div className="card-body p-4">
                <h3 className="mb-3">Played</h3>
                <hr className="my-4"/>
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