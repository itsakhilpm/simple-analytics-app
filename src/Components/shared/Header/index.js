import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

function Header() {
	return (
		<div className="top-nav">
			<Menu secondary>
				<Container>
					<Menu.Item className="logo">Dashboard</Menu.Item>
					<Menu.Item name="submit">Submit</Menu.Item>
					<Menu.Menu position="right">
						<Menu.Item name="signup">Sign Up</Menu.Item>
					</Menu.Menu>
				</Container>
			</Menu>
		</div>
	);
}
export default Header;
