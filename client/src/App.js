import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header';
import Main from './components/Main';
import Board from './components/Board';

const network = require('./Network.jpg');

const useStyles = makeStyles(theme => ({
  root: {
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${network})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      opacity: '0.9'
  },
}));

function App() {
  const classes = useStyles();
  return (
    <HelmetProvider>
      <Router>
        <div  className={classes.root}>
          <Header/>
          <Route path = '/' exact component = {Main} />
          <Route path ='/board/:id' component = {Board} />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
