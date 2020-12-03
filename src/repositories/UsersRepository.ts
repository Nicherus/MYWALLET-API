import User from '../models/User';
import db from '../database/index';
import bcrypt from 'bcrypt';

import { createSession } from './SessionsRepository';

export const createUser =  async (
	email: string, 
	username: string, 
	password: string,
) : Promise<User | null> => {

	try {
		const user = new User(email, username, password);
		await db.query(`
			INSERT INTO users (username, email, password)
			VALUES ($1, $2, $3)`,
		[user.username, user.email, user.password]
		);
		await db.query(`
			INSERT INTO wallets (date, description, value)
			VALUES ($1, $2, $3)`,
		[[], [], []]
		);
		delete user.password;
		return user;
	} catch (error) {
		console.log(error.message);
		return null;
	}
};

export const login = async (
	emailInserted: string, 
	passwordInserted: string,
) : Promise<boolean | User> => {

	const loginData = await checkEmailPasswordMatch(emailInserted, passwordInserted);

	if(loginData){
		try{
			const {username, email} = loginData;
			const id = await getUserId(email);
			if(id){
				const session = await createSession(id);
				if(session){
					return ({
						email: email,
						username: username,
						token: session.token,
					});
				} else return false;
			} else return false;
		} catch(error){
			console.log(error);
			return false;
		}
	} else{
		return false;
	}
};

export const checkEmailPasswordMatch = async (
	email: string, 
	password: string,
) : Promise<User | null> => {

	try {
		const UserEmailMatch = await db.query(`
		SELECT * FROM users
		WHERE email = $1
		`,
		[email]
		);
		const passwordMatch = bcrypt.compareSync(password, UserEmailMatch.rows[0].password);
		if(passwordMatch){
			return UserEmailMatch.rows[0];
		}
		return null;
	} catch (error) {
		console.log(error.message);
		return(null);
	}
};

export const isInDatabase = async (
	username: string, 
	email: string,
) : Promise<boolean | null> => {

	try{
		const userMatch = await db.query(`
			SELECT * FROM users
			WHERE email = $1 OR username = $2
			`,
		[email, username]
		);
		return userMatch.rows.length ? true : false;
	} catch(error){
		console.log(error.message);
		return null;
	}
};

export const getUserId = async (
	email: string
) : Promise<number | null> => {
	try{
		const user = await db.query(`
			SELECT id FROM users
			WHERE email = $1
			`,
		[email]
		);
		return user.rows[0].id;
	} catch(error){
		console.log(error);
		return null;
	}
};