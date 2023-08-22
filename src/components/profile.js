import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const Profile = () => {
  const defaultFirstName = "";
  const defaultLastName = "";
  const defaultBirthday = "";

  const { username } = useParams(); // Get the username parameter from the URL
  const [userData, setUserData] = useState({
    lists: {
      currentlyPlaying: [],
      wantToPlay: [],
      played: [],
      likeList: [],
      dislikeList: []
    },
    numFollowers: 0,
    numFollowing: 0,
    firstName: defaultFirstName,
    lastName: defaultLastName,
    birthday: defaultBirthday
  });

  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const SERVER_API_URL = "http://localhost:4000/api" // TODO fix process.env.REACT_APP_SERVER_URL;
  const USERS_URL = `${SERVER_API_URL}/users`;
  const userId = currentUser?._id;
  const isOwnProfile = currentUser?._id === userData._id;


  const [followData, setFollowData] = useState({
    followers: [],
    following: []
  });

  console.log("Current User:", currentUser);
  console.log("User ID:", userId);
  console.log("Username:", username);
  console.log("Is Logged In:", isLoggedIn);
  console.log("User Data:", userData);
  console.log("Follow Data:", followData)
  console.log("Followers:", followData.followers.length)
  console.log("Following:", followData.following.length)

  useEffect(() => {
    const getUserData = async () => {
      try {
        let apiUrl;
        if (username) {
          apiUrl = `${USERS_URL}/username/${username}`;
        } else {
          apiUrl = `${USERS_URL}/${userId}`;
        }
        const response = await axios.get(apiUrl);

        console.log("Fetched User Data:", response.data);

        // Set the fetched data to the userData state
        setUserData(prevUserData => ({ ...prevUserData, ...response.data }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [currentUser, username]);

  const handleFollow = async () => {
    try {
      await axios.post(`${USERS_URL}/${userId}/follow`, { followerId: currentUser._id });
      // Update the userData state to reflect the updated follower count
      setUserData(prevUserData => ({
        ...prevUserData,
        numFollowers: prevUserData.numFollowers + 1
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`${USERS_URL}/${userId}/unfollow`, { followerId: currentUser._id });
      // Update the userData state to reflect the updated follower count
      setUserData(prevUserData => ({
        ...prevUserData,
        numFollowers: prevUserData.numFollowers - 1
      }));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  let formattedBirthday;
  if (userData.birthday !== "") {
    // Change birthday format from yyyy-mm-dd to mm-dd-yyyy
    formattedBirthday = new Date(userData.birthday).toLocaleDateString("en-US");
  } else {
    formattedBirthday = "";
  }

  console.log("Followers:", userData.numFollowers)
  console.log("Following:", userData.numFollowing)


  return (
      <div className="container py-4 minHeightContainer">

        <div className="row">

          <div className="col-lg-4">

            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                    src="/defaultPhoto.png"
                    width="150"
                    alt="avatar"
                    className="rounded-circle img-fluid"/>
                <h4 className="my-3">{userData.username}'s Profile</h4>
                {/*
                <div className="d-flex justify-content-center mb-2">
                  {isLoggedIn && (//&& currentUser._id !== userId && (
                      (() => {
                        console.log('isLoggedIn:', isLoggedIn);
                        console.log('currentUser._id !== userId:', currentUser._id !== userId);
                        console.log('followData:', followData);
                        const isFollowing = followData.following.some((user) => user.userId === userId);
                        console.log('isFollowing:', isFollowing);
                        return isFollowing ? (
                            <button onClick={handleUnfollow} className="btn btn-primary">Unfollow</button>

                      ) : (
                            <button onClick={handleFollow} className="btn btn-primary">Follow</button>
                        );
                      })()
                  )}
                </div>*/}
              </div>
            </div>
            {isOwnProfile && (
            <div className="card mt-4 mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <div className="card-header">
                    <h5 className="card-title mt-1">Private info</h5>
                  </div>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0"><span className="fw-bold">Name: </span>{userData.firstName + " " + userData.lastName}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0"><span className="fw-bold">Birthday: </span> {formattedBirthday}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0"><span className="fw-bold">Email: </span>{userData.email}</p>
                  </li>
                </ul>
              </div>
            </div>
            )}

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
                  {/*
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0 "><span className="fw-bold">Followers: </span>{userData.numFollowers}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0"><span className="fw-bold">Following: </span>{userData.numFollowing}</p>
                  </li>
                             */}
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0"><span className="fw-bold">Reviews: </span> {userData.numReviews}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0"><span className="fw-bold">Likes: </span> {userData.numLikes}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0"><span className="fw-bold">Dislikes: </span> {userData.numDislikes}</p>
                  </li>
                </ul>
              </div>
            </div>

          </div>


          {userData ? (
              <>

          <div className="col-lg-8">

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Currently Playing</h3>
              </div>
              <div className="card-body p-4">
                <ul>
                  {userData?.lists?.currentlyPlaying?.length > 0 ? (
                      userData.lists.currentlyPlaying.map((game, index) => (
                          <li key={index}>
                            <Link to={`/game/${game.gameId}`}>{game.gameName}</Link>
                          </li>
                      ))
                  ) : (
                      <p>It looks like {userData?.username} is too busy with real-life and isn't currently playing any games.</p>
                  )}
                </ul>
              </div>
            </div>


            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Want to Play</h3>
              </div>
              <div className="card-body p-4">
                <ul>
                  {userData?.lists?.wantToPlay?.length > 0 ? (
                      userData.lists.wantToPlay.map((game, index) => (
                          <li key={index}>
                            <Link to={`/game/${game.gameId}`}>{game.gameName}</Link>
                          </li>
                      ))
                  ) : (
                      <p>{userData.username} has no interest in playing any games in the future.</p>
                  )}
                </ul>
              </div>
            </div>


            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Played</h3>
              </div>
              <div className="card-body p-4">
                <ul>
                  {userData?.lists?.played?.length > 0 ? (
                      userData.lists.played.map((game, index) => (
                          <li key={index}>
                            <Link to={`/game/${game.gameId}`}>{game.gameName}</Link>
                          </li>
                      ))
                  ) : (
                      <p>It looks like {userData.username} hasn't played any games just yet.</p>
                  )}
                </ul>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Liked Games</h3>
              </div>
              <div className="card-body p-4">
                <ul>
                  {userData?.lists?.likeList?.length > 0 ? (
                      userData.lists.likeList.map((game, index) => (
                          <li key={index}>
                            <Link to={`/game/${game.gameId}`}>{game.gameName}</Link>
                          </li>
                      ))
                  ) : (
                      <p>{userData.username} has high standards and doesn't like any games.</p>
                  )}
                </ul>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Disliked Games</h3>
              </div>
              <div className="card-body p-4">
                <ul>
                  {userData?.lists?.dislikeList?.length > 0 ? (
                      userData.lists.dislikeList.map((game, index) => (
                          <li key={index}>
                            <Link to={`/game/${game.gameId}`}>{game.gameName}</Link>
                          </li>
                      ))
                  ) : (
                      <p>{userData.username} is easy going and apparently doesn't dislike any games.</p>
                  )}
                </ul>
              </div>
            </div>


          </div>
              </>
          ) : (
              <p>Loading...</p>
          )}
        </div>
      </div>
  );
};

export default Profile;