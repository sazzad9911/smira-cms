const initialState =null;

const hotelBooking =(state=initialState,action)=>{
    if(action.type =='SET_HOTEL_BOOKING'){
        return state=action.playload
    }
    return state
}
export default hotelBooking