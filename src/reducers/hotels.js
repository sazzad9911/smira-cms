const initialState =null;

const  hotels=(state=initialState,action)=>{
    if(action.type === 'SET_HOTELS'){
        return state=action.playload
    }
    return state
};
export default hotels