import { Router } from 'express';

import { createUser, login, isInDatabase } from '../repositories/UsersRepository';
import { validateUser } from '../Utils/validation';

const userRouter = Router();

userRouter.post('/sign-up', async (request, response) => {
	const { email, username, password, passwordConfirmation} = request.body;

	const validation = validateUser(email, username, password, passwordConfirmation);
	const { error } = validation;

	const userIsInDatabase = await isInDatabase(username, email);

	if(error){
		return response.status(400).send('Please, check the data you are sending');
	}

	if(userIsInDatabase){
		return response.status(409).send('Username or Email already on the database');
	}

	const user = await createUser(email, username, password);
	return response.status(201).json(user);

});

userRouter.post('/sign-in', async (request, response) => {
	const {email, password} = request.body;

	const loginData = await login(email, password);

	if(loginData){
		return response.status(200).json(loginData);
	} else{
		return response.status(401).send('User not found or wrong password');
	}

});

userRouter.post('/logout', async (request, response) => {
	response.status(200).send('Logout Route');
});

export default userRouter;