import React, { useContext, useEffect, useState } from 'react';
import SearchAndFilterBox from '../components/search/SearchAndFilterBox';
import Spinner from '../components/spinner/Spinner';
import MovieList from '../components/movielist/MovieList';
import Heading from '../components/header/Heading';
import { AppContext } from '../store/AppContextProvider';
import './EntryPage.scss';

export default function EntryPage() {
  const [searchResponse, updateSearchResponse] = useState<any>('');
  const [loading, updateLoading] = useState(false);
  const [previousURL, updatePreviousUrl] = useState<URL>(
    new URL('https://yts.mx/api/v2/list_movies.json')
  );
  const context = useContext(AppContext);

  const fetchData = (url: URL) => {
    updatePreviousUrl(url);
    updateLoading(true);
    fetch(url.href)
      .then(async (res) => await res.json())
      .then((data) => {
        updateSearchResponse(data);
        updateLoading(false);
      })
      .catch((err) => {
        updateSearchResponse(err.toString());
        updateLoading(false);
      });
  };

  const handlePageChange = (page: string) => {
    context.updateCurrentPage(page);
    previousURL.searchParams.set('page', page);
    fetchData(previousURL);
  };

  useEffect(() => {
    if (context.isQueryStateModified) {
      if (context.currentQueries.search.trim() !== '') {
        previousURL.searchParams.set(
          'query_term',
          context.currentQueries.search
        );
      }
      if (context.currentQueries.quality.toLowerCase() !== 'all') {
        previousURL.searchParams.set('quality', context.currentQueries.quality);
      }
      if (context.currentQueries.genre.toLowerCase() !== 'all') {
        previousURL.searchParams.set('genre', context.currentQueries.genre);
      }
      if (context.currentQueries.rating.toLowerCase() !== 'all') {
        previousURL.searchParams.set(
          'minimum_rating',
          context.currentQueries.rating.replace('+', '')
        );
      }
      if (context.currentQueries.sortBy.toLowerCase() !== 'date_added') {
        previousURL.searchParams.set('sort_by', context.currentQueries.sortBy);
      }
    }
    fetchData(previousURL);
  }, []);
  return (
    <div className="entry-page">
      <Heading />
      
      <div className="entry-page__content">
        <div className="entry-page__hero">
          <div className="entry-page__hero-overlay"></div>
          <img 
            className="entry-page__hero-image" 
            src="https://yts.mx/assets/images/movies/the_batman_2022/background.jpg" 
            alt="Featured Movie"
          />
          <div className="entry-page__hero-content">
            <h1 className="entry-page__hero-title">Découvrez des milliers de films</h1>
            <p className="entry-page__hero-subtitle">Streaming gratuit en haute qualité</p>
          </div>
        </div>
        
        <SearchAndFilterBox fetchData={fetchData} />
        
        {loading ? (
          <div className="entry-page__spinner">
            <Spinner />
          </div>
        ) : (
          <MovieList
            movieListOrError={searchResponse}
            handlePageChange={handlePageChange}
            currentPage={context.currentPage}
          />
        )}
      </div>
      
      <div className="entry-page__footer">
        <p>YTS Streaming - Redesigned with ❤️</p>
      </div>
    </div>
  );
}
