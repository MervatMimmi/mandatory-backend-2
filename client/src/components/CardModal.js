import React, {useState} from 'react';
import axios from 'axios';

import {Button, TextField, TextareaAutosize, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    content: {
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
});

export default function CardModal({modal,closeModal, boardId, column, onUploadCard}) {
    const classes = useStyles();

    const [cardTitle, setCardTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleCardTitle(e) {
        setCardTitle(e.target.value)
    }

    function handleCardDescription(e) {
        setDescription(e.target.value)
    }

    function createCard(e) {
        e.preventDefault();
        let data = {
            title: cardTitle,
            description: description,
        }

        axios.post(`/api/columns/${boardId}/${column._id}/cards`, data)
            .then(response => {
                console.log(response.data);
                onUploadCard(column._id, response.data)
                setCardTitle('');
                setDescription('');
            })
            .catch(error => {
                console.error(error)
            });
            setCardTitle('');
            setDescription('');
            closeModal();
    }

    return(
        <div>
            <Dialog open = {modal}
                onClose = {closeModal}
                aria-labelledby="form-dialog-title">
                <DialogTitle id = 'form-dialog-title'>Board name:</DialogTitle>
                <DialogContent className = {classes.content}>
                    <DialogContentText>
                        To create a board, please enter a title
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value = {cardTitle}
                        margin = 'dense'
                        id = 'card'
                        label = 'Card Title'
                        type = 'name'
                        fullWidth 
                        onChange = {e => {handleCardTitle(e)}}/>
                    <TextareaAutosize 
                        rowsMin={4}
                        fullWidth
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        value = {description}
                        onChange = {e => {handleCardDescription(e)}}
                        /> 
                </DialogContent>
                <DialogActions>
                    <Button onClick = {createCard}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}