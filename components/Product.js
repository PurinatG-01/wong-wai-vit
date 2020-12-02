import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { IconButton, Button, Typography, TextField, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { THEME } from "./theme"
import BackButton from "./BackButton"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ProductTable from './ProductTable'
import { useRouter } from 'next/router'
import { Alert, AlertTitle } from '@material-ui/lab';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { getCurrentDate, extractData } from "./utils"
import Grid from '@material-ui/core/Grid'
import Firebase from "./Firebase"

// Local css for date field and alert
const useStyles = makeStyles({
    input: {
        borderRadius: 30,
    },
    message: {
        width: "100%"
    }
})

const TopBar = styled.div`
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

const TableWrapper = styled.div`
    margin-top: 70px;
    width: 100%;
    height: 500px;
`

const TitleWrapper = styled.div`

`

const DateWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
`
const InfoWrapper = styled.div`
display:flex;
justify-content: space-between;
`

const SelectedAlert = styled(Alert)`

&&{

    .MuiAlert-message{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

    }
}
`


const db = Firebase.firestore()


export default function SelectCondition(props) {


    const classes = useStyles();
    const router = useRouter();
    const query = router.query;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({ rows: [] })
    const [data, setData] = useState([])
    const [displayData, setDisplayData] = useState(data)
    const [filterDate, setFilterDate] = useState({
        begin_date: null,
        end_date: null
    })

    const getFunc = async () => {
        await db.collection("records").where("pid", "==", parseInt(query.id)).get().then((q) => {
            let state = []
            // console.log("=====>", query.id)
            q.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data())
                state.push(doc.data())
            })

            // console.log("state from retreive >")
            // console.log(state)
            setData(state)
            setDisplayData(state)
        })

    }

    const deleteFunc = async (id, last, callback) => {
        await db.collection("records").doc(id).delete().then(() => {
            if (last) {
                callback()
            }
        })
    }


    useEffect(() => {
        let begin_date
        let end_date
        let temp_data = data
        let result = []
        if (filterDate.begin_date) {
            begin_date = new Date(filterDate.begin_date)
        }
        if (filterDate.end_date) {

            end_date = new Date(filterDate.end_date)
        }
        // console.log("> begin_date :", begin_date)
        // console.log("> end_date : ", end_date)
        result = temp_data.filter((e) => {
            const current_date = new Date(e.qc_date)
            // console.log(current_date)
            if (begin_date == undefined && !(end_date == undefined)) {
                return current_date <= end_date
            } else if (!(begin_date == undefined) && end_date == undefined) {
                return current_date >= begin_date
            } else if (!(begin_date == undefined) && !(end_date == undefined)) {
                return (current_date <= end_date && current_date >= begin_date)
            } else {
                return true
            }
        })
        setDisplayData(result)


    }, [filterDate])


    // Retreive data 
    useEffect(async () => {
        await getFunc()
    }, [query?.id])


    return (
        <>
            <TopBar>
                <BackButton color={THEME.primary} />
                <AddButton variant="contained" color="primary" onClick={() => {
                    // console.log("Add Record!!");
                    setDialogOpen(true);
                }} >
                    <AddRoundedIcon style={{ fontSize: 32 }} /> <span style={{ marginLeft: 4 }}>เพิ่มตารางบันทึก</span>
                </AddButton>

            </TopBar>
            <TableWrapper>
                <InfoWrapper>
                    <TitleWrapper>
                        <Typography style={{ fontSize: 24, color: THEME.black }} color="primary">
                            รายการ : {query?.name}
                        </Typography>
                        <Typography style={{ fontSize: 24, color: THEME.black }} color="primary">
                            ID :  #{query?.id}
                        </Typography>
                    </TitleWrapper>
                    <DateWrapper>
                        <TextField
                            id="begin_date"
                            InputProps={{
                                className: classes.input,
                            }}
                            format="dd/MM/yyyy"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={filterDate.begin_date ?? ""}
                            onChange={(e) => { extractData(e, filterDate, setFilterDate) }}
                        />
                        <span style={{ margin: "0 20px", textAlgin: "center", fontSize: 24 }}>ถึง</span>
                        <TextField
                            id="end_date"
                            InputProps={{
                                className: classes.input,
                            }}
                            format="dd/MM/yyyy"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={filterDate.end_date ?? ""}
                            onChange={(e) => { extractData(e, filterDate, setFilterDate) }}
                        />
                        <Button onClick={() => { setFilterDate({ begin_date: null, end_date: null }) }} style={{ marginLeft: 20 }} color="primary" variant="contained" >รีเซ็ต</Button>
                    </DateWrapper>
                </InfoWrapper>

                {/* Select to delete message */}
                {selectedData.rows?.length == 0 ? <></> :
                    <SelectedAlert InputProps={{ message: classes.message }} icon={false} severity="error" style={{ marginTop: 20 }}>
                        <div>{selectedData?.rows?.length}&nbsp; รายการที่เลือกอยู่</div>
                        <IconButton onClick={async () => {
                            // console.log(selectedData.rows)
                            let i = 0
                            selectedData.rows.forEach((e) => {
                                i++
                                deleteFunc(e.id, (i == selectedData.rows.length), getFunc)
                            })
                            // console.log("Attempt delete record on selected row")
                        }}>
                            <DeleteOutlinedIcon color="error" />
                        </IconButton>
                    </SelectedAlert>
                }
                {/* Table display record of the QC */}
                <ProductTable product={query} data={displayData} onChange={(data) => { setSelectedData(data) }} />

                {/* Add data dialog */}
                <Dialog
                    open={dialogOpen}
                    onClose={() => { setDialogOpen(false) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">คุณต้องการที่จะเพิ่มตารางบันทึกใช่หรือไม่?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="Adding Record">
                            <Button variant="contained" color="primary" onClick={() => {

                                const ref = db.collection("records").doc()
                                const curDate = new Date();
                                const date = curDate.toISOString().substring(0,10)

                                ref.set({
                                    id: ref.id,
                                    pid: parseInt(query?.id),
                                    qc_blended_frame: 0,
                                    qc_date: date,
                                    qc_id: ref.id,
                                    qc_ng_renew: 0,
                                    qc_ng_resend: 0,
                                    qc_total_ng: 0,
                                    qc_total_ok: 0,
                                    qc_total_set: 0,

                                })
                                router.push({
                                    pathname: "/selectProductCondition/condition",
                                    query: {
                                        pid: parseInt(query.id),
                                        name: query.name ?? "",
                                        qc_date: date,
                                        qc_id: ref.id,
                                        id: ref.id,
                                    }
                                })

                            }}>เพิ่ม</Button>
                            <Button varaint="contained" onClick={() => { setDialogOpen(false) }}>ยกเลิก</Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

            </TableWrapper>
            <Grid container justify="flex-end">
                <Button variant="contained" color="primary" onClick={() => {
                        // console.log("Add Record!!");
                        router.push({
                            pathname: "/showSummary/summary"
                        })
                    }} >
                    <span>สรุป</span>
                </Button>
            </Grid>
        </>
    )
}
