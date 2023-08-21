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
  const RAWG_API_URL = "https://api.rawg.io/api/games";
  const API_KEY = "61f36cc9713248d1b63cf88756fdbacd"; //process.env.REACT_APP_RAWG_API_KEY; // TODO fix env

  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [streamerPicks, setStreamerPicks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStreamerPicks = async () => {
      try {
        const response = await axios.get(`${GAMES_URL}/latestTopPicks`);
        const gameDetails = await Promise.all(response.data.data.map(async (pick) => {
          const detailsResponse = await axios.get(`${RAWG_API_URL}/${pick.gameId}?key=${API_KEY}`);
          return { ...pick, backgroundImage: detailsResponse.data.background_image };
        }));
        setStreamerPicks(gameDetails);
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
        const recentActivityWithImages = await Promise.all(
            response.data.data.map(async (activity) => {
              const gameResponse = await axios.get(
                  `https://api.rawg.io/api/games/${activity.gameId}?key=${API_KEY}`
              );
              activity.backgroundImage = gameResponse.data.background_image;
              return activity;
            })
        );
        setRecentActivity(recentActivityWithImages);
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
            <h3 className="card-title m-2">Top Picks from Streamers</h3>
          </div>
          <div className="card-body p-4">
            <div className="row">
              {streamerPicks.map((reco) => (
                  <div key={reco.id} className="col-12 col-sm-6 col-md-4 mb-4">
                    <div className="card h-100">
                      <img className="card-img-top" src={reco.backgroundImage} alt={reco.gameName} />
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link to={`/game/${reco.gameId}`} className="text-decoration-none">
                            {reco.gameName}
                          </Link>
                        </h5>
                        <span className="card-text">Recommended by </span>
                        <Link to={`/profile/${reco.username}`} className="text-decoration-none">
                          <span className="fw-bold">{reco.username}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>


        {isLoggedIn && (
            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title m-2">Latest activity</h3>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  {recentActivity.map((activity, index) => (
                      <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
                        <div className="card h-100">
                          <img className="card-img-top" src={activity.backgroundImage} alt={activity.gameName}/>
                          <div className="card-body">
                            <h5 className="card-title">
                              <Link to={`/game/${activity.gameId}`} className="text-decoration-none">
                                {activity.gameName}
                              </Link>
                            </h5>
                            <p className="card-text"> Added to{" "}
                              <span className="fw-bold"> {listNames[activity.listName] || activity.listName}</span>{" "}by{" "}
                              <Link to={`/profile/${activity.username}`} className="text-decoration-none">
                                <span className="fw-bold">{activity.username}</span>
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        )}

      </div>
  );
}

export default Home;
