import React, { useState } from 'react';
import Card from "./Card";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import styled from "styled-components"
import { motion } from "framer-motion"
import { Typography, Button} from "@material-ui/core"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useRouter } from 'next/router'

const useStyles = makeStyles({
    gridSpace: {
        marginTop: "20px",
    }
});

const defaultState = [
    { name: "Cheese cake", id: "12346", description: "I am something" },
    { name: "Cheese cake", id: "12341", description: "I am something" },
    { name: "Csdfsfdse cake", id: "12342", description: "I am something" },
    { name: "Cheese cake", id: "12344", description: "I am something" },
    { name: "Chsdfscake", id: "12345", description: "I am something" },
    { name: "Cheesesdfsdke", id: "12347", description: "I am something" },
]


const TopBar = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
const AddButton = styled(Button)`
display : flex;
font-size: 20px;
justify-content: flex-start;
`

export default function GridCard() {

    const router = useRouter();
    const [state, setState] = useState(defaultState)
    const classes = useStyles();
    const getGridCard = () => {
        return state.map((element) => {
            return (
                <Grid key={element.id} item xs={12} sm={6} md={4}>
                    <Card data={element} onClick={()=>{router.push("/selectProductCondition")}} />
                </Grid>)
        })
    }

    return (
        <>
            <TopBar>
                    <Typography variant="h3">รายการทั้งหมด</Typography>
                    <AddButton variant="contained" color="primary" onClick={() => { router.push("/addProduct") }} ><AddRoundedIcon style={{fontSize: 32}}/> <span style={{marginLeft: 6}}>เพิ่มรายการ</span></AddButton>
            </TopBar>
            <Grid container spacing={4} className={classes.gridSpace}>
                {getGridCard()}
            </Grid>
        </>
    )
}
