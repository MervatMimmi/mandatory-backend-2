import React, {useState, useEffect} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';

import Column from './Column';

const useStyles = makeStyles((theme) => ({
    windowBoard: {
        display: 'flex',
        direction: 'column',
        margin: '10px',        
    },
    form: {
        height: '100px',
        padding: '0 24px',
        margin: '10px',
        borderRadius: '13px',
        background: 'lightgrey',
    },
    column: {
        display: 'flex',
        direction: 'row',
        justify: 'space-around',
        flexGrow: 1,
        //overflow: 'hidden',
        padding: theme.spacing(0,3)
    }
}));

export default function Board(props){
    const classes = useStyles();
    const [title, updateTitle] = useState('');
    const [columns, updateColumns] = useState([]);

    const path = window.location.pathname.split('/');
    const id = path[3];
    
    useEffect(() => {
        getColumns();
    }, [id]);

    function getColumns(){
        axios.get(`/api/columns/${id}`)
            .then(response => {
                console.log(response.data);
                updateColumns(response.data);
            })
            .catch(error => {
                console.error(error)
            });
    }

    function createColumn(e){
        e.preventDefault();
        
        let postData = {title: title}

        axios.post(`/api/columns/${id}`, postData)
            .then(response => {
                console.log(response.data);
                updateTitle(response.data);
                updateTitle('');
                getColumns(); 
            })
            .catch(error => {
                console.error(error)
            });
         
    }

    function handleDeleteColumn(columnId){
        console.log(columnId);
        axios.delete('/api/columns/' + columnId)
            .then(response => {
                console.log(response.data);
                updateColumns(columns.filter(el => el._id !== columnId));
            })
    }

    const onDragEnd = result =>  {
        const {source, destination } = result

        if(!destination) return

        const fromColumner = columns.find(column => column._id === source.droppableId);
        const toColumner = columns.find(column => column._id === destination.droppableId)

        const [element] = fromColumner.cards.splice(source.index, 1)
        toColumner.cards.splice(destination.index, 0, element)
    }

    return(
        <div>
            <Helmet>
                <title>
                    Board
                </title>
            </Helmet>
            
        <div className = {classes.windowBoard}>
            <form onSubmit = {createColumn} className = {classes.form}>
                <TextField className = {classes.listInput}
                    id = 'standard-name'
                    label = 'Create a list'
                    margin = 'normal'
                    value = {title}
                    onChange = {e => updateTitle(e.target.value)} />
            </form>
       
        <div className = {classes.column}>
        <DragDropContext onDragEnd= {onDragEnd(columns, updateColumns)}>
            {columns.map(column => 
                <Column key = {column._id} 
                    boardId = {id} 
                    column = {column} 
                    columns = {columns} 
                    handleDeleteColumn = {handleDeleteColumn}
                    cards = {column.cards}/>  
            )}   
            </DragDropContext>
        </div>
        </div>
        </div>
    );
}