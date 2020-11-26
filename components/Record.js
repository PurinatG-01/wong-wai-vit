import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import BackButton from "./BackButton"
import { THEME } from "./theme"
import SelectConditionForm from "./SelectConditionForm"
import { Typography } from "@material-ui/core"

const MainWrapper = styled(motion.div)`

display: flex;
`
const MainContentWrapper = styled(motion.div)`

`

export default function Record() {
    return (
        <MainWrapper>
        <BackButton color={THEME.primary} style={{ margin: 0 }} />
        <MainContentWrapper>
            <Typography style={{ fontSize: 24, color: THEME.black, marginLeft: 54 }} color="primary">
                สร้างรายการใหม่
            </Typography>

            <SelectConditionForm />
        </MainContentWrapper>
    </MainWrapper>

    )
}
