import React from 'react';
import MovieCard from '../moviecard/MovieCard';
import ErrorHandling from '../ErrorHandling/ErrorHandling';
import './MovieList.scss';

interface MovieListProps {
  movieListOrError: any;
  handlePageChange: Function;
  currentPage: string;
}

export default function MovieList(props: MovieListProps) {
  // ErrorHandling
  if (props.movieListOrError.status !== 'ok') {
    return <ErrorHandling error={props.movieListOrError} />;
  }

  const movieListCount = props.movieListOrError.data.movie_count;
  const limit = props.movieListOrError.data.limit;

  const total_page_number = Math.ceil(Number(movieListCount) / Number(limit));
  const pageSelector: JSX.Element = (
    <div className="movie-list__pagination">
      <select
        id="page_selector"
        onChange={(e) => {
          props.handlePageChange(e.target.value);
        }}
        value={props.currentPage}
      >
        {Array(total_page_number)
          .fill(0)
          .map((value, index) => {
            return (
              <option value={index + 1} key={index}>
                Page {index + 1}
              </option>
            );
          })}
      </select>
    </div>
  );

  const listOfMovieCard = props.movieListOrError.data.movies?.map(
    (movie: any, index: number) => {
      return (
        <MovieCard
          id={movie.id}
          title={movie.title}
          year={movie.year}
          rating={movie.rating}
          genres={movie.genres}
          mediumImageCover={movie.medium_cover_image}
          key={movie.id}
        />
      );
    }
  );

  return (
    <div className="movie-list">
      <div className="movie-list__header">
        <h2 className="movie-list__title">{`${movieListCount} YTS Movies Available`}</h2>
      </div>
      {pageSelector}
      <div className="movie-list__grid">
        {listOfMovieCard}
      </div>
    </div>
  );
}
