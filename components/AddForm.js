import React from 'react'
import styled from 'styled-components'
import { Typography, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'
import BackButton from "./BackButton"
import { THEME } from "./theme"
import FormLine from "./FormLine"

const TopBar = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

export default function AddForm() {

    return (
        <>
            <TopBar>
                <BackButton color={THEME.primary} onClick={() => { console.log("Go back!!") }} />
                <div style={{marginLeft: "20px"}}>
                    <Typography variant="h3">สร้างรายการใหม่</Typography>
                </div>
            </TopBar>
            <Grid container spacing={3} style={{marginTop: "20px"}}>
                <FormLine labelGrid={2} formGrid={10} fieldLabel="ID สินค้า" fieldHelperText="ระบุรหัสสินค้า" />
                <FormLine labelGrid={2} formGrid={10} fieldLabel="ชื่อสินค้า" fieldHelperText="ระบุชื่อสินค้า" />
                <FormLine labelGrid={2} formGrid={10} fieldLabel="ประเภทสินค้า" fieldHelperText="ระบุประเภทสินค้า" />
                <FormLine labelGrid={2} formGrid={10} fieldLabel="จำนวนชุด" fieldHelperText="ระบุจำนวนชุด" />
                <FormLine labelGrid={12} formGrid={12} fieldLabel="คำอธิบายสินค้า" fieldHelperText="ไม่จำเป็นต้องกรอก" extraConfig={{ 'multiline': true, 'rows': '5'}} />
                <FormLine labelGrid={12} formGrid={12} fieldLabel="หมายเหตุ" fieldHelperText="ไม่จำเป็นต้องกรอก" extraConfig={{ 'multiline': true, 'rows': '5'}} />
            </Grid>
            <Grid style={{marginTop: "30px", marginBottom: "2rem"}}>
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary">
                        บันทึก
                    </Button>
                    <Button variant="contained" color="secondary" style={{marginLeft: "15px"}}>
                        ยกเลิก
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
