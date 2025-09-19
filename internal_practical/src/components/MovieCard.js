import React from "react";

export default function MovieCard({ movie, onClick }) {
  return (
    <img
      onClick={() => onClick(movie)}
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.name}
      style={{
        width: "150px",
        objectFit: "contain",
        marginRight: "10px",
        transition: "transform 450ms",
        cursor: "pointer"
      }}
      onMouseOver={e => e.currentTarget.style.transform = "scale(1.08)"}
      onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
    />
  );
}
