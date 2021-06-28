import React from 'react';

import { Link } from 'react-router-dom';
import { HOME_URL } from '../../../routes';

export default function NavTitle() {
  return (
    <Link to={HOME_URL}>
      <h1 className="text-xl font-extralight">Carte Brute</h1>
    </Link>
  );
}
