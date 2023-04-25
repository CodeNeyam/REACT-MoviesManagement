import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';


function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);
  const [keyword, setKeyword] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [ratingFrom, setRatingFrom] = useState('');
  const [ratingTo, setRatingTo] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies.json`);
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovies();
  }, []);

  const handleSearch = () => {
    const filteredMovies = movies.filter(movie =>
      movie.Title.toLowerCase().includes(keyword.toLowerCase()) &&
      (movie.ReleaseYear >= yearFrom) && 
      (movie.ReleaseYear <= yearTo) &&
      (movie.Rating >= ratingFrom) && 
      (movie.Rating <= ratingTo)
    );
    setMovies(filteredMovies);
}


  const handleClear = () => {
    setKeyword('');
    setYearFrom('');
    setYearTo('');
    setRatingFrom('');
    setRatingTo('');
  }

  // Logic for displaying current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(movies.length / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <form>
        <label>Keyword:</label>
        <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
        <label>Year From:</label>
        <input type="date" value={yearFrom} onChange={(event) => setYearFrom(event.target.value)} />
        <label>Year To:</label>
        <input type="date" value={yearTo} onChange={(event) => setYearTo(event.target.value)} />
        <label>Rating From:</label>
        <input type="number" value={ratingFrom} onChange={(event) => setRatingFrom(event.target.value)} />
        <label>Rating To:</label>
        <input type="number" value={ratingTo} onChange={(event) => setRatingTo(event.target.value)} />
        <button type="button" onClick={handleSearch}>Search</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
      <div className="grid-container">
        {currentMovies.map((movie, index) => (
          <Card key={index} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => setCurrentPage(number)}>{number}</button>
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;
