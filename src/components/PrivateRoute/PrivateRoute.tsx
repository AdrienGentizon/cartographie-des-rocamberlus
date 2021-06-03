import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../contexts/UserProvider/UserProvider';

export default function PrivateRoute({ component, ...rest }: RouteProps) {
  const { user } = useAuth();

  if (!user || user?.isAnonymous) return <Redirect to="/login" />;
  return <Route {...rest} component={component} />;
}
