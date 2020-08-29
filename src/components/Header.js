import React from 'react';
import logoPath from '../images/logo.svg';

// ШАПКА

function Header() {
  
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип проекта Mesto Russia." />
    </header>
  );
}

export default Header;