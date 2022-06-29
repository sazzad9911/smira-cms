const initialState=null

const banner =(state=initialState,action)=>{
    if(action.type=='SET_BANNER'){
        return state=action.playload
    }
    return state
}
export default banner