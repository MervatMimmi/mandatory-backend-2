import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import {Grid, Paper, TextField, Card, CardContent, Typography, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
   /* paper: {
        maxWidth: 400,
        padding:theme.spacing(2),
        textAlign:  'center',
        color:theme.palette.text.secondary,
        backgroundColor: '#5C5C9A'
    },*/
    textfield: {
        margin: '0',
        fontWeight: 'bold',
        '& label.Mui-input': {
            color: 'black'
        },
        '& label.Mui-focused': {
            color: 'black'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiInput-colorSecondary:after': {
            color: 'black',
        },
    },
    //card: { maxWidth: 345, },
    delete: {
        marginLeft: 'auto',
        marginTop: '20px',
    },
}));

export default function Column({boardId, column, columns, updateColumns, addCard}){
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState([]);
    const columnId = column._id

    useEffect(()=> {
        getCards()
    }, []);

    function getCards() {
        axios.get(`/api/columns/${boardId}/${column._id}/cards`)
            .then(response => {
                console.log(response.data);
                setCards(response.data)
            })
            .catch(error => {
                console.error(error)
            });
    }
   
    function onSubmit(e) {
        e.preventDefault();
        let data = {title: title}
        axios.post(`/api/columns/${boardId}/${column._id}/cards`, data)
            .then(response => {
                console.log(response.data);
                setTitle(column._id, response.data)
                setTitle('');
            })
            .catch(error => {
                console.error(error)
            });
            getCards();
    }

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
            {(provided, snapshot) => {
                return (
                <Grid container wrap = 'wrap' 
                    spacing = {4} 
                    direction = 'column'
                    {...provided.droppableProps}
                    ref = {provided.innerRef} 
                    style = {{
                        background: snapshot.isDraggingOver ? 'lightbue': 'lightgrey',
                        padding: 4,
                        minWidth: 250,
                        minHeight: 500,
                        margin: 10
                    }}>
                    <Paper className = {classes.paper}>
                        <Grid item xs={2}
                            className = {classes.delete}
                            onClick = {() => {handleDeleteColumn(columnId)}}>
                                <DeleteIcon/> 
                        </Grid> 
                        <h4>{column.title}</h4>
                        <form onSubmit = {onSubmit}>
                            <TextField className = {classes.textfield}
                                id = 'standard-name'
                                label = 'Create a card'
                                margin = 'normal'
                                value = {title}
                                onChange = {e => setTitle(e.target.value)} />
                        </form>
                        
                {cards.map((card, index) => {
                    return <Draggable 
                    index = {index} key = {card._id} draggableId = {String(card._id)}>
                        {(provided, snapshot) => (
                            <Card className = {classes.card}>
                            <CardContent>
                            <div index = {index}
                                ref = {provided.innerRef}
                                {...provided.draggableProps}  
                                {...provided.dragHandleProps}
                                style = {{
                                    userSelect :'none',
                                    padding: 16,
                                    margin: '0 0 8px 0',
                                    minHeight: '50px',
                                    backgroundColor: snapshot.isDragging ? "#263B4A"
                                    : "#456C86",
                                    color: "white",
                                  ...provided.draggableProps.style
                                }}>
                                <Typography variant = 'subtitle1' component = 'h2'> 
                                    {card.title}   
                                </Typography>
                                <Typography component = 'p'>
                                    {card.description}  
                                </Typography>
                                <IconButton>
                                </IconButton>
                            </div>
                            </CardContent>
                        </Card>
                        )}
                    </Draggable>
                 })}
                {provided.placeholder}
                           
                    </Paper>
                </Grid>
            )}}
        </Droppable>
    )
}