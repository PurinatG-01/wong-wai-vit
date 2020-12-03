import React, { useState, useEffect } from 'react';
import Card from "./Card";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import styled from "styled-components"
import { motion } from "framer-motion"
import { Typography, Button} from "@material-ui/core"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useRouter } from 'next/router'
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Firebase from '../components/Firebase'

const db = Firebase.firestore()

const useStyles = makeStyles({
    gridSpace: {
        marginTop: "20px",
    }
});


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
    const classes = useStyles();
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    
    console.log(products)

    useEffect(async () => {
        let xproducts = []
        await db.collection("products").get().then((query) => {
            query.forEach((doc) => {
                xproducts.push(doc.data()) //get document datas (all fields data)
                console.log(doc.id) //get document id
            })
        })
        setProducts(xproducts)
        setAllProducts(xproducts)
    }, [])

    const searchProduct = (name) => {
        setProducts(allProducts.filter((product) => {
            if(product.name.toLowerCase().includes(name)) {
                return true
            }
            if(product.id.includes(name)) {
                return true
            }
            return false
        }))
    }

    return (
        <>
            <TopBar>
                    <Typography variant="h3">รายการทั้งหมด</Typography>
                    <TextField
                        id="search"
                        margin="normal"
                        size='medium'
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        )
                        }}
                        onChange={(e) => {searchProduct(e.target.value)}}
                    />
                    <AddButton variant="contained" color="primary" onClick={() => { router.push("/addProduct") }} ><AddRoundedIcon style={{fontSize: 32}}/> <span style={{marginLeft: 6}}>เพิ่มรายการ</span></AddButton>
            </TopBar>
            <Grid container spacing={4} className={classes.gridSpace}>
                {products.map((element) => (
                    <Grid key={element.id} item xs={12} sm={6} md={4}>
                        <Card data={element} onClick={()=>{
                            console.log(element);
                            router.push(
                                {pathname: "/selectProductCondition", 
                                query:{
                                    name:element?.name,
                                    id: element?.id,
                            }})

                        }} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}