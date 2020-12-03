import React, { useState, useEffect } from 'react'
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Typography } from "@material-ui/core"
import styled from "styled-components"
import { useRouter } from "next/router"
import { extractData, extractNumberData, extractStateToDbState } from "./utils"
import Firebase from "./Firebase"


const FormWrapper = styled.div`
width: 100%;
margin-top: 32px;
margin-left: 54px;
`

const InputWrapper = styled.div`
display:flex;
margin-top: 44px;
align-items: center;
`

const ColumnWrapper = styled.div`
display: flex;
flex-direction: column;
margin-left: 96px;
`

const DetailWrapper = styled.div`
display: flex;
width: 100%;
margin-top: 32px;

`

const InputDetailWrapper = styled.div`
display: flex;
margin-top: 12px;
align-items: center;
`

const AdditionalWrapper = styled.div`
width: 100%;
display:flex;
flex-direction: column;
margin-top: 36px;
`

const ButtonWrapper = styled.div`
width: 100%;
justify-content: flex-end;
margin-top:32px;
margin-bottom: 40px;
display: flex;
`


const db = Firebase.firestore()

export default function SelectConditionForm(props) {

    const router = useRouter();
    const query = router.query;



    console.log("Page query : ", query)



    const [state, setState] = useState((query.method == "add") ?
        {
            id: null,
            info_amount_per_set: 0,
            info_bar_no: 0,
            info_df_blended: 0,
            info_df_blisterchem: 0,
            info_df_blisterlineplastic: 0,
            info_df_blisterplastic: 0,
            info_df_chemcavity: 0,
            info_df_chemicaldrop: 0,
            info_df_chemicalmark: 0,
            info_df_dropconvex: 0,
            info_df_drophole: 0,
            info_df_nonplating: 0,
            info_df_plasticmark: 0,
            info_df_redstain: 0,
            info_df_rough: 0,
            info_df_roughside: 0,
            info_df_scratch: 0,
            info_df_silverside: 0,
            info_df_unclog: 0,
            info_df_unrefinedA: 0,
            info_df_unrefinedD: 0,
            info_df_watermark: 0,
            info_id: null,
            info_ng_renew: 0,
            info_ng_resend: 0,
            info_production_line: 2,
            info_starttime: null,
            info_tank: "SA",
            info_total_ng: 0,
            info_total_ok: 0,
            note: "",
            order_no: 0,
            pid: parseInt(query.pid,10),
            qc_id: query.qc_id,
        }

        : query)


    useEffect(() => {

        if (query.id) {
            db.collection("information")
                .where("info_id", "==", query.id)
                .get()
                .then((q) => {
                    q.forEach((e) => {
                        console.log(e.data())
                        setState(e.data())
                    })
                })
        }


    }, [])

    // console.log("in state >", state)


    const calTotal = (DBState)=>{
        db.collection("information")
                    .where("qc_id", "==", DBState.qc_id)
                    .get()
                    .then((q) => {
                        let t_blended = 0
                        let t_renew = 0
                        let t_resend = 0

                        let t_amount_per_set = 0
                        let count_doc = 0

                        q.forEach((e) => {
                            console.log("e >", e.data())
                            t_blended = t_blended + e.data().info_df_blended
                            t_renew = t_renew + e.data().info_ng_renew
                            t_resend = t_resend + e.data().info_ng_resend

                            t_amount_per_set = t_amount_per_set + e.data().info_amount_per_set

                            count_doc += 1

                            console.log("t_amount > ", t_amount_per_set)
                        })


                        const temp = {
                            id: DBState.qc_id,
                            pid: DBState.pid,
                            qc_blended_frame: t_blended,
                            qc_date: query.date,
                            qc_id: DBState.qc_id,
                            qc_ng_renew: t_renew,
                            qc_ng_resend: t_resend,
                            qc_total_ng: (t_blended + t_resend + t_renew),
                            qc_total_ok: (t_amount_per_set - t_blended - t_resend - t_renew),
                            qc_total_set: count_doc,
                        }


                        console.log("temp >", temp)

                        db.collection("records")
                            .doc(temp.id)
                            .set(temp)
                            .then((res) => {
                                console.log("final response > ", res)
                                router.back()
                            })


                    })
    }

    const addSubmit = async (DBState) => {
        console.log("add state >", DBState)
        db.collection("information")
            .where("qc_id", "==", DBState.qc_id)
            .get()
            .then(async (e) => {
                const length = e.size + 1
                // console.log("Total info in one qc_id > ", length)
                const newRef = db.collection("information").doc()
                await newRef.set({
                    ...DBState,
                    qc_id: DBState.qc_id,
                    id: newRef.id,
                    info_id: newRef.id,
                    order_no: length,
                }).then(()=>{

                    calTotal(DBState)

                })

        })




    }


    const editSubmit = async (DBState) => {
        await db.collection("information")
            .doc(DBState.id)
            .set(DBState)
            .then((res) => {
               calTotal(DBState)
            })

    }

    return (
        <FormWrapper>
            <form onSubmit={async (el) => {
                el.preventDefault();
                console.log("meta_state > ", state)

                const DBState = extractStateToDbState(state)
                console.log("DB state >", DBState)

                if (query.method == "add") {
                    addSubmit(DBState)
                } else {
                    editSubmit(DBState)
                }



                // router.back()


            }}>
                <FormControl style={{ display: "flex" }} >
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>เวลา :</Typography>
                        <TextField
                            id="info_starttime"
                            style={{ width: 200 }}
                            type="time"
                            value={state.info_starttime ?? ""}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            onChange={(el) => { extractData(el, state, setState) }}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>จำนวนต่อชุด :</Typography>
                        <TextField id="info_amount_per_set"
                            style={{ width: 200 }}
                            required
                            value={state.info_amount_per_set ?? 0}
                            onChange={(el) => { extractNumberData(el, state, setState) }}
                            type="number"
                            helperText="ระบุจำนวนต่อชุด" />
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>บ่อชุบ :</Typography>
                        <RadioGroup
                            id="info_tank"
                            style={{ width: 300, display: "flex", flexDirection: "row" }}
                            aria-label="info_tank"
                            name="info_tank"
                            required
                            value={state.info_tank ?? "SA"}
                            onChange={(el) => { extractData(el, state, setState) }}>
                            <FormControlLabel value="SA" control={<Radio id="info_tank" color="primary" />} label="SA" />
                            <FormControlLabel value="SB" control={<Radio id="info_tank" color="primary" />} label="SB" />
                            <FormControlLabel value="B1" control={<Radio id="info_tank" color="primary" />} label="B1" />
                            <FormControlLabel value="B2" control={<Radio id="info_tank" color="primary" />} label="B2" />
                        </RadioGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>เลขไลน์ :</Typography>
                        <RadioGroup
                            id="info_production_line"
                            style={{ width: 300, display: "flex", flexDirection: "row" }}
                            aria-label="info_production_line"
                            name="info_production_line"
                            required
                            value={state.info_production_line ?? 2}
                            onChange={(el) => { extractNumberData(el, state, setState) }}>
                            <FormControlLabel value={2} control={<Radio id="info_production_line" color="primary" />} label="2" />
                            <FormControlLabel value={3} control={<Radio id="info_production_line" color="primary" />} label="3" />
                        </RadioGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>เลขบาร์ :</Typography>
                        <TextField
                            id="info_bar_no"
                            style={{ width: 200 }}
                            value={state.info_bar_no ?? 0}
                            required
                            onChange={(el) => { extractNumberData(el, state, setState) }}
                            type="number"
                            helperText="ระบุเลขบาร์" />
                    </InputWrapper>

                </FormControl>

                <DetailWrapper>
                    {/* Renew */}
                    <ColumnWrapper style={{ marginLeft: 0 }}>
                        <Typography style={{ fontSize: 20 }}>ล้างชุบใหม่</Typography>
                        <InputDetailWrapper style={{ marginTop: 18 }}>
                            <Typography style={{ width: 94 }}>ชุบไม่ติด</Typography>
                            <TextField required id="info_df_nonplating" value={state.info_df_nonplating ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>แดง/คราบ</Typography>
                            <TextField required id="info_df_redstain" value={state.info_df_redstain ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>ฝ้าเงา/เทา</Typography>
                            <TextField required id="info_df_silverside" value={state.info_df_silverside ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>ด้าน</Typography>
                            <TextField required id="info_df_rough" value={state.info_df_rough ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดน้ำยา</Typography>
                            <TextField required id="info_df_chemicaldrop" value={state.info_df_chemicaldrop ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดผื่นโซน A</Typography>
                            <TextField required id="info_df_unrefinedA" value={state.info_df_unrefinedA ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดผื่นโซน D</Typography>
                            <TextField required id="info_df_unrefinedD" value={state.info_df_unrefinedD ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดข้าง</Typography>
                            <TextField required id="info_df_roughside" value={state.info_df_roughside ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>พองเคมี</Typography>
                            <TextField required id="info_df_blisterchem" value={state.info_df_blisterchem ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>ลายน้ำ</Typography>
                            <TextField required id="info_df_watermark" value={state.info_df_watermark ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        {/* Resend */}
                    </ColumnWrapper>
                    <ColumnWrapper>
                        <Typography style={{ fontSize: 20 }}>ล้างส่งคืน</Typography>
                        <InputDetailWrapper style={{ marginTop: 18 }}>
                            <Typography style={{ width: 124 }}>รอยหลุมน้ำยา</Typography>
                            <TextField required id="info_df_chemcavity" value={state.info_df_chemcavity ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>ขาอุดไม่หมด</Typography>
                            <TextField required id="info_df_unclog" value={state.info_df_unclog ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>รอยขีดข่วน</Typography>
                            <TextField required id="info_df_scratch" value={state.info_df_scratch ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>รอยเคมี</Typography>
                            <TextField required id="info_df_chemicalmark" value={state.info_df_chemicalmark ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>รอยพลาสติก</Typography>
                            <TextField required id="info_df_plasticmark" value={state.info_df_plasticmark ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>พองพลาสติก</Typography>
                            <TextField required id="info_df_blisterplastic" value={state.info_df_blisterplastic ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>พองเส้นพลาสติก</Typography>
                            <TextField required id="info_df_blisterlineplastic" value={state.info_df_blisterlineplastic ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>เม็ดนูน</Typography>
                            <TextField required id="info_df_dropconvex" value={state.info_df_dropconvex ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>เม็ดหลุม</Typography>
                            <TextField required id="info_df_drophole" value={state.info_df_drophole ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                    </ColumnWrapper>
                    {/*  Wrong Shape */}
                    <ColumnWrapper>
                        <Typography style={{ fontSize: 20 }}>งานผิดรูป</Typography>
                        <InputDetailWrapper>
                            <Typography style={{ width: 72 }}>งานผิดรูป</Typography>
                            <TextField required id="info_df_blended" value={state.info_df_blended ?? 0} onChange={(el) => { extractNumberData(el, state, setState) }} style={{ width: 70, marginLeft: 38 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                    </ColumnWrapper>


                </DetailWrapper>
                <AdditionalWrapper>

                    <Typography>หมายเหตุ:</Typography>
                    <TextField id="note" value={state.note ?? ""} onChange={(el) => { extractData(el, state, setState) }} style={{ marginTop: 10 }} rows={4} multiline variant="outlined"></TextField>
                </AdditionalWrapper>

                <ButtonWrapper>
                    <Button type="submit" variant="contained" color="primary">
                        บันทึก
                            </Button>
                    <Button style={{ marginLeft: 12 }} color="error" onClick={() => { router.back() }}>
                        ยกเลิก
                            </Button>


                </ButtonWrapper>




            </form>
        </FormWrapper>
    )
}
