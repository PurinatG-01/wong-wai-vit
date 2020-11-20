import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getCurrentDate } from "./utils"
import { IconButton } from "@material-ui/core"
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useRouter } from 'next/router'


const rows = [
    { id: 1, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10.42" },
    { id: 2, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10.42" },
    { id: 3, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10.42" },
    { id: 4, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10.42" },
    { id: 5, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10.42" },
    { id: 6, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1,  renew: 4, resend: 8, wrong_shape: 7,time: "10.42" },
    { id: 7, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10.42" },
    { id: 8, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10.42" },
    { id: 9, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10.42" },
];


export default function ProductTable() {
    const router = useRouter();
    const columns = [
        { field: 'id', headerName: 'ชุดที่', width: 100 },
        { field: 'per_set', headerName: 'จำนวนต่อชุด', width: 100 },
        { field: 'machine', headerName: 'บ่อชุบ', width: 100 },

        { field: 'line_id', headerName: 'เลขไลน์', width: 100 },
        { field: 'bar_id', headerName: 'เลขบาร์', width: 100 },
        
        
        
        { field: 'ok', headerName: 'ของที่ใช้ได้', width: 100 },
        { field: 'ng', headerName: 'ของเสีย', width: 100 },

        { field: 'renew', headerName: 'ล้างชุบใหม่', width: 100 },
        { field: 'resend', headerName: 'ล้างส่งคืน', width: 100 },
        { field: 'wrong_shape', headerName: 'งานผิดรูป', width: 100 },

        { field: 'time', headerName: 'เวลา', width: 100 },
        {
            field: 'edit', headerName: 'แก้ไข', width: 100, renderCell: (params) => (
                <IconButton onClick={(e) => {
                    e.stopPropagation();
                }} color="primary"
                >
                    <BorderColorIcon ></BorderColorIcon>
                </IconButton>
            )
        },]
    


    return (
        <div style={{ height: 400, width: "100%", marginTop: 32 }}>
            <DataGrid disableSelectionOnClick onCellClick={(el)=>{
                if(el.field == "edit"){
                    console.log("Edit click :",el)
                    router.push({pathname:"/selectProductCondition/record",query:{ method: "edit"}})
                }
        }}
         autoHeight 
         rows={rows} 
         columns={columns} 
         pageSize={5} 
         rowsPerPageOptions={[1,2,5,10,15]}
         onSelectionChange={(el) => { console.log(el) }} 
         />
        </div>
    )
}
