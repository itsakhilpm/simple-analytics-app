import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../../helpers/utils';
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
	const userAuthenticated = useSelector(
		(state) => state.user.userAuthenticated
	);
    const logOutUser =() =>{
        dispatch({
            payload:{
                authorizationDone:false,
            },
            type: 'USER_LOGGED_IN',
        })
        storage.unset('authToken', 'local');
        history.push('/login');
    }
	return (
		<div className="top-nav">
			<Menu secondary>
				<Container>
					<Menu.Item className="logo">Dashboard</Menu.Item>
					<Menu.Item name="submit">DummyLink</Menu.Item>
					<Menu.Menu position="right">
						{!userAuthenticated ? (
							<Menu.Item name="login">
								<Link to="/login">Login</Link>
							</Menu.Item>
						) : (
							<Menu.Item name="logout" onClick={()=>{logOutUser()}}>Logout</Menu.Item>
						)}
					</Menu.Menu>
				</Container>
			</Menu>
		</div>
	);
}
export default Header;
