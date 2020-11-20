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



const getProductTable = (data, setSelectedData) => {
    return (<ProductTable data={data} onChange={(data) => { setSelectedData(data) }} />)
}


export default function SelectCondition(props) {

    const default_data = [
    { id: 1, date: getCurrentDate().date, total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 2, date: getCurrentDate().date, total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 3, date: getCurrentDate().date, total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 4, date: getCurrentDate().date, total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 5, date: getCurrentDate().date, total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 6, date: getCurrentDate().date, total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 7, date: getCurrentDate().date, total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 8, date: getCurrentDate().date, total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 9, date: getCurrentDate().date, total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
];




    const { product } = props
    const classes = useStyles();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({ rows: [] })
    const [data, setData] = useState(default_data)
    const [displayData, setDisplayData] = useState(data)
    const [filterDate, setFilterDate] = useState({
        begin_date: null,
        end_date: null
    })


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
            const current_date = new Date(e.date)
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
        console.log("result : ", result)
        setDisplayData(result)


    }, [filterDate])




    return (
        <>
            <TopBar>
                <BackButton color={THEME.primary} onClick={() => { console.log("Go back!!") }} />
                <AddButton variant="contained" color="primary" onClick={() => {
                    console.log("Add Record!!");
                    setDialogOpen(true);
                }} >
                    <AddRoundedIcon style={{ fontSize: 32 }} /> <span style={{ marginLeft: 4 }}>เพิ่มตารางบันทึก</span>
                </AddButton>

            </TopBar>
            <TableWrapper>
                <InfoWrapper>
                    <TitleWrapper>
                        <Typography style={{ fontSize: 24, color: THEME.black }} color="primary">
                            รายการ : {product?.name}
                        </Typography>
                        <Typography style={{ fontSize: 24, color: THEME.black }} color="primary">
                            ID :  #{product?.id}
                        </Typography>
                    </TitleWrapper>
                    <DateWrapper>
                        <TextField
                            id="begin_date"
                            InputProps={{
                                className: classes.input,
                            }}
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
                        <IconButton onClick={() => { console.log("Attempt delete record on selected row") }}>
                            <DeleteOutlinedIcon color="error" />
                        </IconButton>
                    </SelectedAlert>
                }
                {/* Table display record of the QC */}
                {console.log( "> hey check!! : ", (displayData == undefined) )}
                {getProductTable(displayData, setSelectedData)}

                {/* Add data dialog */}
                <Dialog
                    open={dialogOpen}
                    onClose={() => { setDialogOpen(false) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

            </TableWrapper>
        </>
    )
}
