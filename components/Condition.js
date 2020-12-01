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
    const [date, setDate] = useState("")
    const [state, setState] = useState([])

    const [displayState, setDisplayState] = useState([])

    // console.log("condition query > ", query)

    const getFunc = async () => {
        await db.collection("information").where("qc_id", "==", parseInt(query?.qc_id)).get().then((q) => {
            let t_state = []
            // console.log("=====>", query.qc_id)
            q.forEach((doc) => {
                console.log(doc.id, " => ", doc.data())
                t_state.push(doc.data())
            })

            setState(t_state)

            
            
            let display = []
            t_state.forEach((e)=>{
                let renew = 0
                let resend = 0
                let blended = 0
                console.log("-------------------")
                console.log(e)
                renew = renew +  ( 
                    e.info_df_nonplating+ 
                    e.info_df_redstain+
                    e.info_df_silverside+
                    e.info_df_rough+
                    e.info_df_chemicaldrop+
                    e.info_df_unrefinedA+
                    e.info_df_unrefinedD+
                    e.info_df_roughside+
                    e.info_df_blisterchem+
                    e.info_df_watermark
                    )

                    console.log("Test > ", e.info_df_nonplating)
                    resend = resend +  ( 
                        e.info_df_chemcavity+ 
                        e.info_df_unclog+
                        e.info_df_scratch+
                        e.info_df_chemicalmark+
                        e.info_df_plasticmark+
                        e.info_df_blisterplastic+
                        e.info_df_blisterlineplastic+
                        e.info_df_dropconvex+
                        e.info_df_drophole
                        
                    )

                    blended = e.info_df_blended
                

                console.log(e.order_no+ " : "+renew, resend, blended)
                const temp_record = {
                    id: e.id,
                    order_no: e.order_no,
                    info_amount_per_set : e.info_amount_per_set,
                    info_tank : e.info_tank,
                    info_production_line : e.info_production_line,
                    info_bar_no : e.info_bar_no,
                    ok: e.info_amount_per_set - (renew+resend+blended),
                    ng: (renew+resend),
                    renew: renew,
                    resend: resend,
                    blended: blended,
                    time: e.info_starttime,
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
                    console.log("Add!!");
                    router.push({ pathname: "/selectProductCondition/record", query: { pid: query.pid, name: query.name, formal_date: query.formal_date, method: "add" } })
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
                <ProductSetTable data={displayState} />
            </TableWrapper>
        </>
    )
}
