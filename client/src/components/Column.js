import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import {Grid, Paper, Card, CardContent, Typography, IconButton, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CardModal from './CardModal';

const useStyles = makeStyles((theme) => ({
    paper: {
        /*maxWidth: 400,
        padding:theme.spacing(2),
        textAlign:  'center',
        color:theme.palette.text.secondary,
        backgroundColor: '#5C5C9A'*/
    },
    delete: {
        marginLeft: 'auto',
        marginTop: '20px',
    },
    button: {

    }
}));

export default function Column({boardId, column, handleDeleteColumn, columns, updateColumns}){
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState([]);
    const [modal, updateModal] = useState(false);

    const openModal = () => updateModal(true)
    const closeModal = () => updateModal(false)

    const columnId = column._id

    useEffect(()=> {
        getCards()
    }, []);

    function onUploadCard() {
        getCards();
    }

    function getCards() {
        axios.get(`/api/columns/${boardId}/${column._id}/cards`)
            .then(response => {
                console.log('cards: ' + response.data);
                setCards(response.data)
                
            })
            .catch(error => {
                console.error(error)
            });
    }

    function handleDeleteCard(cardId){
        axios.delete(`/api/columns/${boardId}/${column._id}/cards/`+ cardId)
            .then(response => {
                console.log(response.data);
                setCards(cards.filter(el => el._id !== cardId));
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
                        background: snapshot.isDraggingOver ?  'lightgrey':'#5C5C9A',
                        borderRadius: 13,
                        padding: 4,
                        minWidth: 250,
                        minHeight: 500,
                        margin: 10,
                        textAlign: 'center'
                    }}>
                    <Paper className = {classes.paper}>
                        <Grid item xs={2}
                            className = {classes.delete}
                            onClick = {() => {handleDeleteColumn(columnId)}}>
                                <DeleteIcon/> 
                        </Grid> 
                        <h4>{column.title}</h4>
                        <Button className = {classes.button}>
                        {!modal && <h4 className = {classes.h4}
                                            onClick = {openModal}>
                                            Create a card
                                    </h4>}
                        <CardModal closeModal = {closeModal} 
                            modal = {modal} 
                            onUploadCard = {onUploadCard} 
                            boardId = {boardId} 
                            column = {column} />
                        </Button>    
                {cards.map((card, index) => {
                    return <Draggable 
                            index = {index} 
                            key = {card._id} 
                            draggableId = {String(card._id)}>
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
                                    borderRadius: '13px',
                                    backgroundColor: snapshot.isDragging ? "lightgrey"
                                    : "#5C5C9A",
                                    color: "black",
                                  ...provided.draggableProps.style
                                }}>
                                <Typography variant = 'button' component = 'h2'> 
                                    {card.title}   
                                </Typography>
                                <Typography component = 'p'>
                                    {card.description}  
                                </Typography>
                                <div className = {classes.icons}>
                                    <IconButton 
                                        onClick = {e => handleDeleteCard(card._id)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </div>
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