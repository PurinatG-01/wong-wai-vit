import React from 'react'
import { Typography, Grid, TextField, Container } from '@material-ui/core'
import styled from 'styled-components'

export default function FormLine(props) {

    const {labelGrid, formGrid} = props
    
    return (
        <>
            <Grid item xs={labelGrid} style={{marginTop: "15px", marginBottom: "15px"}}>
                    <Typography variant="h6">{props.fieldLabel} : </Typography>
            </Grid>
            <Grid item xs={formGrid} style={{marginTop: "15px", marginBottom: "15px"}}>
                    <TextField id="standard-basic" helperText={props.fieldHelperText} fullWidth {...props.extraConfig}  />
            </Grid>
        </>
    )
}
