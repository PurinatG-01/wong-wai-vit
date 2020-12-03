import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getCurrentDate } from "./utils"
import { IconButton } from "@material-ui/core"
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useRouter } from 'next/router'


const rows = [
    { id: 1, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10:42" },
    { id: 2, per_set: 8, machine: "SB",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10:42" },
    { id: 3, per_set: 8, machine: "B1",line_id : 3, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10:42" },
    { id: 4, per_set: 8, machine: "B2",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10:42" },
    { id: 5, per_set: 8, machine: "SA",line_id : 3, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10:42" },
    { id: 6, per_set: 8, machine: "SA",line_id : 3, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7,time: "10:42" },
    { id: 7, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10:42" },
    { id: 8, per_set: 8, machine: "SA",line_id : 3, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10:42" },
    { id: 9, per_set: 8, machine: "SA",line_id : 2, bar_id: 11462, ok: 7, ng: 1, renew: 4, resend: 8, wrong_shape: 7, time: "10:42" },
];


export default function ProductTable(props) {
    const router = useRouter();
    const query = router.query;
    const { data } = props; 

    const columns = [
        { field: 'order_no', headerName: 'ชุดที่', width: 100 },
        { field: 'info_amount_per_set', headerName: 'จำนวนต่อชุด', width: 120 },
        { field: 'info_tank', headerName: 'บ่อชุบ', width: 100 },

        { field: 'info_production_line', headerName: 'เลขไลน์', width: 100 },
        { field: 'info_bar_no', headerName: 'เลขบาร์', width: 100 },
        
        
        
        { field: 'info_total_ok', headerName: 'ของที่ใช้ได้', width: 100 },
        { field: 'info_total_ng', headerName: 'ของเสีย', width: 100 },

        { field: 'info_ng_renew', headerName: 'ล้างชุบใหม่', width: 100 },
        { field: 'info_ng_resend', headerName: 'ล้างส่งคืน', width: 100 },
        { field: 'info_df_blended', headerName: 'งานผิดรูป', width: 100 },

        { field: 'info_starttime', headerName: 'เวลา', width: 100 },
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
            <DataGrid sortModel={
                [
                    {
                      field: 'order_no',
                      sort: 'asc',
                    },
                  ]
            } 
            disableSelectionOnClick 
            onCellClick={(el)=>{
                if(el.field == "edit"){
                    const data = el.data
                    
                    // console.log("Found > ",detailData.find((obj)=>(obj.id == data.id)))
                    // console.log("detailData > ",detailData)
                    // console.log("el.data > ", el.data)
                    router.push({pathname:"/selectProductCondition/record",query:{ ...data ,name : query.name,  pid: query.pid, date: query.qc_date ,method: "edit"}})
                }
        }}
         autoHeight 
         rows={data ?? []} 
         columns={columns} 
         pageSize={5} 
         rowsPerPageOptions={[1,2,5,10,15]}
         
         />
        </div>
    )
}
