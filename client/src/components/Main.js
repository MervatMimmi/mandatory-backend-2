import React, {useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, TextField } from '@material-ui/core';

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
    grid: {
        direction: 'column',
        alignItems: 'center',
        justifyContent:'center',
        minHeight: '100vh'
    },
    card: {
        width: '650px',
        height: '150px',
        padding: '100px 0px',
        display: 'block',
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0',
        background: 'transparent',
    },
    header: {
        textAlign: 'center',
        color: '#FFFEFF'
    },
    formgrid: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    form: {
        margin: '0',
        fontWeight: 'bold',
        '& label.Mui-input': {
            color: '#FFFEFF'
        },
        '& label.Mui-focused': {
            color: '#FFFEFF'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#FFFEFF',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FFFEFF',
        },
        '& .MuiInput-colorSecondary:after': {
            color: '#FFFEFF',
        },
    },
});

export default function Main() {
    const classes = useStyles();
    const [boardTitle, updateBoardTitle] = useState('');
    const [boardRedirect, setBoardRedirect] = useState(false);

    function onSubmit(e) {
        e.preventDefault();
        const data = {title: boardTitle}
        console.log(data);

        axios.post('/api/boards/', data)
            .then(response => {
                console.log(response);
                setBoardRedirect('/boards/:id' + response.data);
            })
            .catch(error => {
                console.error(error);
            })
            updateBoardTitle('');
    };
    

    return(
        <div>
            <Helmet>
                <title>
                    Main
                </title>
            </Helmet>
            <div className = {classes.backgroundImage}>
                <Grid className = {classes.grid}
                    container
                    spacing = {0}
                    >
                    <Card className = {classes.card}
                        square
                        elevation = {10}
                        >
                        <CardHeader className = {classes.header}
                            title = 'Create a Board'
                            />
                        <Grid className = {classes.header}>
                            <form className = {classes.form}
                                noValidate autoComplete = 'off'
                                onSubmit = {onSubmit}
                            >
                                <TextField className = {classes.textField}
                                    required
                                    id = 'standard-basic'
                                    label = 'Board name...'
                                    value = {boardTitle}
                                    onChange = {e => updateBoardTitle(e.target.value)}
                                    />
                                {boardRedirect && <Redirect to= {boardRedirect}/>}
                            </form> 
                        </Grid> 
                    </Card>
                </Grid>
            </div>
        </div>
    );
}