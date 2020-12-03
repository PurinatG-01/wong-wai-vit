import React, { useState, useEffect } from 'react'

import Firebase from "./Firebase"

// Material UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Chart.js
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Motion and Styles
import styled from "styled-components"
import { motion } from "framer-motion"

const db = Firebase.firestore()


const TopBar = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const getSummaryData = async () => {
    let ok = 0
    let ng = 0
    await db.collection("records")
    .get()
    .then((q) => {
        q.forEach((record) => {
            //console.log(record.data().qc_total_ok)
            ok += record.data().qc_total_ok
            ng += record.data().qc_total_ng
        })
    })
    console.log([ok, ng])
    return [ok, ng]
}

let allData = {
    labels: ['ของที่ใช้ได้ทั้งหมด', 'ของเสียทั้งหมด'],
    datasets: [
      {
        backgroundColor: [
          '#36a3eb',
          'red'
        ],
        data: [0,0]
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

function createData(productname, ok, ng, rework, resend, bend) {
    return { productname, ok, ng, rework, resend, bend };
}
  
const rows = [
    createData('ชุบของใหม่', 159, 6, 24, 4, 5),
    createData('ล้างชุบใหม่', 237, 9, 37, 4, 3),
    createData('เปอร์เซ็นต์', 262, 16, 24, 6, 2),
];

export default function showSummary() {
    const [countItems, setCountItems] = useState();

    useEffect(() => {
        getSummaryData().then((res) => {allData.datasets[0].data = res; setCountItems(res[0]+res[1])})
    })

    return (
        <>
            <TopBar>
                <Typography variant="h3">สรุปรายการ</Typography>
            </TopBar>
            { /* Charts */ }
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
                        <Typography variant="h5" align="center"> ทั้งหมด {countItems} ชิ้น </Typography>
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
            {/* Product Line: 2 */}
            <Box m={2} pt={3}>
                <Typography variant="h5" align="left"> Product Line: 2 </Typography>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>รายการ</TableCell>
                                <TableCell align="right">ของที่ใช้ได้ทั้งหมด</TableCell>
                                <TableCell align="right">ของเสียทั้งหมด</TableCell>
                                <TableCell align="right">ล้างชุบใหม่</TableCell>
                                <TableCell align="right">ล้างส่งคืน</TableCell>
                                <TableCell align="right">งานผิดรูป</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { /* Just mockup data */ }
                            {rows.map((row) => (
                                <TableRow key={row.productname}>
                                <TableCell component="th" scope="row">
                                    {row.productname}
                                </TableCell>
                                    <TableCell align="right">{row.ok}</TableCell>
                                    <TableCell align="right">{row.ng}</TableCell>
                                    <TableCell align="right">{row.rework}</TableCell>
                                    <TableCell align="right">{row.resend}</TableCell>
                                    <TableCell align="right">{row.bend}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            { /* Product Line: 3 */ }
            <Box m={2} pt={3}>
                <Typography variant="h5" align="left"> Product Line: 3 </Typography>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>รายการ</TableCell>
                                <TableCell align="right">ของที่ใช้ได้ทั้งหมด</TableCell>
                                <TableCell align="right">ของเสียทั้งหมด</TableCell>
                                <TableCell align="right">ล้างชุบใหม่</TableCell>
                                <TableCell align="right">ล้างส่งคืน</TableCell>
                                <TableCell align="right">งานผิดรูป</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { /* Just mockup data */ }
                            {rows.map((row) => (
                                <TableRow key={row.productname}>
                                <TableCell component="th" scope="row">
                                    {row.productname}
                                </TableCell>
                                    <TableCell align="right">{row.ok}</TableCell>
                                    <TableCell align="right">{row.ng}</TableCell>
                                    <TableCell align="right">{row.rework}</TableCell>
                                    <TableCell align="right">{row.resend}</TableCell>
                                    <TableCell align="right">{row.bend}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            { /* Sum for Product line 2 & Product line 3 */ }
            <Box m={2} pt={3}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>รายการ</TableCell>
                                <TableCell align="right">ของที่ใช้ได้ทั้งหมด</TableCell>
                                <TableCell align="right">ของเสียทั้งหมด</TableCell>
                                <TableCell align="right">ล้างชุบใหม่</TableCell>
                                <TableCell align="right">ล้างส่งคืน</TableCell>
                                <TableCell align="right">งานผิดรูป</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { /* Just mockup data */ }
                            <TableRow key={1}>
                                <TableCell component="th" scope="row">รวมทั้งหมด</TableCell>
                                <TableCell align="right">{3}</TableCell>
                                <TableCell align="right">{4}</TableCell>
                                <TableCell align="right">{5}</TableCell>
                                <TableCell align="right">{6}</TableCell>
                                <TableCell align="right">{7}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            { /* Copper Tank */}
            <Box m={2} pt={3}>
                <Typography variant="h5" align="left"> Copper Tank </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>รายการ</TableCell>
                                <TableCell align="right">SA</TableCell>
                                <TableCell align="right">SB</TableCell>
                                <TableCell align="right">B1</TableCell>
                                <TableCell align="right">B2</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { /* Just mockup data */ }
                            {rows.map((row) => (
                                    <TableRow key={row.productname}>
                                    <TableCell component="th" scope="row">
                                        {row.productname}
                                    </TableCell>
                                        <TableCell align="right">{row.ok}</TableCell>
                                        <TableCell align="right">{row.ng}</TableCell>
                                        <TableCell align="right">{row.rework}</TableCell>
                                        <TableCell align="right">{row.resend}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}