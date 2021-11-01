import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import getApolloClient from "../utils/getApolloClient";

import { CONTACT_URL, HOME_URL, MAP_URL } from "../routes";

import Nav from "./Nav/Nav";
import HomePage from "../pages/HomePage/HomePage";
import ContactPage from "../pages/ContactPage/ContactPage";
import Footer from "./Footer/Footer";
import MapPage from "../pages/MapPage/MapPage";
import ArticlePage from "../pages/ArticlePage/ArticlePage";

export default function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={getApolloClient()}>
        <div className="parent min-h-screen flex flex-col lg:max-w-2xl mx-auto">
          <Nav />
          <Switch>
            <Route exact path={HOME_URL} component={HomePage} />
            <Route path={MAP_URL} component={MapPage} />
            <Route path={CONTACT_URL} component={ContactPage} />
            <Route path="/article/:id" component={ArticlePage} />
          </Switch>
          <Footer />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}
