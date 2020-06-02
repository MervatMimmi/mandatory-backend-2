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

export default function EditModal(props) {
    
    const classes = useStyles();
    
    const [cardTitle, setCardTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleCardTitle(e) {
        setCardTitle(e.target.value)
    }

    function handleCardDescription(e) {
        setDescription(e.target.value)
    }

    function updateCard(e) {
        e.preventDefault();
        let data = {
            title: cardTitle,
            description: description,
        }

        axios.put(`/api/columns/${props.boardId}/${props.columnId}/cards/${props.cardId}`, data)
            .then(response => {
                console.log(response.data);
                props.onUploadCard(props.columnId, response.data)
                setCardTitle('');
                setDescription('');
            })
            .catch(error => {
                console.error(error)
            });
            setCardTitle('');
            setDescription('');
            props.closeEditModal();
    }

    return(
        <div>
            <Dialog open = {props.editModal}
                onClose = {props.closeEditModal}
                aria-labelledby="form-dialog-title">
                <DialogTitle id = 'form-dialog-title'>Update card {props.cardTitle} </DialogTitle>
                <DialogContent className = {classes.content}>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value = {cardTitle}
                        margin = 'dense'
                        id = 'card'
                        label = {props.cardTitle}
                        type = 'name'
                        fullWidth 
                        onChange = {e => {handleCardTitle(e)}}/>
                    <TextareaAutosize 
                        rowsMin={4}
                        fullWidth
                        aria-label="maximum height"
                        placeholder={props.description}
                        value = {description}
                        onChange = {e => {handleCardDescription(e)}}
                        /> 
                </DialogContent>
                <DialogActions>
                    <Button onClick = {updateCard}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}