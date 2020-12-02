import React, { useState, useEffect } from 'react'

// Material UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';

// Chart.js
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Motion and Styles
import styled from "styled-components"
import { motion } from "framer-motion"


const TopBar = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const allData = {
    labels: ['ของที่ใช้ได้ทั้งหมด', 'ของเสียทั้งหมด'],
    datasets: [
      {
        backgroundColor: [
          '#36a3eb',
          'red'
        ],
        data: [65, 59]
      }
    ]
  }

const dataSeparate = {
    labels: ['ล้างชุบใหม่', 'ล้างส่งคืน', 'งานผิดรูป'],
    datasets: [
      {
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a3eb'
        ],
        data: [65, 59, 80]
      }
    ]
}

export default function showSummary() {
    return (
        <>
            <TopBar>
                <Typography variant="h3">สรุปรายการ</Typography>
            </TopBar>
            <Grid container spacing={2}>
                <Grid item xs = {6}>
                    <Pie
                        data={allData}
                        options={{
                            title:{
                                display:true,
                                text:'รวมทั้งหมด',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            },
                            plugins: {
                                datalabels: {
                                  display: true,
                                  backgroundColor: '#fff',
                                  borderRadius: 3,
                                  font: {
                                    size: 18,
                                  },
                                  color: '#000'
                                },
                            }
                        }}
                    />
                    <Box m={2} pt={3}>
                        <Typography variant="h5" align="center"> ทั้งหมด X ชิ้น </Typography>
                    </Box>
                </Grid>
                <Grid item xs ={6} >
                    <Pie
                        data={dataSeparate}
                        options={{
                            title:{
                                display:true,
                                text:'ของเสียแต่ละประเภท',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            },
                            plugins: {
                                datalabels: {
                                  display: true,
                                  backgroundColor: '#fff',
                                  borderRadius: 3,
                                  font: {
                                    size: 18,
                                  },
                                  color: '#000'
                                },
                            }
                        }}
                    />
                    <Box m={2} pt={3}>
                        <Typography variant="h5" align="center"> ทั้งหมด X ชิ้น </Typography>
                    </Box>
                </Grid>
            </Grid>
            
        </>
    )
}