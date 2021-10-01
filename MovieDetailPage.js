import { useEffect, useState } from "react";

function MovieDetailPage(props) {
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    const imdbId = props.match.params.imdbId;
    fetchMovieDetailsById(imdbId);
  }, []);

  const fetchMovieDetailsById = (imdbId) => {
    const movieDetailsURL = `http://www.omdbapi.com/?i=${imdbId}&page=2&apikey=5ceb8fcc`;
    fetch(movieDetailsURL)
      .then((response) => response.json())
      .then((result) => {
        setMovieDetail(result);
      });
  };

  return (
    <div class="container text-center">
      <div class="row">
        <div class="col mt-5">
          <img src={movieDetail.Poster} />
          <h2>{movieDetail.Title}</h2>
          <p>{movieDetail.Plot}</p>
          <p>Released: {movieDetail.Released}</p>
          <p>Director: {movieDetail.Director}</p>
          <p>Writer: {movieDetail.Writer}</p>
          <p>Actor: {movieDetail.Actors}</p>
          <p>Awards: {movieDetail.Awards}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
