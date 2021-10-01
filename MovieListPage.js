import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function MovieListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [noMoviesFound, setNoMoviesFound] = useState(false);

  useEffect(() => {
    //get movie name from local storage
    let term = localStorage.getItem("searchTerm");
    if (term) {
      fetchMovies(term);
    }
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearResults = () => {
    setMovies([]);
    setSearchTerm("");
    localStorage.removeItem("searchTerm");
  };

  const fetchMovies = (movieName) => {
    const searchURL = `http://www.omdbapi.com/?s=${movieName}&page=2&apikey=5ceb8fcc`;

    //put movie name in local storage
    localStorage.setItem("searchTerm", movieName);

    fetch(searchURL)
      .then((response) => response.json())
      .then((result) => {
        if (result.Error) {
          setMovies([]);
          setNoMoviesFound(true);
        } else {
          setMovies(result.Search);
          setNoMoviesFound(false);
        }
      });
  };

  const movieItems = movies.map((movie) => {
    return (
      <div key={movie.imdbID}>
        <div class="col">
          <div class="card shadow-sm">
            <img
              src={movie.Poster == "N/A" ? "miss.jpg" : movie.Poster}
              class="bd-placeholder-img card-img-top"
            />

            <div class="card-body">
              <h3>{movie.Title}</h3>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <NavLink to={`/${movie.imdbID}`}>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Details
                    </button>
                  </NavLink>
                </div>
                <small class="text-muted">{movie.Year}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Search Movie</h1>
            <p class="lead text-muted">
              we are here to help you in finding best movies for you.
            </p>
            Search Here :{" "}
            <input
              type="text"
              onChange={handleSearchTermChange}
              placeholder="e.g. Batman"
            />
            <p>
              <button
                onClick={() => fetchMovies(searchTerm)}
                class="btn btn-primary my-2 me-2"
              >
                Search
              </button>

              <button
                onClick={clearResults}
                class="btn btn-secondary my-2 me-2"
              >
                Clear Results
              </button>
            </p>
          </div>
        </div>
      </section>

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {movieItems}
          </div>
        </div>
      </div>
      {noMoviesFound ? <h1>No Movies Found</h1> : null}
    </div>
  );
}

export default MovieListPage;
