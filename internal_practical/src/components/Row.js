import React, { useEffect, useState } from "react";
import axios from "../api";
import MovieCard from "./MovieCard";

export default function Row({ title, fetchUrl, setSelectedMovie }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div style={{ color: "white", marginLeft: "20px" }}>
      <h2>{title}</h2>
      <div style={{
        display: "flex",
        overflowY: "hidden",
        overflowX: "scroll",
        padding: "20px"
      }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
        ))}
      </div>
    </div>
  );
}
