import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getCurrentDate } from "./utils"
import { IconButton } from "@material-ui/core"
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useRouter } from 'next/router'


const rows = [
    { id: 1, date: getCurrentDate(), total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 2, date: getCurrentDate(), total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 3, date: getCurrentDate(), total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 4, date: getCurrentDate(), total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 5, date: getCurrentDate(), total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 6, date: getCurrentDate(), total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 7, date: getCurrentDate(), total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 8, date: getCurrentDate(), total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
    { id: 9, date: getCurrentDate(), total_set: 8, total: 40, total_ok: 30, total_ng: 10 },
];


export default function ProductTable(props) {

    const { onChange } = props;
    const router = useRouter();
    const columns = [
        { field: 'id', headerName: 'ไอดี', width: 200 },
        { field: 'date', headerName: 'วันที่', width: 200 },
        { field: 'total_set', headerName: 'จำนวนชุด', width: 150 },
        { field: 'total', headerName: 'ของทั้งหมด', width: 150 },
        { field: 'total_ok', headerName: 'ของที่ใช้ได้ทั้งหมด', width: 200 },
        { field: 'total_ng', headerName: 'ของเสียทั้งหมด', width: 200 },
    ];


    return (
        <div style={{ height: 400, width: "100%", marginTop: 32 }}>
            <DataGrid
                disableSelectionOnClick
                onCellClick={(el) => {
                    router.push({ pathname: "/selectProductCondition/condition", query: { ...el.data, method: "edit" } })
                }}
                autoHeight rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onSelectionChange={(el) => {
                    onChange(el);
                }}
            />
        </div>
    )
}
