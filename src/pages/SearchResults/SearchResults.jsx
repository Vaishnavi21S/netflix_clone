// src/pages/SearchResults/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import axios from "axios";

const API_KEY = "1781f01bbb78813a937e40766d23fb00"; // Replace this with your TMDB key

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
        .then((res) => setMovies(res.data.results))
        .catch((err) => console.error("Search error:", err));
    }
  }, [query]);

  const handleMovieClick = (movie) => {
    navigate(`/player/${movie.id}`);
  };

  return (
    <div>
       <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)}
       style={{ cursor: 'pointer', width: '40px', marginBottom: '20px' }}/>
      <h2>Results for: {query}</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            style={{ margin: 10, cursor: "pointer" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
