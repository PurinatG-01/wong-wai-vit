import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import styled from 'styled-components'
import { THEME } from './theme'
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import Firebase from "./Firebase"

// For card
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'

// For Icon button
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton, Modal, Backdrop, Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    trash: {
        color: "red"
    },
    edit: {
        color: THEME.primary
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 5, 5),
    },
}));

const buttonColor = makeStyles({
    mySvgStyle: {
        color: THEME.delete
    }
});

const ProductCard = styled(Card)`
    border: 1px solid ${THEME.primary};
    border-radius: 28px;
`

export default function SimpleCard(props) {
    const { data, onClick } = props
    const classes = useStyles();
    const button = buttonColor();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        const db = Firebase.firestore()
        db.collection("products").doc(selectedItem.id).delete().then(function() {
            console.log("Document successfully deleted!");
            router.push("/");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <motion.div whileHover={{ scale: 1.1 }}>
            <ProductCard onClick={onClick}>
                <CardContent>
                    <Typography variant="h5" component="h1" fontWeight="fontWeightBold" m={1}>
                        รายการ: {data.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        รหัสสินค้า: {data.id}
                    </Typography>
                    <Typography className={classes.pos} variant="h6" component="p">
                        รายละเอียด
          <br />
                    </Typography>
                    <Typography className={classes.pos} variant="body1" component="p">
                        {data.description}
                    </Typography>
                    <Grid container justify="flex-end">
                        <IconButton IconButton color="primary" aria-label="edit" onClick={(e) => { e.stopPropagation();router.push({ pathname: "/editProduct/"+data.id, }) }}>
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton className={button.mySvgStyle} aria-label="delete" onClick={(e) => { e.stopPropagation();setOpen(true);setSelectedItem(data) }}>
                            <DeleteOutlineRoundedIcon />
                        </IconButton>
                    </Grid>
                </CardContent>
            </ProductCard>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={4} className={classes.paper} align="center" style={{padding: "40px"}}>
                            <h2 id="transition-modal-title">Do you want to delete {selectedItem.name} ?</h2>
                            <Button variant="outlined" size="small" color="primary" onClick={handleDelete}>Delete</Button>
                            <Button variant="outlined" size="small" color="primary" onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </motion.div>
    );
}
