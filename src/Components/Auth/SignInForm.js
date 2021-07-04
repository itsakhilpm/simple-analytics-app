import React, { useState } from 'react';
import { Button, Form, Grid, Header } from 'semantic-ui-react';
import { userSignIn } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { storage } from '../../helpers/utils';

function SignInForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
    const history = useHistory();
    const userAuthenticated = useSelector(state=>state.user.userAuthenticated);
	const handleFormSubmit = () => {
		dispatch(userSignIn(email, password))
	};
    if(userAuthenticated || storage.get("authToken", "local")){
        history.push('/dashboard')
    }
	return (
        <section>
		<Grid textAlign='center' verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Form size="large" onSubmit={handleFormSubmit}>
					<Header as="h2" textAlign="center">
						Log-in to your account
					</Header>
					<Form.Input
						fluid
						icon="user"
						iconPosition="left"
						placeholder="E-mail address"
						name="email"
						value={email}
						type="text"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<Form.Input
						fluid
						icon="lock"
						iconPosition="left"
						placeholder="Password"
						type="password"
						name="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<Button fluid size="large" type="submit">
						Login
					</Button>
				</Form>
			</Grid.Column>
		</Grid>
        </section>
	);
}
export default SignInForm;
