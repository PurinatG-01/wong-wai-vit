import React, { useState } from 'react'
import styled from 'styled-components'
import { Typography, Grid, Button, Modal, Backdrop, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'
import BackButton from "./BackButton"
import { THEME } from "./theme"
import FormLine from "./FormLine"
import {useRouter} from "next/router"
import Firebase from "./Firebase"

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

const defaultState = 
    {
        id: "",
        name: "",
        category: "",
        batchamount: "",
        description: "",
        note: ""
    }

const defaultErrorState = 
    {
        id: false,
        name: false,
        category: false,
        batchamount: false
    }

export default function AddForm() {

    const router = useRouter();
    const [state, setState] = useState(defaultState)
    const [open, setOpen] = useState(false);
    const [errorState, setErrorState] = useState(defaultErrorState);
    const classes = useStyles();
    const idInput = React.createRef(), nameInput = React.createRef(), categoryInput = React.createRef(), batchAmountInput = React.createRef();

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        router.push("/")
        setOpen(false);
    };

    const validateField = (field) => {
        console.log(state[field])
        !state[field] ? setErrorState(prev => ({...prev, [field]: true})) : setErrorState(prev => ({...prev, [field]: false}))
    }
    
    const validateSubmitForm = () => {
        if(!state.batchamount) { setErrorState(prev => ({...prev, batchamount: true})); batchAmountInput.current.focus() } else { setErrorState(prev => ({...prev, batchamount: false})) }
        if(!state.category) { setErrorState(prev => ({...prev, category: true})); categoryInput.current.focus() } else { setErrorState(prev => ({...prev, category: false})) }
        if(!state.name) { setErrorState(prev => ({...prev, name: true})); nameInput.current.focus() } else { setErrorState(prev => ({...prev, name: false})) }
        if(!state.id) { setErrorState(prev => ({...prev, id: true})); idInput.current.focus() } else { setErrorState(prev => ({...prev, id: false})) }
        console.log(errorState)
        if(state.id && state.name && state.category && state.batchamount) return true
        return false
    }

    const addProduct = () => {
        if(validateSubmitForm()) {
            console.log(state)
            const db = Firebase.firestore()
            db.collection("products").doc(state.id).set(
                state
            ).then(function(ref) {
                //alert("added successfully!")
                console.log("added with id "+state.id)
                handleOpen()
                //router.push("/")
            }).catch(function(error) {
                console.log("Error "+error)
            })
        }
    }

    return (
        <>
            <TopBar>
                <BackButton color={THEME.primary} onClick={() => { console.log("Go back!!") }} />
                <div style={{marginLeft: "20px"}}>
                    <Typography variant="h3">สร้างรายการใหม่</Typography>
                </div>
            </TopBar>
            <Grid container spacing={3} style={{marginTop: "20px"}}>
                <FormLine inputRef={idInput} error={errorState.id} labelGrid={2} formGrid={10} fieldLabel="ID สินค้า" fieldHelperText="ระบุรหัสสินค้า" value={state.id} onChange={(e) => {setState({...state, id: e.target.value});validateField("id");}} />
                <FormLine inputRef={nameInput} error={errorState.name} labelGrid={2} formGrid={10} fieldLabel="ชื่อสินค้า" fieldHelperText="ระบุชื่อสินค้า" value={state.name} onChange={(e) => {setState({...state, name: e.target.value});validateField("name");}} />
                <FormLine inputRef={categoryInput} error={errorState.category} labelGrid={2} formGrid={10} fieldLabel="ประเภทสินค้า" fieldHelperText="ระบุประเภทสินค้า" value={state.category} onChange={(e) => {setState({...state, category: e.target.value});validateField("category");}} />
                <FormLine inputRef={batchAmountInput} error={errorState.batchamount} labelGrid={2} formGrid={10} fieldLabel="จำนวนชุด" fieldHelperText="ระบุจำนวนชุด" value={state.batchamount} onChange={(e) => {setState({...state, batchamount: e.target.value});validateField("batchamount");}} />
                <FormLine labelGrid={12} formGrid={12} fieldLabel="คำอธิบายสินค้า" fieldHelperText="ไม่จำเป็นต้องกรอก" value={state.description} onChange={(e) => setState({...state, description: e.target.value})} extraConfig={{ 'multiline': true, 'rows': '5',variant: "outlined"}} />
                <FormLine labelGrid={12} formGrid={12} fieldLabel="หมายเหตุ" fieldHelperText="ไม่จำเป็นต้องกรอก" value={state.note} onChange={(e) => setState({...state, note: e.target.value})} extraConfig={{ 'multiline': true, 'rows': '5',variant: "outlined"}} />
            </Grid>
            <Grid style={{marginTop: "30px", marginBottom: "2rem"}}>
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" onClick={() => {addProduct()}}>
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
                            <h2 id="transition-modal-title">Added successfully!</h2>
                            <Button variant="outlined" size="small" color="primary" onClick={handleClose}>Close</Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </>
    )
}
