


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