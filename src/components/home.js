import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";

const listNames = {
  currentlyPlaying: "Currently Playing",
  wantToPlay: "Want to Play",
  played: "Played",
  likeList: "Like",
  dislikeList: "Dislike"
};

const Home = () => {

  const SERVER_API_URL = "http://localhost:4000/api" // TODO fix process.env.REACT_APP_SERVER_URL;
  const GAMES_URL = `${SERVER_API_URL}/games`;
  const REVIEWS_URL = `${SERVER_API_URL}/reviews`;

  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [streamerPicks, setStreamerPicks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO maybe organize better or call images from API
  useEffect(() => {
    const getStreamerPicks = async () => {
      try {
        const response = await axios.get(`${GAMES_URL}/latestTopPicks`);
        console.log('Streamer picks response:', response.data); // Log the response to inspect the data
        if (response.data.success && Array.isArray(response.data.data)) { // Ensure that response.data.data is an array
          setStreamerPicks(response.data.data);
        } else {
          console.error('Expected an array, but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching streamer picks:', error);
      }
    };

    getStreamerPicks();
  }, [currentUser, isLoggedIn]);


  useEffect(() => {
    const getRecentActivityData = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/recentActivityAllUsers`);
        setRecentActivity(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    getRecentActivityData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
      // If not logged in then show welcome message and register/login buttons
      <div className="home-page">
        {!isLoggedIn && (
            <div className="jumbotron">
              <h1 className="display-4">Welcome to PlayerPages!</h1>
              <p className="lead">A place to discover and discuss new video games.</p>
              <hr className="my-4"/>
              <p>Register for an account to start creating lists and writing reviews.</p>
              <p>Already have account? Login to see your personal feed</p>
              <p className="lead">
                <a className="btn btn-primary btn-lg me-3" href="/register" role="button">Register</a>
                <a className="btn btn-primary btn-lg" href="/login" role="button">Login</a>
              </p>
              <hr className="my-4"/>
            </div>
        )}

        {isLoggedIn && (
            <div className="jumbotron">
              <h1 className="display-4">Welcome back, {currentUser.username}</h1>
              <hr className="my-4"/>
            </div>
        )}

        <div className="card mb-4">
          <div className="card-header">
            <h3 className="card-title m-2">Streamer Picks</h3>
          </div>
          <div className="card-body p-4">
            {streamerPicks.map((reco) => (
                <div key={reco.id}>
                  <p>
                    <Link to={`/game/${reco.gameId}`}>
                      {reco.gameName}
                    </Link>
                    {" - Recommended by "}
                    {reco.username}
                  </p>
                </div>
            ))}
          </div>
        </div>

        {isLoggedIn && (
            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Latest activity</h3>
              </div>
              <div className="card-body p-4">
                <ul>
                  {recentActivity.map((activity, index) => (
                      <li key={index}>
                        <Link to={`/profile/${activity.username}`}>
                          <span className="fw-bold">{activity.username}</span>
                        </Link> added{' '}
                        <Link to={`/game/${activity.gameId}`}>
                          <em>{activity.gameName}</em>
                        </Link> to their <span className="fw-bold">{listNames[activity.listName] || activity.listName}</span> list.
                      </li>
                  ))}
                </ul>
              </div>
            </div>
        )}
      </div>
  );
}

export default Home;
