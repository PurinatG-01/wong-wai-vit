import React from 'react'
import Head from 'next/head'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { THEME } from './theme'
import styled from 'styled-components'
import { getCurrentDate } from './utils'
// Scroll App bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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

    }
})

const MainContainer = styled(Container)`
    margin-top: 32px;
`




export default function PageLayout(props) {
    return (
        <MuiThemeProvider theme={theme}>
            <Head>
                <title>Wong wai vit</title>
            </Head>
            <AppBar style={{ height: 80, boxShadow: "none" }} position="static">
                <Toolbar style={{ height: "100%" }}>
                    <Container style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant="h4" style={{fontWeight: 800}}>
                            Wongwaivit QC department
                        </Typography>
                        <Typography variant="h6" style={{fontWeight: 800}}>
                            วันที่ {getCurrentDate()}
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
            <MainContainer>
                {props.children}
            </MainContainer>
        </MuiThemeProvider>


    )
}
