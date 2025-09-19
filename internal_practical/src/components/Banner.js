import React, { useEffect, useState } from "react";
import axios from "../api";
import requests from "../requests";

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  return (
    <header style={{
      position: "relative",
      color: "white",
      objectFit: "contain",
      height: "448px",
      backgroundSize: "cover",
      backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
      backgroundPosition: "center center"
    }}>
      <div style={{ marginLeft: "30px", paddingTop: "140px", height: "190px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800" }}>{movie?.title || movie?.name}</h1>
        <h3 style={{ width: "45rem", lineHeight: "1.3", maxWidth: "360px" }}>
          {movie?.overview}
        </h3>
      </div>
      <div style={{
        height: "7.4rem",
        backgroundImage: "linear-gradient(180deg, transparent, rgba(37,37,37,0.61), #111)"
      }} />
    </header>
  );
}
