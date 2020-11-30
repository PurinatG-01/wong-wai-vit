import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getCurrentDate } from "./utils"
import { IconButton } from "@material-ui/core"
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useRouter } from 'next/router'


const columns = [
    // { field: 'id', headerName: 'ไอดี', width: 100 },
    { field: 'qc_date', headerName: 'วันที่', width: 150 },
    { field: 'qc_total_set', headerName: 'จำนวนชุด', width: 150 },
    { field: 'qc_total_ok', headerName: 'ของที่ใช้ได้ทั้งหมด', width: 150 },
    { field: 'qc_total_ng', headerName: 'ของเสียทั้งหมด', width: 150 },
    { field: 'qc_ng_renew', headerName: 'ล้างชุบใหม่', width: 120 },
    { field: 'qc_ng_resend', headerName: 'ล้างส่งคืน', width: 120 },
    { field: 'qc_blended_frame', headerName: 'งานผิดรูป', width: 120 },
];

export default function ProductTable(props) {
    const { product } = props 
    const { onChange, data } = props;
    const router = useRouter();


    return (<>
        { (data == []) ? <></> :
            <div style={{ height: 400, width: "100%", marginTop: 32 }}>
                <DataGrid
                    disableSelectionOnClick
                    onCellClick={(el) => {
                    router.push({ pathname: "/selectProductCondition/condition", query: { ...el.data, name: product?.name, pid: product?.pid, method: "edit" } })
                }}
                    autoHeight
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[1,2,5,10,15]}
                    checkboxSelection
                    onSelectionChange={(el) => {
                        onChange(el);
                    }}
                />
            </div>
        }
    </>
    )
}
