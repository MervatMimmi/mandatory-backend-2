import React, {useState} from 'react';
import axios from 'axios';

import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
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

export default function MyModal(props) {
    const classes = useStyles();

    const {modal, closeModal} = props;

    const [newBoard, setNewBoard] = useState([]);

    function handleNewBoard(e) {
        setNewBoard(e.target.value)
    }

    function createBoard(e) {
        e.preventDefault();
        const data = {title:newBoard}
        console.log(data);
        
        axios.post('/api/boards/', data)
            .then(response => {
                console.log(response);
                props.onUpload(response);
            })
            .catch(error => {
                console.error(error);
            })
            setNewBoard('');
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
                        value = {newBoard}
                        margin = 'dense'
                        id = 'board'
                        label = 'Board Title'
                        type = 'name'
                        fullWidth 
                        onChange = {e => {handleNewBoard(e)}}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick = {createBoard}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
