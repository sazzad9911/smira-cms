const initialState =null

const membership=(state=initialState,action)=>{
    if(action.type=='SET_MEMBERSHIP'){
        return state=action.playload
    }
    return state
}
export default membership