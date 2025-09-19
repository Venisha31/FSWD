import React from "react";

export default function Popup({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 2000
    }}>
      <div style={{
        background: "#111", padding: "20px", borderRadius: "8px", width: "80%", color: "white"
      }}>
        <button onClick={onClose} style={{
          float: "right", background: "red", color: "white", border: "none", padding: "10px"
        }}>X</button>
        <h2>{movie.title || movie.name}</h2>
        <p>{movie.overview}</p>
        <iframe
          title="trailer"
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${movie?.trailer || "dQw4w9WgXcQ"}`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
