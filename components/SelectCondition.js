import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { IconButton, Button, Typography, TextField, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { THEME } from "./theme"
import BackButton from "./BackButton"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ProductTable from './ProductTable'
import { useRouter } from 'next/router'
import { Alert, AlertTitle } from '@material-ui/lab';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

// Local css for date field and alert
const useStyles = makeStyles({
    input: {
        borderRadius: 30,
    },
    message: {
        width: "100%"
    }
})

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

const TitleWrapper = styled(motion.div)`

`

const DateWrapper = styled(motion.div)`
display: flex;
align-items: center;
justify-content: space-around;
`
const InfoWrapper = styled(motion.div)`
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

export default function SelectCondition(props) {
    const classes = useStyles();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([])
    const [product, setProduct] = useState({
        name: "Frozen Yoghurt",
        id: "136784"
    })

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
                            รายการ : {product.name}
                        </Typography>
                        <Typography style={{ fontSize: 24, color: THEME.black }} color="primary">
                            ID :  #{product.id}
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
                        />
                    </DateWrapper>

                </InfoWrapper>
                
                {/* Select to delete message */}
                {selectedData?.rowIds.length == 0 ? <></> :
                    <SelectedAlert InputProps={{ message: classes.message }} icon={false} severity="error" style={{ marginTop: 20 }}>
                        <div>{selectedData?.rowIds.length}&nbsp; รายการที่เลือกอยู่</div>
                        <IconButton onClick={() => { console.log("Attempt delete record on selected row") }}>
                            <DeleteOutlinedIcon color="error" />
                        </IconButton>
                    </SelectedAlert>
                }

                {/* Table display record of the QC */}
                <ProductTable onChange={(data) => { setSelectedData(data) }} />

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
