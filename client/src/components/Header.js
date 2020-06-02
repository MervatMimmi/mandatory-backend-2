import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';

import MyModal from './MyModal';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        color: '#FFFEF2',
    },
    flex: {
        color: '#FFFEF2',
        flexGrow: 1 , 
       
    },
    column: {
        margin:'20px',
        
    },
    button: {
        color: '#FFFEF2',
    },
    title: {
        marginRight : '35vw',
    },
    h4: {
        color: '#FFFEF2',
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
                //console.log(response.data);
                setBoards(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }
 
    const handleDrawer = (open) => event => {
        //console.log('event:' + event.type, event.key);
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
                //console.log(response.data);
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
        <div >
            <AppBar className = {classes.appBar}
                color = 'transparent'
                elevation = {0} 
                >
                <Toolbar className = {classes.toolbar}>
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
                                    <h4 className = {classes.column}>{drawer}</h4>
                                </div>
                            </Drawer>
                        </nav>
                    </IconButton>
                    <Typography className = {classes.flex}
                        variant = 'h6'
                        tabIndex = '0'
                    > Trello-like App
                    </Typography>
                    <Button className = {classes.button}>
                        <h2 className = {classes.title}>{title}</h2>
                        {!modal && <h4 className = {classes.h4}
                                            onClick = {openModal}>
                                            Create a new board
                                    </h4>}
                        <MyModal closeModal = {closeModal} 
                            modal = {modal} 
                            onUpload = {onUpload} />
                    </Button>
                </Toolbar>
            </AppBar>
            <div className = {classes.toolbarMargin}/>
        </div>
    );
}