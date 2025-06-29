import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

    const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzgxZjAxYmJiNzg4MTNhOTM3ZTQwNzY2ZDIzZmIwMCIsIm5iZiI6MTc0ODE2NjM1MC45NTcsInN1YiI6IjY4MzJlNmNlZjZlMDMyYTU0NzJiNmNlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zNP_1UGyAdRq3V7GYrIFoA_SNzcJb9LhXecFo2Aav-k' // Replace with your actual TMDB Bearer token
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          // Try to find a YouTube trailer
          const trailer = res.results.find(
            video => video.site === 'YouTube' && video.type === 'Trailer'
          );
          setApiData(trailer || res.results[0]); // Fallback to first video if trailer not found
        } else {
          setApiData(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching trailer:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => navigate(-1)}
        style={{ cursor: 'pointer', width: '40px', marginBottom: '20px' }}
      />

      {loading ? (
        <p>Loading trailer...</p>
      ) : apiData ? (
        <>
          <iframe
            width="90%"
            height="500"
            src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1`}
            title="YouTube trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>📅 {apiData.published_at?.slice(0, 10) || 'Unknown date'}</p>
            <p>🎬 {apiData.name || 'Unknown title'}</p>
            <p>📁 {apiData.type || 'Unknown type'}</p>
          </div>
        </>
      ) : (
        <p>No trailer available for this movie.</p>
      )}
    </div>
  );
};

export default Player;
