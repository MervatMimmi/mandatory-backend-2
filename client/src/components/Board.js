import React, {useState, useCallback} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';

const useStyles = makeStyles ({

});

export default function Board(props){
    const classes = useStyles('');
    const [title, updateTitle] = useState('');
    const [columns, updateColumns] = useState([]);

    const path = window.location.pathname.split('/');
    const id = path[3];

    function createColumn(e){
        e.preventDefault();
        let data = {
            title : title,
            id:id}
    
        axios.post(`/api/boards/`+ data)
            .then(response => {
                console.log(response.data);
            })
    }

    return(
        <form onSubmit = {createColumn}>
            <TextField className = {classes.listInput}
                id = 'standard-name'
                label = 'Create a list'
                margin = 'normal'
                value = {title}
                onChange = {e => updateTitle(e.target.value)} />
        </form>
    );
}