import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";

const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


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
          <div className="card-body p-4">
            <h2 className="mb-3">Trending Games</h2>
            <hr className="my-4"/>
            <p>Add game images and names here</p>

          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body p-4">
            <h2 className="mb-3">Streamer Recos</h2>
            <hr className="my-4"/>
            <p>Add game images and names here</p>
          </div>
        </div>

        {/* TODO figure out what "personalized content can go here */}
        {isLoggedIn && (
        <div className="card mb-4">
          <div className="card-body p-4">
            <h2 className="mb-3">Latest activity or reviews</h2>
            <hr className="my-4"/>
            <p>Add content of people user follows</p>
          </div>
        </div>
        )}

      </div>


  );
}

export default Home;
