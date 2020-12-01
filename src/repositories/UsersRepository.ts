import User from '../models/User';
import db from '../database/index';
import bcrypt from 'bcrypt';

export const createUser =  async (
	email: string, 
	username: string, 
	password: string,
) : Promise<User | null> => {

	const encryptedPassword = bcrypt.hashSync(password, 10);
	try {
		const user = new User(email, username, password);
		await db.query(`
			INSERT INTO users (username, email, password)
			VALUES ($1, $2, $3)`,
		[username, email, encryptedPassword]
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
		const {username, email} = loginData;
		return ({
			email: email,
			username: username,
		});
	} else{
		return false;
	}
};

export const checkEmailPasswordMatch = async (
	email: string, 
	password: string,
) : Promise<User | null | undefined> => {

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