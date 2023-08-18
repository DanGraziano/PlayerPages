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
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import {LoginProvider} from "./context/login-context";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <LoginProvider>
          <div className="container border border-dark rounded">
          <TopNavbar />
            <div className="container border border-dark rounded p-5">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
            </div>
          </div>
          </LoginProvider>
      </BrowserRouter>
        </PersistGate>
      </Provider>
  );
}

export default App;