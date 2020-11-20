import React from 'react'
import PageLayout from "../../components/PageLayout"
import styled from 'styled-components'
import { motion } from 'framer-motion'
import BackButton from "../../components/BackButton"
import { THEME } from "../../components/theme"
import SelectConditionForm from "../../components/SelectConditionForm"
import { Typography } from "@material-ui/core"

const TopBar = styled(motion.div)`
display: flex;
align-items: center;
width: 100%;
`
const MainWrapper = styled(motion.div)`

display: flex;
`
const MainContentWrapper = styled(motion.div)`

`
export default function newSet() {
    return (
        <PageLayout>
            <MainWrapper>
                <BackButton color={THEME.primary} style={{ margin: 0 }} />
                <MainContentWrapper>
                    <Typography style={{ fontSize: 24, color: THEME.black, marginLeft: 54 }} color="primary">
                        สร้างรายการใหม่
                    </Typography>

                    <SelectConditionForm />
                </MainContentWrapper>
            </MainWrapper>


        </PageLayout>
    )
}
