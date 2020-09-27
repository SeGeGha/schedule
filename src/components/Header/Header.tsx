import React from 'react';
import DropDown from '../Dropdown/Dropdown';
import Switcher from '../Switcher/Switcher';

import './Header.scss';

const Headers: React.FC = () => (
  <header>
    <nav>
      <a href="https://app.rs.school/">
        <img src="https://app.rs.school/static/images/logo-rsschool3.png" alt="Rolling Scopes School Logo" />
      </a>
      <div>
        <DropDown />
        <Switcher />
      </div>
    </nav>
  </header>
);

export default Headers;
