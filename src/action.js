export const setUser = (user) =>{
    return{
        type: 'SET_USER',
        playload:user
    }
}
export const setUserInfo = (user) =>{
    return{
        type: 'SET_USER_INFO',
        playload:user
    }
}
export const setHotels=(hotels) =>{
    return{
        type: 'SET_HOTELS',
        playload:hotels
    }
}
export const setDeals=(deals) =>{
    return{
        type: 'SET_DEALS',
        playload:deals
    }
}
export const setHotelBooking=(booking) =>{
    return{
        type: 'SET_HOTEL_BOOKING',
        playload:booking
    }
}
export const setBookAppointment=(appointment) =>{
    return{
        type: 'SET_BOOK_APPOINTMENT',
        playload:appointment
    }
}
export const setBrands=(brands) =>{
    return{
        type: 'SET_BRANDS',
        playload:brands
    }
}
export const setMembership=(membership) =>{
    return{
        type: 'SET_MEMBERSHIP',
        playload:membership
    }
}
export function postAttachment (fileData) {
    let formData = new FormData()
    formData.append('prop1', 'value1')
    formData.append('prop2', 'value2')
    formData.append('file', fileData)
    return fetch('http://192.168.0.199:4000/uploadWithData', {
      headers: {
        'Accept': 'application/json',
        'header1': 'headerValue1'
      },
      method: 'POST',
      body: JSON.stringify(formData)
    })
  }
export const setAddresses=(address)=>({type: 'SET_ADDRESSES',playload:address})
export const setPoster=(poster)=>({type: 'SET_POSTER',playload:poster})
export const setBanner=(banner)=>({type: 'SET_BANNER',playload:banner})
export async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

export const url ="http://165.232.178.79:4000"

export const convertDate = (date) => {
    let Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    date = new Date(date)
    date = date.getDate() + ' ' + Months[date.getMonth()] + ' ' + date.getFullYear()
    return date
}
export const writeDate = (date) => {
    if(date.getMonth()<10){
        date=date.getFullYear() + '-'+'0' + (date.getMonth() + 1) + '-' + date.getDate()
    }else{
        date=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
    
    return date
}