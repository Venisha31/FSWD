const API_KEY = "0f7970484c868d2977837cbb8a2fc174";
const API_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjc5NzA0ODRjODY4ZDI5Nzc4MzdjYmI4YTJmYzE3NCIsIm5iZiI6MTc1ODI1NTE2OC4xNTI5OTk5LCJzdWIiOiI2OGNjZDg0MDYzMTg4Zjg2MmUwNzNiZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GDmcYuvaM4nsAGVVSFM2fHdwVZDgwqTwBqRFmKn5dnU"

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
