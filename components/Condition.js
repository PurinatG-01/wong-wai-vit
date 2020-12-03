import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import BackButton from "./BackButton"
import { THEME } from "./theme"
import { Button, Typography } from "@material-ui/core"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { getCurrentDate } from "./utils"
import ProductSetTable from "./ProductSetTable"
import { useRouter } from "next/router"
import Firebase from "./Firebase"

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

const db = Firebase.firestore();



export default function SelectConditionForm() {

    const router = useRouter();
    const query = router.query;
    const [date, setDate] = useState(query.qc_date)
    const [state, setState] = useState([])

    const [displayState, setDisplayState] = useState([])

    const getFunc = async () => {
        await db.collection("information").where("qc_id", "==", query?.qc_id).get().then((q) => {
            let t_state = []
            q.forEach((doc) => {
                t_state.push(doc.data())
            })
            setState(t_state)
            let display = []
            t_state.forEach((e)=>{   
                const temp_record = {
                    ...e
                }
                display.push(temp_record)
            })
            setDisplayState(display)
        })
    }

    useEffect(() => {
        var date = new Date(query?.qc_date)
        if(query.qc_date){
            setDate((date.getDate()) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
        }else{
            setDate("-/-/-")
        }
        }, [query.qc_date])



    useEffect(async () => {
        if (query.qc_id) {
            await getFunc();
        }
    }, [query.qc_id])

    return (
        <>
            <TopBar>
                <BackButton color={THEME.primary}></BackButton>
                <AddButton variant="contained" color="primary" onClick={() => {
                    console.log("==>>>>Add!!");
                    router.push({ pathname: "/selectProductCondition/record", query: { qc_id: query.qc_id, pid: query.pid, name: query.name, date: query.qc_date, method: "add" } })
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
                    วันที่ :  {date ?? ""}
                </Typography>
                <ProductSetTable qc_date={query.qc_date} detailData={state} data={displayState} />
            </TableWrapper>
        </>
    )
}
