import React from 'react'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Button, IconButton } from '@material-ui/core';
import { THEME } from "./theme"
import BackButton from "./BackButton"
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const SelectConditionWrapper = styled(motion.div)``

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



export default function SelectCondition() {
    return (
        <SelectConditionWrapper>
            <TopBar>
                <BackButton color={THEME.primary} onClick={() => { console.log("Go back!!") }} />
                <AddButton variant="contained" color="primary" onClick={() => { console.log("Add!!") }} ><AddRoundedIcon style={{fontSize: 32}}/> <span style={{marginLeft: 24}}>เพิ่มชุด</span></AddButton>
            </TopBar>
        </SelectConditionWrapper>
    )
}
