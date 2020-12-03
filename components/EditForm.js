import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Typography, Grid, Button, Modal, Backdrop, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'
import BackButton from "./BackButton"
import { THEME } from "./theme"
import FormLine from "./FormLine"
import {useRouter} from "next/router"
import Firebase from "./Firebase"

const db = Firebase.firestore()

const useStyles = makeStyles((theme) => ({
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

const TopBar = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

const defaultErrorState = 
    {
        id: false,
        name: false,
        customer: false,
    }

export default function EditForm() {


    //console.log(productData)

    const router = useRouter();
    const [state, setState] = useState({})
    const [originalId, setOriginalId] = useState()
    const [open, setOpen] = useState(false);
    const [errorState, setErrorState] = useState(defaultErrorState);
    const classes = useStyles();
    const idInput = React.createRef(), nameInput = React.createRef(), customerInput = React.createRef(), batchAmountInput = React.createRef();

    useEffect(async () => {
        let productData = []
        await db.collection("products").doc(router.query.id).get().then((doc) =>
            productData.push(doc.data())
        )
        setState(productData[0])
        setOriginalId(productData[0].id)
        console.log("Called")
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };

    //console.log(state)
    
    const handleClose = () => {
        router.push("/")
        setOpen(false);
    };

    const validateField = (field) => {
        !state[field] ? setErrorState(prev => ({...prev, [field]: true})) : setErrorState(prev => ({...prev, [field]: false}))
    }
    
    const validateSubmitForm = () => {
        if(!state.customer) { setErrorState(prev => ({...prev, customer: true})); customerInput.current.focus() } else { setErrorState(prev => ({...prev, customer: false})) }
        if(!state.name) { setErrorState(prev => ({...prev, name: true})); nameInput.current.focus() } else { setErrorState(prev => ({...prev, name: false})) }
        if(!state.id) { setErrorState(prev => ({...prev, id: true})); idInput.current.focus() } else { setErrorState(prev => ({...prev, id: false})) }
        console.log(errorState)
        if(state.id && state.name && state.customer) return true
        return false
    }

    const saveProduct = () => {
        if(validateSubmitForm()) {
            console.log(originalId)
            db.collection("products").doc(originalId).delete().then(function() {
                console.log("Document successfully deleted!");
                db.collection("products").doc(state.id).set(
                    state
                ).then(function(ref) {
                    //alert("added successfully!")
                    console.log("update with id "+state.id)
                    handleOpen()
                    //router.push("/")
                }).catch(function(error) {
                    console.log("Error "+error)
                })
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
    }

    return (
        <>
            <TopBar>
                <BackButton color={THEME.primary} onClick={() => { console.log("Go back!!") }} />
                <div style={{marginLeft: "20px"}}>
                    <Typography variant="h3">แก้ไขรายการสินค้า</Typography>
                </div>
            </TopBar>
            <Grid container spacing={3} style={{marginTop: "20px"}}>
                <FormLine inputRef={idInput} error={errorState.id} labelGrid={2} formGrid={10} fieldLabel="ID สินค้า" fieldHelperText="ระบุรหัสสินค้า" value={state.id} onChange={(e) => {setState({...state, id: e.target.value});validateField("id");}} extraConfig={{'value': state.id}} />
                <FormLine inputRef={nameInput} error={errorState.name} labelGrid={2} formGrid={10} fieldLabel="ชื่อสินค้า" fieldHelperText="ระบุชื่อสินค้า" value={state.name} onChange={(e) => {setState({...state, name: e.target.value});validateField("name");}} extraConfig={{'value': state.name}} />
                <FormLine inputRef={customerInput} error={errorState.customer} labelGrid={2} formGrid={10} fieldLabel="ชื่อลูกค้า" fieldHelperText="ระบุชื่อลูกค้า" value={state.customer} onChange={(e) => {setState({...state, customer: e.target.value});validateField("customer");}} extraConfig={{'value': state.customer}} />
                <FormLine labelGrid={12} formGrid={12} fieldLabel="คำอธิบายสินค้า" fieldHelperText="ไม่จำเป็นต้องกรอก" value={state.description} onChange={(e) => setState({...state, description: e.target.value})} extraConfig={{ 'multiline': true, 'rows': '5',variant: "outlined",'value': state.description}} />
            </Grid>
            <Grid style={{marginTop: "30px", marginBottom: "2rem"}}>
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" onClick={() => {saveProduct()}}>
                        บันทึก
                    </Button>
                    <Button variant="contained" color="secondary" style={{marginLeft: "15px"}} onClick={()=>{router.back()}}>
                        ยกเลิก
                    </Button>
                </Grid>
            </Grid>
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
                            <h2 id="transition-modal-title">Update successfully!</h2>
                            <Button variant="outlined" size="small" color="primary" onClick={handleClose}>Close</Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </>
    )
}
