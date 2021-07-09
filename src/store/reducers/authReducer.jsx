
export const AUTH_SUCCESS = "auth/AUTH_SUCCESS";

const initState = {
    isAuthenticated: false,
    user:null,
    loginError:null,
    signupError:null,
    logoutError:null
}

const authReducer = (state = initState, action) =>{
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state, isAuthenticated: true, user: action.user}
        default:
            return state;
    }
}

export default authReducer;