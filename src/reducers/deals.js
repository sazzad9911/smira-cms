const initialState =null;

const  deals=(state=initialState,action)=>{
    if(action.type === 'SET_DEALS'){
        return state=action.playload
    }
    return state
};
export default deals