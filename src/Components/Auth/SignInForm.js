import React, { useState } from 'react';
import { Button, Checkbox, Form, Grid, Header } from 'semantic-ui-react';
import { userSignIn } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { storage, isValidEmail, isValidPassword } from '../../helpers/utils';

function SignInForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [emailObj, setEmailObj] = useState({
		emailId: '',
		isEmailValid: true,
	});
	const [isCredentialsWrong, setIsCredentialsWrong] = useState(false);

	const [passwordObj, setPasswordObj] = useState({
		password: '',
		isPasswordValid: true,
	});
	const [rememberMe, setRemeberMe] = useState(true);

	const userAuthenticated = useSelector(
		(state) => state.user.userAuthenticated
	);
	const handleFormSubmit = () => {
        if(emailObj.emailId && passwordObj.password){
            dispatch({
                payload:{
                    loading:true,
                },
                type:'LOADER',
            })
            dispatch(
                userSignIn(emailObj.emailId, passwordObj.password, rememberMe)
            ).catch((error) => {
                setIsCredentialsWrong(true);
                dispatch({
                    payload:{
                        loading:false,
                    },
                    type:'LOADER',
                })
            });
        }
	};
	const handleInputChange = (e) => {
		const {
			target: { value, name },
		} = e;
		switch (name) {
			case 'email':
				setEmailObj((prevState) => ({ ...prevState, emailId: value }));
				break;
			case 'password':
				setPasswordObj((prevState) => ({
					...prevState,
					password: value,
				}));
				break;
			default:
				break;
		}
	};
	const handleInputBlur = (e) => {
		const {
			target: { value, name },
		} = e;
		setIsCredentialsWrong(false);
		switch (name) {
			case 'email':
				const isEmailValid = isValidEmail(value);
				setEmailObj((prevState) => ({ ...prevState, isEmailValid }));
				break;
			case 'password':
				const isPasswordValid = isValidPassword(value);
				setPasswordObj((prevState) => ({
					...prevState,
					isPasswordValid,
				}));
				break;
			default:
				break;
		}
	};
	if (userAuthenticated || storage.get('authToken', 'local')) {
		history.push('/dashboard');
	}
	return (
		<section>
			<Grid textAlign="center" verticalAlign="middle">
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
							value={emailObj.emailId}
							type="text"
							onChange={(e) => {
								handleInputChange(e);
							}}
							onBlur={(e) => {
								handleInputBlur(e);
							}}
						/>
						<Form.Input
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
							name="password"
							value={passwordObj.password}
							onChange={(e) => {
								handleInputChange(e);
							}}
							onBlur={(e) => {
								handleInputBlur(e);
							}}
						/>
						<Form.Field>
							<Checkbox
								label="Remember Me"
								checked={rememberMe}
								onClick={() => {
									setRemeberMe(!rememberMe);
								}}
							/>
						</Form.Field>
						{!emailObj.isEmailValid && (
							<p className="error-message">
								Please check the email
							</p>
						)}
						{!passwordObj.isPasswordValid && (
							<p className="error-message">
								Please check the password
							</p>
						)}
						{isCredentialsWrong && (
							<p className="error-message">
								Please check the credentials
							</p>
						)}
						<Button
							fluid
							basic
							size="large"
							type="submit"
							color="teal"
							disabled={
								!emailObj.isEmailValid ||
								!passwordObj.isPasswordValid
							}
						>
							Login
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		</section>
	);
}
export default SignInForm;
