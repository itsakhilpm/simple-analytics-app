import http from '../services/http';
import {storage} from '../helpers/utils';
const actionTypes = {
    USER_LOGGED_IN:'USER_LOGGED_IN',
}
const userSignIn = (email, password, rememberMe) => dispatch =>{
    return http.post(`/signIn`, {email, password, rememberMe}).then((result)=>{
        if(result && result.token){
            storage.set('authToken', result.token, 'local');
            dispatch({
                payload:{
                    authorizationDone:true,
                },
                type: actionTypes.USER_LOGGED_IN,
            })
        }
    }).catch((error) =>{
    })
}

export { userSignIn };
