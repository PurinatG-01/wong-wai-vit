import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getCurrentDate } from "./utils"
import { IconButton } from "@material-ui/core"
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useRouter } from 'next/router'


const rows = [
    { id: 1, per_set: 8, machine: "SA", ok: 7, ng: 1, time: "10.42" },
    { id: 2, per_set: 8, machine: "SA", ok: 7, ng: 1, time: "10.42" },
    { id: 3, per_set: 8, machine: "SA", ok: 7, ng: 1, time: "10.42" },
    { id: 4, per_set: 8, machine: "SA", ok: 7, ng: 1, time: "10.42" },
    { id: 5, per_set: 8, machine: "SA", ok: 7, ng: 1, time: "10.42" },
    { id: 6, per_set: 8, machine: "SA", ok: 7, ng: 1, time: "10.42" },
    { id: 7, per_set: 8, machine: "SA", ok: 7, ng: 1, time: "10.42" },
    { id: 8, per_set: 8, machine: "SA", ok: 7, ng: 1, time: "10.42" },
    { id: 9, per_set: 8, machine: "SA", ok: 7, ng: 1, time: "10.42" },
];


export default function ProductTable() {
    const router = useRouter();
    const columns = [
        { field: 'id', headerName: 'ชุดที่', width: 200 },
        { field: 'per_set', headerName: 'จำนวนต่อชุด', width: 150 },
        { field: 'machine', headerName: 'เครื่องชุบ', width: 150 },
        { field: 'ok', headerName: 'ของที่ใช้ได้', width: 150 },
        { field: 'ng', headerName: 'ของเสีย', width: 150 },
        { field: 'time', headerName: 'เวลา', width: 200 },
        {
            field: 'edit', headerName: 'แก้ไข', width: 200, renderCell: (params) => (
                <IconButton onClick={(e) => {
                    e.stopPropagation();
                    console.log(params.data.id);
                }} color="primary"
                >
                    <BorderColorIcon ></BorderColorIcon>
                </IconButton>
            )
        },
    ];


    return (
        <div style={{ height: 400, width: "100%", marginTop: 32 }}>
            <DataGrid disableSelectionOnClick autoHeight rows={rows} columns={columns} pageSize={5} checkboxSelection onSelectionChange={(el) => { console.log(el) }} />
        </div>
    )
}
