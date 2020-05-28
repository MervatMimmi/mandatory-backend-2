import React, {useState} from 'react';
import axios from 'axios';
import { Droppable, Draggale } from 'react-beautiful-dnd';

import {Grid, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: 400,
        padding:theme.spacing(2),
        textAlign:  'center',
        color:theme.palette.text.secondary,
    },
    delete: {
        marginLeft: 'auto'
    }
}));
export default function Column({boardId, column, columns, updateColumns}){
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const columnId = column._id

    function handleDeleteColumn(columnId){
        console.log(columnId);
        axios.delete('/api/columns/' + columnId)
            .then(response => {
                console.log(response.data);
                updateColumns(columns.filter(el => el._id !== columnId));
            })
    }

    return (
        <Droppable droppableId = {String(columnId)}>
            {provider => (
                <Grid container wrap = 'wrap' 
                    spacing = {4} 
                    direction = 'column'
                    ref = {provider.innerRef} {...provider.droppableProps}>
                    <Paper className = {classes.paper}>
                        <Grid item xs={2}
                            className = {classes.delete}
                            onClick = {() => {handleDeleteColumn(columnId)}}>
                                <DeleteIcon/> 
                        </Grid> 
                        <h3>{column.title}</h3>   
                    </Paper>
                </Grid>
            )}
        </Droppable>
    )
}