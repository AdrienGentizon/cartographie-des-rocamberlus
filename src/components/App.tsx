import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserProvider from '../contexts/UserProvider/UserProvider';
import ClientProvider from '../contexts/ClientProvider/ClientProvider';

import { ApolloProvider } from '@apollo/client';
import getApolloClient from '../utils/getApolloClient';

import { CONTACT_URL, HOME_URL, MAP_URL } from '../routes';

import Nav from './Nav/Nav';
import Home from './Home/Home';
import ContactRoute from './Routes/ContactRoute';
import MapRoute from './Routes/MapRoute';
import Footer from './Footer/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ClientProvider>
          <ApolloProvider client={getApolloClient()}>
            <div className="parent min-h-screen flex flex-col justify-between">
              <Nav />
              <Switch>
                <Route exact path={HOME_URL} component={Home} />
                <Route path={MAP_URL} component={MapRoute} />
                <Route path={CONTACT_URL} component={ContactRoute} />
              </Switch>
              <Footer />
            </div>
          </ApolloProvider>
        </ClientProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
