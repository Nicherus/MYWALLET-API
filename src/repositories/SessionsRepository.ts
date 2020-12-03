import db from '../database/index';
import Session from '../models/Session';
import { v4 as uuid } from 'uuid';

export const createSession = async (
	id: number
) : Promise<Session | null> => {
	
	try{
		const token = uuid();
		const session = new Session(id, token);
		await db.query(`
            INSERT INTO sessions (id, token)
            VALUES ($1, $2)`,
		[id, token]
		);
		return session;
	} catch (error) {
		console.log(error.message);
		return null;
	}
};


export const getUserIdByToken = async (
	token: string
) : Promise<number | null> => {
	try{
		const session = await db.query(`
			SELECT id FROM sessions
			WHERE token = $1
			`,
		[token]
		);
		return session.rows[0].id;
	} catch(error){
		console.log(error);
		return null;
	}
};