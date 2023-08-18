import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/register-style.css';

const GameDetails = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');

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

  const [activeBadges, setActiveBadges] = useState({
    Like: false,
    Dislike: false,
    Played: false,
    WantToPlay: false,
    CurrentlyPlaying: false,
  });

  const handleLike = () => {
    // TODO: Handle like action
  };

  const handleDislike = () => {
    // TODO: Handle dislike action
  };

  const handleAddReview = () => {
    // TODO: Handle adding review
  };

  const handlePlayedList = () => {
    // TODO: Handle adding to played list
  };

  const handleWantList = () => {
    // TODO: Handle adding to want to play list
  };

  const handlePlayingList = () => {
    // TODO: Handle adding to currently playing list
  };


  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  return (
      <div className="container p-0">
        <h2 className="text-uppercase text-center mb-5">{gameDetails.name}</h2>

        <div className="row justify-content-center">

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
                  <li><p><strong>Platform:</strong> {gameDetails.platforms.map(p => p.platform.name).join(', ')}</p></li>
                  <li><p><strong>Release Year:</strong> {new Date(gameDetails.released).getFullYear()}</p></li>
                  <li><p><strong>Genre:</strong> {gameDetails.genres.map(g => g.name).join(', ')}</p></li>
                  <li> <p><strong>Developer:</strong> {gameDetails.developers.map(d => d.name).join(', ')}</p></li>
                  <li> <p><strong>Publisher:</strong> {gameDetails.publishers.map(p => p.name).join(', ')}</p></li>
                </ul>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title mb-1">Write a Review</h5>
              </div>
              <div className="card-body">
            <textarea
                rows="2"
                className="form-control mb-2"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
            />
                <button onClick={handleAddReview} className="btn btn-primary">Submit Review</button>
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
                          <p><strong>{review.username}:</strong></p>
                          <p>{review.text}</p>
                        </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};


export default GameDetails;
