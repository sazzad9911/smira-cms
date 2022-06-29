const initialState =null;

const userInfo=(state=initialState,action)=>{
    if(action.type === 'SET_USER_INFO'){
        return state=action.playload
    }
    return state
};
export default userInfo