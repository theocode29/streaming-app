import React, { useContext } from 'react';
import SettingIcon from './SettingIcon';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AppContext, defaultQueries } from '../../store/AppContextProvider';
import './Heading.scss';

export default function Heading(props: any) {
  const showBackBtn = useLocation().pathname !== '/';
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    context.updateQueries.search(defaultQueries.search);
    context.updateQueries.quality(defaultQueries.quality);
    context.updateQueries.genre(defaultQueries.genre);
    context.updateQueries.rating(defaultQueries.rating);
    context.updateQueries.sortBy(defaultQueries.sortBy);
  };

  return (
    <header className="header">
      <div className="header__container">
        {showBackBtn ? (
          <button className="header__back-button" onClick={handleBack}>
            <span className="icon">&larr;</span>
            <span>Retour</span>
          </button>
        ) : (
          <div></div> /* Empty div for flex spacing */
        )}
        
        <div className="header__logo">
          <Link to="/" onClick={handleGoHome}>
            <img
              src="/assets/images/logo_final.png"
              alt="Logo"
            />
          </Link>
        </div>
        
        <div className="header__actions">
          <div className="header__settings">
            <SettingIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
