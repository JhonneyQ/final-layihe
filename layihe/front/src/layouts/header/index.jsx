import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiLeagueoflegends } from 'react-icons/si';
import { GiHamburgerMenu } from 'react-icons/gi';
import './index.scss';

const Cheader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <div className="all">
          <SiLeagueoflegends className="icon" />
          <GiHamburgerMenu className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} />
          <nav className={menuOpen ? "active" : ""}>
            <ul>
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
              </li>
              <li>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>PROFILE</Link>
              </li>
              <li>
                <Link to="/moments" onClick={() => setMenuOpen(false)}>MOMENTS</Link>
              </li>
              <li>
                <Link to="/characters" onClick={() => setMenuOpen(false)}>CHARACTERS</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link>
              </li>
            </ul>
          </nav>
          <a className="play-button" href="https://www.leagueoflegends.com/tr-tr/">
            Play
          </a>
        </div>
      </div>
    </header>
  );
};

export default Cheader;
