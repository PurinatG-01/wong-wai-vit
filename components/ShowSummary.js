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
import BackButton from './BackButton'
import { THEME } from './theme'

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

/* for graph */

const getNGData = async () => {
    let rework = 0
    let resend = 0
    let bend = 0
    await db.collection("records")
    .get()
    .then((q) => {
        q.forEach((record) => {
            //console.log(record.data().qc_total_ok)
            rework += record.data().qc_ng_renew
            resend += record.data().qc_ng_resend
            bend += record.data().qc_blended_frame
        })
    })
    console.log([rework, resend, bend])
    return [rework, resend, bend]
}

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
        data: [0, 0, 0]
      }
    ]
}
  
const rows = [
    {productname: "Production Line 2", ok: 0, ng: 0, rework: 0, resend: 0, bend: 0},
    {productname: "Production Line 3", ok: 0, ng: 0, rework: 0, resend: 0, bend: 0}
];

export default function showSummary() {
    const [countItems, setCountItems] = useState();
    const [countNG, setCountNG] = useState();
    const [rowsData, setRowsData] = useState([])
    const [tankData, setTankData] = useState([])

    useEffect(() => {
        getSummaryData().then((res) => {allData.datasets[0].data = res; setCountItems(res[0]+res[1])})
    }, [])

    useEffect(() => {
        getNGData().then((res) => {dataSeparate.datasets[0].data = res; setCountNG(res[0]+res[1]+res[2])})
    }, [])

    useEffect(() => {
        const getTankData = async () => {
            let data = []
            let ok,ng,rework,resend,bend,count,amount
            ok = ng = rework = resend = bend = count = amount = 0
            await db.collection("information")
            .where("info_tank", "==", "SA")
            .get()
            .then((q) => {
                q.forEach((record) => {
                    //console.log(record.data().qc_total_ok)
                    count += 1
                    amount += record.data().info_amount_per_set
                    ok += record.data().info_total_ok
                    ng += record.data().info_total_ng
                    rework += record.data().info_ng_renew
                    resend += record.data().info_ng_resend
                    bend += record.data().info_df_blended
                })
                data.push({ productname: "SA" , count, amount, ok, ng: ng+` (${((ng/amount)*100).toFixed(2)} %)`, rework, resend, bend })
            })

            ok = ng = rework = resend = bend = count = amount = 0
            await db.collection("information")
            .where("info_tank", "==", "SB")
            .get()
            .then((q) => {
                q.forEach((record) => {
                    //console.log(record.data().qc_total_ok)
                    count += 1
                    amount += record.data().info_amount_per_set
                    ok += record.data().info_total_ok
                    ng += record.data().info_total_ng
                    rework += record.data().info_ng_renew
                    resend += record.data().info_ng_resend
                    bend += record.data().info_df_blended
                })
                data.push({ productname: "SB" , count, amount, ok, ng: ng+` (${((ng/amount)*100).toFixed(2)} %)`, rework, resend, bend })
            })

            ok = ng = rework = resend = bend = count = amount = 0
            await db.collection("information")
            .where("info_tank", "==", "B1")
            .get()
            .then((q) => {
                q.forEach((record) => {
                    //console.log(record.data().qc_total_ok)
                    count += 1
                    amount += record.data().info_amount_per_set
                    ok += record.data().info_total_ok
                    ng += record.data().info_total_ng
                    rework += record.data().info_ng_renew
                    resend += record.data().info_ng_resend
                    bend += record.data().info_df_blended
                })
                data.push({ productname: "B1" , count, amount, ok, ng: ng+` (${((ng/amount)*100).toFixed(2)} %)`, rework, resend, bend })
            })

            ok = ng = rework = resend = bend = count = amount = 0
            await db.collection("information")
            .where("info_tank", "==", "B2")
            .get()
            .then((q) => {
                q.forEach((record) => {
                    //console.log(record.data().qc_total_ok)
                    count += 1
                    amount += record.data().info_amount_per_set
                    ok += record.data().info_total_ok
                    ng += record.data().info_total_ng
                    rework += record.data().info_ng_renew
                    resend += record.data().info_ng_resend
                    bend += record.data().info_df_blended
                })
                data.push({ productname: "B2" , count, amount, ok, ng: ng+` (${((ng/amount)*100).toFixed(2)} %)`, rework, resend, bend })
            })

            ok = ng = rework = resend = bend = count = amount = 0
            data.map((data) => {
                count += data.count
                amount += data.amount
                ok += data.ok
                ng += data.ng
                rework += data.rework
                resend += data.resend
                bend += data.bend
            })

            data.push({ productname: "รวมทั้งหมด" , count, amount, ok, ng: (rework+resend+bend)+` (${(((rework+resend+bend)/amount)*100).toFixed(2)} %)`, rework, resend, bend })

            setTankData(data)
        }

        getTankData()
        console.log("Tank Request")

    }, [])

    useEffect(() => {
        const getProductionLineData = async () => {
            let data = []
            let ok,ng,rework,resend,bend,count,amount
            ok = ng = rework = resend = bend = count = amount = 0
            await db.collection("information")
            .where("info_production_line", "==", 2)
            .get()
            .then((q) => {
                q.forEach((record) => {
                    //console.log(record.data().qc_total_ok)
                    count += 1
                    amount += record.data().info_amount_per_set
                    ok += record.data().info_total_ok
                    ng += record.data().info_total_ng
                    rework += record.data().info_ng_renew
                    resend += record.data().info_ng_resend
                    bend += record.data().info_df_blended
                })
                data.push({ productname: "Production Line 2" , count, amount, ok, ng: ng+` (${((ng/amount)*100).toFixed(2)} %)`, rework, resend, bend })
            })

            ok = ng = rework = resend = bend = count = amount = 0
            await db.collection("information")
            .where("info_production_line", "==", 3)
            .get()
            .then((q) => {
                q.forEach((record) => {
                    //console.log(record.data().qc_total_ok)
                    count += 1
                    amount += record.data().info_amount_per_set
                    ok += record.data().info_total_ok
                    ng += record.data().info_total_ng
                    rework += record.data().info_ng_renew
                    resend += record.data().info_ng_resend
                    bend += record.data().info_df_blended
                })
                data.push({ productname: "Production Line 3" , count, amount, ok, ng: ng+` (${((ng/amount)*100).toFixed(2)} %)`, rework, resend, bend })
            })

            ok = ng = rework = resend = bend = count = amount = 0
            data.map((data) => {
                count += data.count
                amount += data.amount
                ok += data.ok
                ng += data.ng
                rework += data.rework
                resend += data.resend
                bend += data.bend
            })

            data.push({ productname: "รวมทั้งหมด" , count, amount, ok, ng: (rework+resend+bend)+` (${(((rework+resend+bend)/amount)*100).toFixed(2)} %)`, rework, resend, bend })

            setRowsData(data)
        }

        getProductionLineData()
        console.log("Production Line Req")
    }, [])

    return (
        <>
            <TopBar>
                <BackButton color={THEME.primary} onClick={() => { console.log("Go back!!") }} />
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
                        <Typography variant="h5" align="center"> ทั้งหมด {countNG} ชิ้น </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* Product Line: 2 */}
            <Box m={2} pt={3}>
                <Typography variant="h5" align="left"> Product Line </Typography>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>รายการ</TableCell>
                                <TableCell align="right">จำนวนออเดอร์</TableCell>
                                <TableCell align="right">ของทั้งหมด</TableCell>
                                <TableCell align="right">ของที่ใช้ได้ทั้งหมด</TableCell>
                                <TableCell align="right">ของเสียทั้งหมด</TableCell>
                                <TableCell align="right">ล้างชุบใหม่</TableCell>
                                <TableCell align="right">ล้างส่งคืน</TableCell>
                                <TableCell align="right">งานผิดรูป</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { /* Just mockup data */ }
                            {rowsData.map((row) => (
                                <TableRow key={row.productname}>
                                <TableCell component="th" scope="row">
                                    {row.productname}
                                </TableCell>
                                    <TableCell align="right">{row.count}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
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
            { /* Copper Tank */}
            <Box m={2} pt={3}>
                <Typography variant="h5" align="left"> Copper Tank </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>รายการ</TableCell>
                                <TableCell align="right">จำนวนออเดอร์</TableCell>
                                <TableCell align="right">ของทั้งหมด</TableCell>
                                <TableCell align="right">ของที่ใช้ได้ทั้งหมด</TableCell>
                                <TableCell align="right">ของเสียทั้งหมด</TableCell>
                                <TableCell align="right">ล้างชุบใหม่</TableCell>
                                <TableCell align="right">ล้างส่งคืน</TableCell>
                                <TableCell align="right">งานผิดรูป</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { /* Just mockup data */ }
                            {tankData.map((row) => (
                                    <TableRow key={row.productname}>
                                        <TableCell component="th" scope="row">
                                            {row.productname}
                                        </TableCell>
                                        <TableCell align="right">{row.count}</TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
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
        </>
    )
}