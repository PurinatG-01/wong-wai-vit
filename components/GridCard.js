import React, {useState} from 'react';
import Card from "./Card";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";


const useStyles = makeStyles({
    gridSpace: {
        marginTop: "20px",
    }
});

const defaultState = [
    {name: "Cheese cake", id: "12346", description: "I am something"},
    {name: "Cheese cake", id: "12341", description: "I am something"},
    {name: "Cheese cake", id: "12342", description: "I am something"},
    {name: "Cheese cake", id: "12344", description: "I am something"},
    {name: "Cheese cake", id: "12345", description: "I am something"},
    {name: "Cheese cake", id: "12347", description: "I am something"},
    ]


export default function GridCard() {
    
        
    const [state, setState] = useState(defaultState)
    const classes = useStyles();
    const getGridCard = () =>{
        return state.map((element)=>{
            return (
            <Grid key={element.id} item xs={12} sm={6} md={4}>
                <Card />
            </Grid>)
        })
    }
    
    return (
        <Grid container spacing={4} className={classes.gridSpace}>
            {getGridCard()}
        </Grid>
    )
}
