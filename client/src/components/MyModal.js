import React, {useState} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Button, TextField, Typography, Backdrop} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '16px',
        border: '2px solid #3f51b5',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        
    },
    modalbuttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'space-around',
    }
}));

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
        <div className = {classes.backdrop}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modal}
                onClose={closeModal}
                closeAfterTransition
                disableBackdropClick = {true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500, 
                }}
                >
                <Fade in={modal} >
                    <div className={classes.paper}>
                        <Typography>
                            Create a new board!
                        </Typography>
                        <TextField className = {classes.boardBox}
                            id = 'standard-name' 
                            label = 'Write room name..'
                            margin = 'normal'
                            value = {newBoard}
                            onChange = {e => {handleNewBoard(e)}}
                            />
                         <Button className = {classes.button}
                            variant = 'contained' 
                            color = 'primary'
                            onClick = {createBoard}>
                            Create
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
/*
const useStyles = makeStyles({
    backgroundImage: {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#7497B7',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: '0.9'
    },
    grid: {
        direction: 'column',
        alignItems: 'center',
        justifyContent:'center',
        minHeight: '100vh'
    },
    card: {
        width: '650px',
        height: '150px',
        padding: '100px 0px',
        display: 'block',
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0',
        background: 'transparent',
    },
    header: {
        textAlign: 'center',
        color: '#FFFEFF'
    },
    formgrid: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    form: {
        margin: '0',
        fontWeight: 'bold',
        '& label.Mui-input': {
            color: '#FFFEFF'
        },
        '& label.Mui-focused': {
            color: '#FFFEFF'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#FFFEFF',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FFFEFF',
        },
        '& .MuiInput-colorSecondary:after': {
            color: '#FFFEFF',
        },
    },
});

export default function Modal() {
    const classes = useStyles();
    const [boardTitle, updateBoardTitle] = useState('');
    const [boardRedirect, updateBoardRedirect] = useState(false);

    function onSubmit(e) {
        e.preventDefault();
        const data = {title:boardTitle}
        console.log(data);
        
        axios.post('/api/boards/', data)
            .then(response => {
                console.log(response);
                updateBoardTitle(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            updateBoardRedirect(true);
            updateBoardTitle('');
    };

    return boardRedirect ? ( <Redirect to= '/' /> ) : 
     (
        <div className = {classes.backgroundImage}>
        <Grid className = {classes.grid}
            container
            spacing = {0}
            >
            <Card className = {classes.card}
                square
                elevation = {10}
                >
                <CardHeader className = {classes.header}
                    title = 'Create a Board'
                    />
                <Grid className = {classes.header}>
                    <form className = {classes.form}
                        noValidate autoComplete = 'off'
                        onSubmit = {onSubmit}
                    >
                        <TextField className = {classes.textField}
                            required
                            id = 'standard-basic'
                            label = 'Board name...'
                            value = {boardTitle}
                            onChange = {e => updateBoardTitle(e.target.value)}
                            />
                    </form> 
                </Grid> 
            </Card>
        </Grid>
    </div>
     )
}*/