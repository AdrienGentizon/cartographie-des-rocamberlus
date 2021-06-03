import React from 'react';
import { HOME, MAP } from '../../../routes';
import SignOutButton from '../SignOutButton/SignOutButton';
import AnonymousSignInButton from './AnonymousSignInButton/AnonymousSignInButton';
import DashboardLink from './DashboardLink/DashboardLink';
import InvalidUserSignInButton from './InvalidUserSignInButton/InvalidUserSignInButton';

export default function Dev() {
  const devStyle: React.CSSProperties = {};
  return (
    <div className="Dev" style={devStyle}>
      <p>or auto sign in as:</p>
      <AnonymousSignInButton />
      <InvalidUserSignInButton />
      <p>or sign out</p>
      <SignOutButton />
      <DashboardLink to={HOME} name="Private Dashboard" />
      <DashboardLink to={MAP} name="Public Map" />
    </div>
  );
}
