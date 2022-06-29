const initialState =null;

const brands=(state=initialState,action)=>{
    if(action.type =='SET_BRANDS'){
        return state=action.playload
    }
    return state
}
export default brands