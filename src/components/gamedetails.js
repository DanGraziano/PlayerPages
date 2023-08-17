import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        // my API key = 61f36cc9713248d1b63cf88756fdbacd
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`);

        const data = await response.json();
        setGameDetails(data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleLike = () => {
    // TODO: Handle like action
  };

  const handleDislike = () => {
    // TODO: Handle dislike action
  };

  const handleAddReview = () => {
    // TODO: Handle adding a review
  };

  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  return (
      <div className="game-details">
        <h1>{gameDetails.name}</h1>
        <img src={gameDetails.background_image} alt={gameDetails.name} />
        <p>Platform: {gameDetails.platforms.map(p => p.platform.name).join(', ')}</p>
        <p>Release Year: {new Date(gameDetails.released).getFullYear()}</p>
        <p>Genre: {gameDetails.genres.map(g => g.name).join(', ')}</p>
        <p>Developer: {gameDetails.developers.map(d => d.name).join(', ')}</p>
        <p>Publisher: {gameDetails.publishers.map(p => p.name).join(', ')}</p>
        <button onClick={handleLike}>Like</button>
        <button onClick={handleDislike}>Dislike</button>
        <button onClick={handleAddReview}>Add Review</button>

        <div className="review-form">
          <h2>Write a Review</h2>
          <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
          />
          <button onClick={handleAddReview}>Submit Review</button>
        </div>

        <h2>Reviews</h2>
        <div className="reviews">
          {reviews.map((review, index) => (
              <div key={index} className="review">
                <p>{review.username}:</p>
                <p>{review.text}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

export default GameDetails;
