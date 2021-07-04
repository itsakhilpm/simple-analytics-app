import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

function Header() {
    // const userAuthenticated = useSelector(state=>state.auth.userAuthenticated)
	return (
		<div className="top-nav">
			<Menu secondary>
				<Container>
					<Menu.Item className="logo">Dashboard</Menu.Item>
					<Menu.Item name="submit">Submit</Menu.Item>
					<Menu.Menu position="right">
						<Menu.Item name="signup"><Link to="/login">Login</Link></Menu.Item>
					</Menu.Menu>
				</Container>
			</Menu>
		</div>
	);
}
export default Header;
