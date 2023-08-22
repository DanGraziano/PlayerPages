import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import TopNavbar from './components/navbar';
import Home from './components/home';
import Profile from './components/profile';
import Login from './components/login';
import Register from './components/register';
import Search from './components/search';
import GameDetails from './components/gamedetails';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store, persistor } from './store';
import Settings from "./components/settings";
import Admin from "./components/admin";


function App() {
  return (
      <div style={{backgroundColor: 'beige'}}>
      <Provider store={store}>
          <BrowserRouter>
            <div className="container">
              <TopNavbar />
              <div className="container border rounded p-5">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:username" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/game/:id" element={<GameDetails />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
      </Provider>
      </div>
  );
}

export default App;

