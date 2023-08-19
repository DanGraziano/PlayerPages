import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/register-style.css';
import { useSelector } from 'react-redux';

// TODO maybe add a top pick button for streamers to add to their top picks list

const GameDetails = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const userId = currentUser?._id;
  const username = currentUser?.username;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Use the useSelector hook to check if the user is logged in

  const gameId = id; // From the useParams hook
  const SERVER_API_URL = "http://localhost:4000/api" // TODO fix process.env.REACT_APP_SERVER_URL;
  const GAMES_URL = `${SERVER_API_URL}/games`;
  const REVIEWS_URL = `${SERVER_API_URL}/reviews`;
  const gameName = gameDetails?.name; // Get the game name from the gameDetails state

  // Default values for game details
  const platform = gameDetails?.platform || 'Unavailable';
  const releaseYear = gameDetails?.releaseYear || 'Unavailable';
  const genre = gameDetails?.genre || 'Unavailable';
  const developer = gameDetails?.developer || 'Unavailable';
  const publisher = gameDetails?.publisher || 'Unavailable';



  // TODO Debug logs remove for production
  console.log('User ID:', userId); // Log user ID
  console.log('Username :', username);
  console.log('Game ID:', gameId); // Log game ID
  console.log('Game Name:', gameName); // Log game name
  const reduxState = useSelector((state) => state);
  console.log('Redux state:', reduxState);
  console.log('Current user:', currentUser);



  useEffect(() => {
    // Get the game details from the API
    const fetchGameDetails = async () => {
      try {
        const API_KEY = "61f36cc9713248d1b63cf88756fdbacd"; //process.env.REACT_APP_RAWG_API_KEY;
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const data = await response.json();
        setGameDetails(data);
      }
      catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [id]);

  useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${REVIEWS_URL}/game/${gameId}`);
      const data = await response.json();
      setReviews(data.reviews);

      // Check whether the user has already submitted a review
      const userReview = data.reviews.find((review) => review.userId === userId);
      if (userReview != null) {
        setReviewSubmitted(true);
      } else {
        setReviewSubmitted(false);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  fetchReviews();
}, [gameId, userId]);

  const [activeBadges, setActiveBadges] = useState({
    Like: false,
    Dislike: false,
    Played: false,
    WantToPlay: false,
    CurrentlyPlaying: false,
  });


  const handleLike = async () => {
    try {
      const action = activeBadges.Like ? 'removeLike' : 'like'; // Determine whether to like or unlike the game

      const response = await fetch(`${GAMES_URL}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, gameId, gameName })
      });

      const data = await response.json();
      if (data.success) {
        setActiveBadges((prev) => ({ ...prev, Like: !prev.Like })); // Toggle the Like badge state
      } else {
        console.error('Error toggling the like badge:', data.message);
      }
    } catch (error) {
      console.error('Error toggling the like badge:', error);
    }
  };

  const handleDislike = async () => {
    const action = activeBadges.Dislike ? 'removeDislike' : 'dislike';

    try {
      const response = await fetch(`${GAMES_URL}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, gameId, gameName})
      });

      const data = await response.json();
      if (data.success) {
        setActiveBadges((prev) => ({ ...prev, Dislike: !prev.Dislike })); // toggle badge state
      } else {
        console.error('Error toggling the dislike badge:', data.message);
      }
    } catch (error) {
      console.error('Error toggling the dislike badge:', error);
    }
  };

  const handleAddReview = async () => {
    try {
      const response = await fetch(`${REVIEWS_URL}/addReview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, gameId, reviewText })
      });

      const data = await response.json();
      if (data.success) {
        setReviews([...reviews, { username: username, content: reviewText, createdOn: new Date() }]);
        setReviewText('');
        setReviewSubmitted(true);

      } else {
        console.error('Error adding review:', data.message);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleRemoveReview = async () => {
    // TODO: Handle removing review
    try {
      const response = await fetch(`${REVIEWS_URL}/removeReview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, gameId })
      });

      const data = await response.json();
      if (data.success) {
        setReviewSubmitted(false);
        setReviews(reviews.filter((review) => review.userId !== userId));
      } else {
        console.error('Error removing review:', data.message);
      }
    } catch (error) {
      console.error('Error removing review:', error);
    }
  };

  const handlePlayedList = async () => {
    const action = activeBadges.Played ? 'removeFromPlayedList' : 'addToPlayedList';

    try {
      const response = await fetch(`${GAMES_URL}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, gameId, gameName })
      });

      const data = await response.json();
      if (data.success) {
        setActiveBadges((prev) => ({ ...prev, Played: !prev.Played })); // toggle badge state
      } else {
        console.error('Error adding to played list:', data.message);
      }
    } catch (error) {
      console.error('Error adding to played list:', error);
    }
  };

  const handleWantList = async () => {
    const action = activeBadges.WantToPlay ? 'removeFromWantList' : 'addToWantList';

    try {
      const response = await fetch(`${GAMES_URL}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, gameId, gameName})
      });

      const data = await response.json();
      if (data.success) {
        setActiveBadges((prev) => ({ ...prev, WantToPlay: !prev.WantToPlay })); // toggle badge state
      } else {
        console.error('Error adding to want to play list:', data.message);
      }
    } catch (error) {
      console.error('Error adding to want to play list:', error);
    }
  };

  const handlePlayingList = async () => {
    const action = activeBadges.CurrentlyPlaying ? 'removeFromPlayingList' : 'addToPlayingList';

    try {
      const response = await fetch(`${GAMES_URL}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, gameId, gameName })
      });

      const data = await response.json();
      if (data.success) {
        setActiveBadges((prev) => ({ ...prev, CurrentlyPlaying: !prev.CurrentlyPlaying })); // toggle badge state
      } else {
        console.error('Error adding to currently playing list:', data.message);
      }
    } catch (error) {
      console.error('Error adding to currently playing list:', error);
    }
  };

  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  return (
      <div className="container p-0">
        <h2 className="text-uppercase text-center mb-5">{gameDetails.name}</h2>
        <div className="row justify-content-center">

          {isLoggedIn ? (
              <>
                {/* This section will only be visible to logged-in users */}
                <div className="mb-4 text-center">
                  <span className={`badge mx-2 cursor-pointer ${activeBadges.Like ? 'active-badge' : ''}`} onClick={handleLike}>Like</span>
                  <span className={`badge mx-2 cursor-pointer ${activeBadges.Dislike ? 'active-badge' : ''}`} onClick={handleDislike}>Dislike</span>
                  <span className={`badge mx-2 cursor-pointer ${activeBadges.Played ? 'active-badge' : ''}`} onClick={handlePlayedList}>Played</span>
                  <span className={`badge mx-2 cursor-pointer ${activeBadges.WantToPlay ? 'active-badge' : ''}`} onClick={handleWantList}>Want to Play</span>
                  <span className={`badge mx-2 cursor-pointer ${activeBadges.CurrentlyPlaying ? 'active-badge' : ''}`} onClick={handlePlayingList}>Currently Playing</span>
                </div>

                <div className="col-lg-8">
                  <div className="card mb-3">
                    <img src={gameDetails.background_image} alt={gameDetails.name} className="card-img-top" />
                  </div>

                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title mt-1">Details </h5>
                    </div>
                    <div className="card-body">
                      <ul>
                        <li><p><span className="fw-bold">Platform:</span> {(gameDetails?.platforms && gameDetails.platforms.length > 0) ? gameDetails.platforms.map(p => p.platform.name).join(', ') : platform}</p></li>
                        <li><p><span className="fw-bold">Release Year:</span> {gameDetails?.released ? new Date(gameDetails.released).getFullYear() : releaseYear}</p></li>
                        <li><p><span className="fw-bold">Genre:</span> {(gameDetails?.genres && gameDetails.genres.length > 0) ? gameDetails.genres.map(g => g.name).join(', ') : genre}</p></li>
                        <li><p><span className="fw-bold">Developer:</span> {(gameDetails?.developers && gameDetails.developers.length > 0) ? gameDetails.developers.map(d => d.name).join(', ') : developer}</p></li>
                        <li><p><span className="fw-bold">Publisher:</span> {(gameDetails?.publishers && gameDetails.publishers.length > 0) ? gameDetails.publishers.map(p => p.name).join(', ') : publisher}</p></li>
                      </ul>
                    </div>

                  </div>

                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title mb-1">Write a Review</h5>
                    </div>
                    <div className="card-body">
                      {reviewSubmitted ? (
                          <button onClick={handleRemoveReview} className="btn btn-primary">Remove Review</button>
                      ) : (
                          <>
                      <textarea
                          rows="2"
                          className="form-control mb-2"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Write your review here..."
                      />
                          <button onClick={handleAddReview} className="btn btn-primary">Submit Review</button>
                          </>
                      )}
                      </div>
                      </div>

                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Reviews</h5>
                    </div>
                    <div className="card-body">
                      {reviews.length === 0 ? (
                          <p>No reviews yet.</p>
                      ) : (
                          reviews.map((review, index) => (
                              <div key={index} className="review mb-3">
                                <div className="d-flex justify-content-between">
                                  <span className="fw-bold mb-1">{review.username}:</span>
                                  <span className="fst-italic">Reviewed on: {new Date(review.createdOn).toLocaleDateString()}</span>
                                </div>
                                <p>{review.content}</p>
                                <hr className="my-3"/>
                              </div>
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </>

          ) : (
              <div className="col-lg-8 text-center">
                <p>Want to see more information, leave a review, or add a game to a list?</p>
                <p>

                  <a href="/register" className="fw-bold text-body">Register</a> or <a href="/login" className="fw-bold text-body">Login</a> to access these features and more!
                </p>
              </div>
          )}
        </div>
      </div>
  );
};


export default GameDetails;
