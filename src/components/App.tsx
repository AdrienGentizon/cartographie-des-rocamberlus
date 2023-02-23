import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ApolloProvider } from '@apollo/client'
import getApolloClient from '../utils/getApolloClient'

import { CONTACT_URL, HOME_URL, MAP_URL } from '../routes'

import HomePage from '../pages/HomePage/HomePage'
import ContactPage from '../pages/ContactPage/ContactPage'
import MapPage from '../pages/MapPage/MapPage'
import ArticlePage from '../pages/ArticlePage/ArticlePage'
import Page404 from '../pages/ErrorPages/Page404'
import Body from './Body/Body'

export default function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={getApolloClient()}>
        <Body>
          <Switch>
            <Route exact path={HOME_URL} component={HomePage} />
            <Route path={MAP_URL} component={MapPage} />
            <Route path={CONTACT_URL} component={ContactPage} />
            <Route path="/article/:id" component={ArticlePage} />
            <Route path="*" component={Page404} />
          </Switch>
        </Body>
      </ApolloProvider>
    </BrowserRouter>
  )
}
