const initialState =null

const addresses =(state=initialState,action)=>{
    if(action.type =='SET_ADDRESSES'){
        return state=action.playload
    }
    return state
}
export default addresses