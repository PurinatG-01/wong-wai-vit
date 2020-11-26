import React, {useState} from 'react'
import { Button ,Radio, RadioGroup, FormControlLabel, FormControl, TextField, Typography } from "@material-ui/core"
import styled from "styled-components"
import {useRouter} from "next/router"
import {extractData} from "./utils"

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

export default function SelectConditionForm() {

    const router = useRouter();
    const query = router.query;

    // console.log("Page query : ", query)

    const [state,setState] = useState({
        ...query
    })

    const [renewState,setRenewState] = useState({}) 
    const [resendState, setResendState] = useState({})
    const [wrongShapeState, setWrongShapeState] = useState({})

    // console.log(state)

    return (
        <FormWrapper>
            <form onSubmit={(el) => {
                el.preventDefault();
                console.log("meta_state > ",state)
                console.log("renew_state > ",renewState)
                console.log("resend_state > ", resendState)
                console.log("wrong_shape_state > ", wrongShapeState)

            }}>
                <FormControl style={{ display: "flex" }} >
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>เวลา :</Typography>
                        <TextField
                            id="time"
                            style={{ width: 200 }}
                            type="time"
                            value={state.time ?? ""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            onChange={(el)=>{extractData(el,state,setState) }}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>จำนวนต่อชุด :</Typography>
                        <TextField id="per_set" 
                        style={{ width: 200 }} 
                        value={state.per_set ?? ""}
                        onChange={(el)=>{extractData(el,state,setState) }} 
                        type="number" 
                        helperText="ระบุจำนวนต่อชุด" />
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>บ่อชุบ :</Typography>
                        <RadioGroup 
                        id="machine" 
                        style={{ width: 300, display: "flex", flexDirection: "row" }} 
                        aria-label="machine" 
                        name="machine" 
                        value={state.machine ?? "SA"}
                        onChange={(el)=>{extractData(el,state,setState)}}>
                            <FormControlLabel value="SA" control={<Radio id="machine" color="primary" />} label="SA" />
                            <FormControlLabel value="SB" control={<Radio id="machine" color="primary" />} label="SB" />
                            <FormControlLabel value="B1" control={<Radio id="machine" color="primary" />} label="B1" />
                            <FormControlLabel value="B2" control={<Radio id="machine" color="primary" />} label="B2" />
                        </RadioGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>เลขไลน์ :</Typography>
                        <RadioGroup 
                        id="line_id" 
                        style={{ width: 300, display: "flex", flexDirection: "row" }} 
                        aria-label="line_id" 
                        name="line_id" 
                        value={state.line_id ?? "2"}
                        onChange={(el)=>{extractData(el,state,setState)}}>
                            <FormControlLabel value="2" control={<Radio id="line_id" color="primary" />} label="2" />
                            <FormControlLabel value="3" control={<Radio id="line_id" color="primary" />} label="3" />
                        </RadioGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>เลขบาร์ :</Typography>
                        <TextField 
                        id="bar_id" 
                        style={{ width: 200 }} 
                        value={state.bar_id ?? ""} 
                        onChange={(el)=>{extractData(el,state,setState) }} 
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
                            <TextField id="a" value={renewState.a ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>แดง/คราบ</Typography>
                            <TextField id="b" value={renewState.b ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>ฝ้าเงา/เทา</Typography>
                            <TextField id="c" value={renewState.c ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>ด้าน</Typography>
                            <TextField id="d" value={renewState.d ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดน้ำยา</Typography>
                            <TextField id="e" value={renewState.e ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดผื่นโซน A</Typography>
                            <TextField id="f" value={renewState.f ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดผื่นโซน D</Typography>
                            <TextField id="g" value={renewState.g ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดข้าง</Typography>
                            <TextField id="h" value={renewState.h ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>พองเคมี</Typography>
                            <TextField id="i" value={renewState.i ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>ลายน้ำ</Typography>
                            <TextField id="j" value={renewState.j ?? 0} onChange={(el)=>{extractData(el,renewState,setRenewState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        {/* Resend */}
                    </ColumnWrapper>
                    <ColumnWrapper>
                        <Typography style={{ fontSize: 20 }}>ล้างส่งคืน</Typography>
                        <InputDetailWrapper style={{ marginTop: 18 }}>
                            <Typography style={{ width: 124 }}>รอยหลุมน้ำยา</Typography>
                            <TextField id="a" value={resendState.a ?? 0} onChange={(el)=>{extractData(el,resendState,setResendState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>ขาอุดไม่หมด</Typography>
                            <TextField id="b" value={resendState.b ?? 0} onChange={(el)=>{extractData(el,resendState,setResendState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>รอยขีดข่วน</Typography>
                            <TextField id="c" value={resendState.c ?? 0} onChange={(el)=>{extractData(el,resendState,setResendState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>รอยเคมี</Typography>
                            <TextField id="d" value={resendState.d ?? 0} onChange={(el)=>{extractData(el,resendState,setResendState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>รอยพลาสติก</Typography>
                            <TextField id="e" value={resendState.e ?? 0} onChange={(el)=>{extractData(el,resendState,setResendState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>พองพลาสติก</Typography>
                            <TextField id="f" value={resendState.f ?? 0} onChange={(el)=>{extractData(el,resendState,setResendState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16}}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>พองเส้นพลาสติก</Typography>
                            <TextField id="g" value={resendState.g ?? 0} onChange={(el)=>{extractData(el,resendState,setResendState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>เม็ดนูน</Typography>
                            <TextField id="h" value={resendState.h ?? 0} onChange={(el)=>{extractData(el,resendState,setResendState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>เม็ดหลุม</Typography>
                            <TextField id="i" value={resendState.i ?? 0} onChange={(el)=>{extractData(el,resendState,setResendState)}} style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                    </ColumnWrapper>
                    {/*  Wrong Shape */}
                    <ColumnWrapper>
                        <Typography style={{ fontSize: 20 }}>งานผิดรูป</Typography>
                        <InputDetailWrapper>
                            <Typography style={{ width: 72 }}>งานผิดรูป</Typography>
                            <TextField id="wrong" value={wrongShapeState.wrong ?? 0} onChange={(el)=>{extractData(el,wrongShapeState,setWrongShapeState)}} style={{ width: 70,marginLeft: 38 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                    </ColumnWrapper>
                    

                </DetailWrapper>
                <AdditionalWrapper>

                        <Typography>หมายเหตุ:</Typography>
                        <TextField id="note" value={state.note ?? ""} onChange={(el)=>{extractData(el,state,setState)}} style={{marginTop: 10}}rows={4} multiline variant="outlined"></TextField>
                    </AdditionalWrapper>

                <ButtonWrapper>
                            <Button type="submit" variant="contained" color="primary">
                                บันทึก
                            </Button>
                            <Button style={{marginLeft: 12}} color="error" onClick={()=>{router.back()}}>
                                ยกเลิก
                            </Button>
                        

                </ButtonWrapper>




            </form>
        </FormWrapper>
    )
}
