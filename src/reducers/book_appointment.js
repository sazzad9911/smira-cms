const initialState =null

const bookAppointment =(state=initialState,action)=>{
    if(action.type =='SET_BOOK_APPOINTMENT'){
        return state=action.playload
    }
    return state
}
export default bookAppointment