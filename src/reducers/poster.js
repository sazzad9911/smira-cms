const initialState =null;
const poster=(state=initialState, action)=>{
    if(action.type=='SET_POSTER'){
        return state=action.playload
    }
    return state
}
export default poster