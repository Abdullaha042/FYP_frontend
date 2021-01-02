const loggedReducer = (state=false,action)=>{

    switch(action.type){
        case 'SIGN_IN':
            return !state;//returning opposite of state(i.e true in this case)

        default:
            return false;
    }
}

export default loggedReducer;