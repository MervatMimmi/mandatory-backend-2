import React, {useState} from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    backgroundImage: {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#FFFAEC',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
})

export default function Board() {
    const classes = useStyles();

    return(
        <div>
            <Helmet>
                <title>
                    Board
                </title>
            </Helmet>
            <div className = {classes.backgroundImage}>

            </div>
        </div>
    );
}