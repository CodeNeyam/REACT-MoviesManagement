import React from 'react';

function Card({ movie }) {
  return (
    <div className="card">
      <img src={movie.image} alt={movie.title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Rating}</p>
      <p>{movie.ReleaseYear}</p>
    </div>
  );
}

export default Card;
