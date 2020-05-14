import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Main from './components/Main';
//import Board from './components/Board';


function App() {
  return (
    <HelmetProvider>
      <Router>
        <Route path = '/' exact component = {Main} />
        
      </Router>
    </HelmetProvider>
  );
}

export default App;
