import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import BackButton from "./BackButton"
import { THEME } from "./theme"
import { Button, Typography } from "@material-ui/core"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { getCurrentDate } from "./utils"
import ProductSetTable from "./ProductSetTable"
import { useRouter } from "next/router"

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

const TableWrapper = styled(motion.div)`
    margin-top: 70px;
    width: 100%;
    height: 500px;
`


export default function SelectConditionForm() {
    
    const router = useRouter();
    const query = router.query;

    return (
        <>
            <TopBar>
                <BackButton color={THEME.primary}></BackButton>
                <AddButton variant="contained" color="primary" onClick={() => {
                    console.log("Add!!");
                    router.push({ pathname: "/selectProductCondition/record", query: { pid: query.pid, name: query.name, formal_date: query.formal_date ,method: "add" } })
                }} >
                    <AddRoundedIcon style={{ fontSize: 32 }} /> <span style={{ marginLeft: 4 }}>เพิ่มชุด</span>
                </AddButton>
            </TopBar>
            <TableWrapper>
                <Typography style={{ fontSize: 24, color: THEME.black }} color="primary">
                    รายการ : {query?.name}
                </Typography>
                <Typography style={{ fontSize: 24, color: THEME.black }} color="primary">
                    ID :  #{query?.pid}
                </Typography>
                <Typography style={{ fontSize: 24, color: THEME.black }} color="primary">
                    วันที่ :  {query?.formal_date}
                </Typography>
                <ProductSetTable />
            </TableWrapper>
        </>
    )
}
