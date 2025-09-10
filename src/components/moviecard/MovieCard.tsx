import React from 'react';
import './MovieCard.scss';
import { Link } from 'react-router-dom';

export interface MovieCardProps {
  id: string;
  title: string;
  year: string;
  rating: string;
  genres: string[];
  mediumImageCover: string;
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <div className="movie-card">
      <Link to={'/movie/' + props.id}>
        <div className="movie-card__image-container">
          <img
            src={props.mediumImageCover}
            alt={props.title}
            loading="lazy"
          />
          <div className="movie-card__overlay">
            <div className="movie-card__rating">
              <span className="star">★</span>
              <span>{props.rating} / 10</span>
            </div>
            {props.genres && (
              <div className="movie-card__genres">
                {props.genres.slice(0, 2).map((genre, index) => (
                  <span key={index} className="movie-card__genre">
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="movie-card__content">
          <h3 className="movie-card__title">{props.title}</h3>
          <div className="movie-card__year">{props.year}</div>
        </div>
      </Link>
    </div>
  );
}
