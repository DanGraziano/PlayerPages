import React, { useState } from 'react';
import {Link} from "react-router-dom";


// TODO Map link to /search/{search criteria} or /search?criteria={search criteria} when a search has been executed and according results shown
const Search = () => {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('all');
  const [genre, setGenre] = useState('all');
  const [releaseYear, setReleaseYear] = useState('all');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // TODO Handle the search process by sending a request to the RAWG API with the filters
    // TODO Update the state with the search results
  };

  return (
      <div className="search-page container py-5">
        <h2 className="text-uppercase text-center mb-5">Discover New Games</h2>
        <div className="input-group mb-3">
          <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a video game..."
          />
          <div className="input-group-append">
            <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="filters row mb-3">
          <div className="col-md-3">
            <select
                className="form-control"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="ps5">PlayStation</option>
              <option value="xbox">Xbox</option>
              <option value="switch">Nintendo</option>
              <option value="pc">PC</option>
              {/* Add more options */}
            </select>
          </div>
          <div className="col-md-3">
            <select
                className="form-control"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            >
              <option value="all">All Genres</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="arcade">Arcrade</option>
              <option value="casual">Casual</option>
              <option value="indie">Indie</option>
              <option value="massively-multiplayer">MMO</option>
              <option value="platformer">Platformer</option>
              <option value="puzzle">Puzzle</option>
              <option value="rpg">RPG</option>
              <option value="shooter">Shooter</option>
              <option value="simulation">Simulation</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
                className="form-control"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
            >
              <option value="all">All Years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
            </select>
          </div>
        </div>
        <div className="search-results row">
          {results.map((result, index) => (
              <div key={index} className="col-md-4 mb-4">
                <Link to={`/game/${result.id}`}>
                  <div className="card h-100">
                    <img src={result.coverImage} alt={result.title} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{result.title}</h5>
                      <p className="card-text">Rating: {result.rating}</p>
                    </div>
                  </div>
                </Link>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Search;

