import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader,Dimmer } from 'semantic-ui-react'

import { storage } from './helpers/utils';
import Header from './Components/shared/Header';
import Router from './Router';

function App() {
    const dispatch = useDispatch();
    const loader = useSelector(state=>state.dashboard.loading);
    useEffect(()=>{
        let token = storage.get('authToken', 'local');
        if(token){
            dispatch({
                payload:{
                    authorizationDone:true,
                },
                type: 'USER_LOGGED_IN',
            })
        }
    }, [])
	return (
		<div>
			<Header />
            {loader && (<Dimmer inverted active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>)}
			<Router />
		</div>
	);
}

export default App;
