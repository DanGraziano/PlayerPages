import React from 'react';

// TODO make the jumbtron dynamic
// First one is to get users to register or login
// Second one will welcome the user by name and display latest updates from people the follow

// TODO Remove in between the HRs when user is signed in

const Home = () => {
  return (
      <div className="home-page">
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
        <div className="trending-games mt-5 mb-5">
          <h2>Trending Games</h2>
          {/* Map over an array of trending games and display them */}
        </div>
        <div className="popular-reviews">
          <h2>Popular Reviews</h2>
          {/* Map over an array of popular reviews and display them */}
        </div>
      </div>
  );
}

export default Home;
