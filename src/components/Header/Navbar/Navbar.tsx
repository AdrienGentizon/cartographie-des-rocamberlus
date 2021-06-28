import React from 'react';
import { Link } from 'react-router-dom';
import { MAP_URL, BLOG_URL, LOGIN_URL } from '../../../routes';

interface NavbarProps {
  isCollapsed: boolean;
}

export default function Navbar({ isCollapsed }: NavbarProps) {
  return (
    <nav
      className={`Header__nav ${
        isCollapsed ? 'Header__nav--is-collapsed' : ''
      }`}
    >
      <ul className="Header__nav-list">
        <li>
          <Link to={MAP_URL}>Carte</Link>
        </li>
        <li>
          <Link to={BLOG_URL}>Blog</Link>
        </li>
        <li>
          <Link to={LOGIN_URL}>Compte</Link>
        </li>
      </ul>
    </nav>
  );
}
