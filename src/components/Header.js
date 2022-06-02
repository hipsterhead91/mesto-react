import React from 'react';
// Примечание: доступ к изображениям осуществляется через import (прямое указание ссылки 
// в атрибуте элемента не сработает). Импортированная переменная вставляется куда надо.
import logoPath from '../images/logo.svg';

function Header() {

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип проекта Mesto Russia." />
    </header>
  );
}

export default Header;