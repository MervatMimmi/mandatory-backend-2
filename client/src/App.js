import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Header from './components/Header';
import Main from './components/Main';
import Board from './components/Board';


function App() {
  return (
    <HelmetProvider>
      <Router>
        <Route path = '/' exact component = {Main} />
        <Header/>
        <Route path ='/boards/:id' component = {Board} />
      </Router>
    </HelmetProvider>
  );
}

export default App;
