import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import styled from 'styled-components'
import { THEME }from './theme'

// For card
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'

// For Icon button
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    trash: {
        color: "red"
    },
    edit: {
        color: THEME.primary
    }
});

const buttonColor = makeStyles({
    mySvgStyle:{
        color: THEME.delete
    }
});

const ProductCard = styled(Card)`
    border: 1px solid ${THEME.primary};
`

export default function SimpleCard(props) {
    const {data} = props
  const classes = useStyles();
  const button = buttonColor();

  return (
    <ProductCard>
      <CardContent>
        <Typography variant="h5" component="h1" fontWeight="fontWeightBold" m={1}>
            รายการ: {data.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            รหัสสินค้า: {data.id}
        </Typography>
        <Typography className={classes.pos} variant="h6" component="p">
          รายละเอียด
          <br/>
        </Typography>
        <Typography className={classes.pos} variant="body1" component="p">
            {data.description}
        </Typography>
        <Grid container justify="flex-end">
            <IconButton IconButton color="primary" aria-label="edit" onClick={() => { alert('edit') }}>
                <EditRoundedIcon/>
            </IconButton>
            <IconButton className={button.mySvgStyle} aria-label="delete" onClick={() => { alert('delete') }}>
                <DeleteOutlineRoundedIcon/>
            </IconButton>
        </Grid>
      </CardContent>
    </ProductCard>
  );
}
