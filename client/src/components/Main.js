import React, {useState} from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const network = require('../Network.jpg');

const useStyles = makeStyles({
    backgroundImage: {
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${network})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: '0.9'
    },
});

export default function Main(){
    const classes = useStyles();
    
    return(
        <div>
            <Helmet>
                <title>
                    Main
                </title>
            </Helmet>
            <div className = {classes.backgroundImage}>
            </div>
        </div>
    );
}