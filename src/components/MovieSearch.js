import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKey from "../key";
import "./MovieSearch.css";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://movie-database-alternative.p.rapidapi.com/?s=${searchTerm}&r=json&page=1`,
        {
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
          },
        }
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      setError("Erro ao buscar os filmes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchMovies();
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <h1>Busca de Filmes</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Digite o título do filme"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={fetchMovies} disabled={!searchTerm}>
          Buscar
        </button>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && (
        <ul className="movies">
          {movies.map((movie) => (
            <li key={movie.imdbID} className="movie">
              {" "}
              {movie.Poster && (
                <img src={movie.Poster} alt={`${movie.Title} Poster`} />
              )}
              <div>
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieSearch;
