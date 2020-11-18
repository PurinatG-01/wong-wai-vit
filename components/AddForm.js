import React, { useState } from 'react'
import styled from 'styled-components'
import { Typography, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'
import BackButton from "./BackButton"
import { THEME } from "./theme"
import FormLine from "./FormLine"
import {useRouter} from "next/router"
import Firebase from "./Firebase"

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

export default function AddForm() {

    const router = useRouter();
    const [state, setState] = useState(defaultState)

    const addProduct = () => {
        console.log(state)
        const db = Firebase.firestore()
        db.collection("products").doc(state.id).set(
            state
        ).then(function(ref) {
            alert("added successfully!")
            console.log("added with id "+state.id)
            router.push("/")
        }).catch(function(error) {
            console.log("Error "+error)
        })
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
                <FormLine labelGrid={2} formGrid={10} fieldLabel="ID สินค้า" fieldHelperText="ระบุรหัสสินค้า" value={state.id} onChange={(e) => setState({...state, id: e.target.value})} />
                <FormLine labelGrid={2} formGrid={10} fieldLabel="ชื่อสินค้า" fieldHelperText="ระบุชื่อสินค้า" value={state.name} onChange={(e) => setState({...state, name: e.target.value})} />
                <FormLine labelGrid={2} formGrid={10} fieldLabel="ประเภทสินค้า" fieldHelperText="ระบุประเภทสินค้า" value={state.category} onChange={(e) => setState({...state, category: e.target.value})} />
                <FormLine labelGrid={2} formGrid={10} fieldLabel="จำนวนชุด" fieldHelperText="ระบุจำนวนชุด" value={state.batchamount} onChange={(e) => setState({...state, batchamount: e.target.value})} />
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
        </>
    )
}
