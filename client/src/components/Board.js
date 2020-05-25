import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';

import Column from './Column';

const useStyles = makeStyles ({

});

export default function Board(props){
    const classes = useStyles('');
    const [title, updateTitle] = useState('');
    const [columns, updateColumns] = useState([]);

    const path = window.location.pathname.split('/');
    const id = path[3];


   /* useEffect(() => {
        axios.get('/api/columns/' + id)
            .then(response => {
                console.log(response.data);
                updateColumns(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);*/

    function createColumn(e){
        e.preventDefault();
    
        axios.post(`/api/boards/${id}`, {title})
            .then(response => {
                console.log(response.data);
                updateTitle(response);
            })
            .catch(error => {
                console.error(error)
            })
            updateTitle('')
    }

    return(
        <div>
        <form onSubmit = {createColumn}>
            <TextField className = {classes.listInput}
                id = 'standard-name'
                label = 'Create a list'
                margin = 'normal'
                value = {title}
                onChange = {e => updateTitle(e.target.value)} />
        </form>
        <div>
            {columns.map(column => <Column key = {column._id} column = {column} />)}
        </div>
        </div>
    );
}