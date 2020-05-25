import React, { useState, useEffect } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';

import MyModal from './MyModal';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    h4: {
        margin:'20px'
    },
    toolbarMargin: theme.mixins.toolbar,
}));

export default function Header(props){
    const classes = useStyles();
    const theme = useTheme();

    const[drawerOpen, setDrawerOpen] = useState(false);
    const [boards, setBoards] = useState([]);
    const [title, updateTitle] = useState('');
    const [modal, updateModal] = useState(false);

    const openModal = () => updateModal(true)
    const closeModal = () => updateModal(false)


    useEffect(() => {
        handleBoardList();
        }, []);

    function onUpload() {
        handleBoardList();
    }

    function handleBoardList() {
        axios.get('/api/boards')
            .then(response => {
                console.log(response.data);
                
                setBoards(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }
 
    const handleDrawer = (open) => event => {
        console.log('event:' + event.type, event.key);
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
        setDrawerOpen(!drawerOpen, open);
    }

    const onBoardClick = (title) => event => {
        updateTitle(title);
        setDrawerOpen(!drawerOpen);
    }

    const handleDelete = (boardId) => {
        axios.delete('/api/boards/' + boardId)
            .then(response => {
                console.log(response.data);
                setBoards(boards.filter( el => el._id !== boardId))
            })
            .catch(error => {
                console.error(error);
            });
    }

    const drawer = (
        <List>
            {boards.map(board => 
                <ListItem key = {board._id} button onClick = {onBoardClick(board.title)} {...{to:`/board/:id/${board._id}`}} component = {Link}>
                    <ListItemText primary = {board.title}/>
                    <ListItemSecondaryAction>
                        <IconButton aria-label = 'Delete'
                            onClick = {() => {handleDelete(board._id)}}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )}
                
        </List>
    );

    return(
        <div className = {classes.root}>
            <AppBar className = {classes.appBar}
                positon = 'static'
                style = {{background: 'transparent', boxShadow: 'none'}} 
                >
                <Toolbar>
                    <IconButton className = {classes.menuButton}
                        color = 'secondary'
                        aria-label = 'Open Menu'
                        tabIndex = '0'
                        edge = 'start'
                        onClick = {handleDrawer(true)}
                    >
                        <MenuIcon />
                        <nav>
                            <Drawer classes ={{paper: classes.drawerPaper}}
                                tabIndex = '0'
                                variant = 'temporary'
                                anchor = {theme.direction === 'rtl' ? 'right' : 'left'}
                                open = {drawerOpen}
                                role = 'presentation'
                                onClose = {handleDrawer}>
                                <div className = {classes.drawerTopic}>
                                    <h4 className = {classes.h4}>{drawer}</h4>
                                </div>
                            </Drawer>
                        </nav>
                    </IconButton>
                    <Typography className = {classes.flex}
                        variant = 'h6'
                        color = 'secondary'
                        tabIndex = '0'
                    >
                       {title}
                       {!modal && <h4 className = {classes.h4}
                                        onClick = {openModal}>
                                        Create new Board
                                    </h4>}
                                    <MyModal closeModal = {closeModal} modal = {modal} onUpload = {onUpload} />
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className = {classes.toolbarMargin}/>
        </div>
    );
}