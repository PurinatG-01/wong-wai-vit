import React from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { THEME } from './theme'
import styled from 'styled-components'
import { getCurrentDate } from './utils'
import Logo from "./Logo"

// Scroll App bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'

// Main theme
const theme = createMuiTheme({
    palette: {
        primary: {
            main: THEME.primary,
            contrastText: THEME.secondary,
        },
        secondary: {
            main: THEME.secondary,
        },

    },
    typography: {
        fontFamily: "Kanit, sans-serif",
        fontWeight: 400,
        h3: {
            fontSize: 30,
        },
    },
    overrides: {
        MuiButton: {
            root: {
                fontSize: '1rem',
                height: 45,
                minWidth: 163,
                borderRadius: 32,
                fontWeight: 200,
            },
        },
    },

})

const MainContainer = styled(Container)`
    margin-top: 55px;
`

export default function PageLayout(props) {
    const router = useRouter()
    return (
        <MuiThemeProvider theme={theme}>
            <Head>
                <title>Wongwaivit QC department</title>
                <link rel="icon" href="/logo_1.svg" />
            </Head>
            <AppBar style={{ height: 87, boxShadow: "none" }} position="static">
                <Toolbar style={{ height: "100%" }}>
                    <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography  style={{ fontSize: 36,height: "100%", display: "flex", alignItems: "center" }}>
                            <Logo />
                            &nbsp; Wongwaivit QC department
                        </Typography>
                        <Typography  style={{ fontSize: 18}}>
                            วันที่ {getCurrentDate().formalDate}
                        </Typography>
                        <Button variant="outlined" size="small" color="secondary" onClick={() => router.push("/showSummary")}>View Summary</Button>
                    </Container>
                </Toolbar>
            </AppBar>
            <MainContainer>
                {props.children}
            </MainContainer>
        </MuiThemeProvider>


    )
}
