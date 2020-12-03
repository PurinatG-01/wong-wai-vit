


export function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const date = new Date(`${yyyy}-${mm}-${dd}`)
    const formalDate = dd+"/"+mm+"/"+yyyy
    
    return {dd, mm , yyyy, date, formalDate }
}


export const Hello = {
    primary : 1234,
}


export function tester(){
    return "1234"
}

export default function teste1r(){
    return "sdfhskdfh;sd"
}

export const extractData = (element, data ,setFunc)=>{

    const id = element.target.id
    const value = element.target.value
    setFunc({ ...data , [id] : value})
}

export const extractNumberData = (element, data ,setFunc)=>{

    const id = element.target.id
    const value = element.target.value
    // console.log("parse > ",parseInt(value,10))

    setFunc({ ...data , [id] : parseInt(value,10)})
}

export const extractStateToDbState = (e)=>{


                let renew = 0
                let resend = 0
                let blended = 0
                console.log("-------------------")
                console.log(e)
                renew = renew +  ( 
                    e.info_df_nonplating+ 
                    e.info_df_redstain+
                    e.info_df_silverside+
                    e.info_df_rough+
                    e.info_df_chemicaldrop+
                    e.info_df_unrefinedA+
                    e.info_df_unrefinedD+
                    e.info_df_roughside+
                    e.info_df_blisterchem+
                    e.info_df_watermark
                    )

                    console.log("Test > ", e.info_df_nonplating)
                    resend = resend +  ( 
                        e.info_df_chemcavity+ 
                        e.info_df_unclog+
                        e.info_df_scratch+
                        e.info_df_chemicalmark+
                        e.info_df_plasticmark+
                        e.info_df_blisterplastic+
                        e.info_df_blisterlineplastic+
                        e.info_df_dropconvex+
                        e.info_df_drophole
                        
                    )

                    blended = e.info_df_blended
                
        return { ...e,

            info_total_ok: e.info_amount_per_set - (renew+resend+blended),
            info_total_ng: (renew+resend+blended),
            info_ng_renew: renew,
            info_ng_resend: resend,


        }
    }

