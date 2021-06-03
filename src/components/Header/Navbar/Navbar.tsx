import React from 'react';
import { Link } from 'react-router-dom';
import { MAP, BLOG, LOGIN } from '../../../routes';

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
          <Link to={MAP}>Carte</Link>
        </li>
        <li>
          <Link to={BLOG}>Blog</Link>
        </li>
        <li>
          <Link to={LOGIN}>Compte</Link>
        </li>
      </ul>
    </nav>
  );
}
