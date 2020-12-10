import React, { useEffect, useState } from 'react';
import Tachyons from 'tachyons'
import Movie from './component/Movie'

const FEATURED_API = "https://api.themoviedb.org/3/movie/popular?api_key=1f4e8dffb1980fd4e4722530dd1334fd&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=1f4e8dffb1980fd4e4722530dd1334fd&query="

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMovie(FEATURED_API);
  }, [])

  const getMovie = (API) => {
    fetch(API).then(res => res.json()).then(data => {
      setMovies(data.results);
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovie(SEARCH_API + searchTerm)
      setSearchTerm('');
    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input type="search" placeholder="search..." className="search br-pill" value={searchTerm} onChange={handleOnChange} />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) =>
          <Movie key={movie.id} {...movie} />
        )}
      </div>
    </>
  );
}

export default App;
