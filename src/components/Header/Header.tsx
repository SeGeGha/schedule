import React from 'react';

import Switcher from '../Switcher/Switcher';

import './Header.scss';

const Header: React.FC = () => (
  <header>
    <nav>
      <a href="https://app.rs.school/">
        <img src="https://app.rs.school/static/images/logo-rsschool3.png" alt="Rolling Scopes School Logo" />
      </a>
      <Switcher />
    </nav>
  </header>
);

export default Header;
