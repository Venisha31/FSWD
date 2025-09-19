import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import Popup from "./components/Popup";
import requests from "./requests";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div style={{ backgroundColor: "#111" }}>
      <Navbar />
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} setSelectedMovie={setSelectedMovie} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} setSelectedMovie={setSelectedMovie} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} setSelectedMovie={setSelectedMovie} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} setSelectedMovie={setSelectedMovie} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} setSelectedMovie={setSelectedMovie} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} setSelectedMovie={setSelectedMovie} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} setSelectedMovie={setSelectedMovie} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} setSelectedMovie={setSelectedMovie} />
      
      <Popup movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

export default App;
