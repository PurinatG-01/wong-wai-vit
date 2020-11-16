import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import styled from 'styled-components'

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
});



export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h1" fontWeight="fontWeightBold" m={1}>
            รายการ:
        </Typography>
        <Typography color="textSecondary">
            รหัสสินค้า:
        </Typography>
        <Typography className={classes.pos} variant="h6" component="p">
          รายละเอียด
          <br/>
        </Typography>
        <Typography variant="body1" component="p">
            {"รายละเอียดสินค้า หรือ หมายเหตุที่มีการบันทักไว้"}
        </Typography>
      </CardContent>
    </Card>
  );
}
