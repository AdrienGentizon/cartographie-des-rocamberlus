import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserProvider from '../contexts/UserProvider/UserProvider';
import ClientProvider from '../contexts/ClientProvider/ClientProvider';

import { ApolloProvider } from '@apollo/client';
import getApolloClient from '../utils/getApolloClient';

import { BLOG, HOME, LOGIN, MAP } from '../routes';

import { HeaderWithIntersectionObserver } from './Header/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import Map from './Map/Map';
import Blog from './Blog/Blog';

import '../styles/style.scss';
import Article from './Article/Article';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ClientProvider>
          <ApolloProvider client={getApolloClient()}>
            <div className="App">
              <HeaderWithIntersectionObserver />
              <Switch>
                <Route exact path={HOME} component={Home} />
                <Route path={MAP} component={Map} />
                <Route exact path={BLOG} component={Blog} />
                <Route path={LOGIN} component={Login} />
                <Route path={`${BLOG}/:id`} component={Article} />
              </Switch>
            </div>
          </ApolloProvider>
        </ClientProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
