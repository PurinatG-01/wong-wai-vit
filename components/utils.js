


export function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today
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