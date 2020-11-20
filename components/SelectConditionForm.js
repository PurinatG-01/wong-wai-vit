import React from 'react'
import { Button ,Radio, RadioGroup, FormControlLabel, FormControl, TextField, Typography } from "@material-ui/core"
import styled from "styled-components"

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
    return (
        <FormWrapper>
            <form onSubmit={(el) => {
                el.preventDefault();

            }}>
                <FormControl style={{ display: "flex" }} >
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>เวลา :</Typography>
                        <TextField
                            id="time"
                            style={{ width: 200 }}
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>จำนวนต่อชุด :</Typography>
                        <TextField style={{ width: 200 }} type="number" helperText="ระบุจำนวนต่อชุด" />
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>บ่อชุบ :</Typography>
                        <RadioGroup style={{ width: 300, display: "flex", flexDirection: "row" }} aria-label="machine" name="machine" value="SA" onChange={(e) => { console.log("Rado") }}>
                            <FormControlLabel value="SA" control={<Radio color="primary" />} label="SA" />
                            <FormControlLabel value="SB" control={<Radio color="primary" />} label="SB" />
                            <FormControlLabel value="B1" control={<Radio color="primary" />} label="B1" />
                            <FormControlLabel value="B2" control={<Radio color="primary" />} label="B2" />
                        </RadioGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>เลขไลน์ :</Typography>
                        <RadioGroup style={{ width: 300, display: "flex", flexDirection: "row" }} aria-label="line_id" name="line_id" value="2" onChange={(e) => { console.log("Rado") }}>
                            <FormControlLabel value="2" control={<Radio color="primary" />} label="2" />
                            <FormControlLabel value="3" control={<Radio color="primary" />} label="3" />

                        </RadioGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <Typography style={{ width: 164 }}>เลขบาร์ :</Typography>
                        <TextField style={{ width: 200 }} type="number" helperText="ระบุเลขบาร์" />
                    </InputWrapper>

                </FormControl>

                <DetailWrapper>
                    {/* Renew */}
                    <ColumnWrapper style={{ marginLeft: 0 }}>
                        <Typography style={{ fontSize: 20 }}>ล้างชุบใหม่</Typography>
                        <InputDetailWrapper style={{ marginTop: 18 }}>
                            <Typography style={{ width: 94 }}>ชุบไม่ติด</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>แดง/คราบ</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>ฝ้าเงา/เทา</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>ด้าน</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดน้ำยา</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดผื่นโซน A</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดผื่นโซน D</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>เม็ดข้าง</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>พองเคมี</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 94 }}>ลายน้ำ</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        {/* Resend */}
                    </ColumnWrapper>
                    <ColumnWrapper>
                        <Typography style={{ fontSize: 20 }}>ล้างส่งคืน</Typography>
                        <InputDetailWrapper style={{ marginTop: 18 }}>
                            <Typography style={{ width: 124 }}>รอยหลุมน้ำยา</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>ขาอุดไม่หมด</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>รอยขีดข่วน</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>รอยเคมี</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>รอยพลาสติก</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>พองพลาสติก</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>พองเส้นพลาสติก</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>เม็ดนูน</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                        <InputDetailWrapper>
                            <Typography style={{ width: 124 }}>เม็ดหลุม</Typography>
                            <TextField style={{ width: 70 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                    </ColumnWrapper>
                    {/*  Wrong Shape */}
                    <ColumnWrapper>
                        <Typography style={{ fontSize: 20 }}>งานผิดรูป</Typography>
                        <InputDetailWrapper>
                            <Typography style={{ width: 72 }}>งานผิดรูป</Typography>
                            <TextField style={{ width: 70,marginLeft: 38 }} type="number" variant="outlined" />
                            <Typography style={{ marginLeft: 16 }}>อัน</Typography>
                        </InputDetailWrapper>
                    </ColumnWrapper>
                    

                </DetailWrapper>
                <AdditionalWrapper>

                        <Typography>หมายเหตุ:</Typography>
                        <TextField style={{marginTop: 10}}rows={4} multiline variant="outlined"></TextField>
                    </AdditionalWrapper>

                <ButtonWrapper>
                            <Button type="submit" variant="contained" color="primary">
                                บันทึก
                            </Button>
                            <Button style={{marginLeft: 12}}color="error">
                                ยกเลิก
                            </Button>
                        

                </ButtonWrapper>




            </form>
        </FormWrapper>
    )
}
