import db from '../database/index';
import dayjs from 'dayjs';
import Wallet from '../models/Wallet';
import { getUserIdByToken } from './SessionsRepository';

export const createFlowItem =  async (
	id: number,
	value: number, 
	description: string,
) : Promise<boolean> => {
	try{
		const date = dayjs().format('YYYY/MM/DD');
		await db.query(`
		UPDATE wallets
		SET date = array_append(date, $2),
			description = array_append(description, $3),
			value = array_append(value, $4)
		WHERE id = $1;`,
		[id, date, description, value]
		);
		return true;
	} catch(error){
		console.log(error);
		return false;
	}
};

export const getWallet = async (
	token: string,
) : Promise<Wallet[] | null> => {
	try{
		const id = await getUserIdByToken(token);
		if(id){
			const wallet = await db.query(`
			SELECT * FROM wallets
			WHERE id = $1`,
			[id]
			);
			return wallet.rows[0];
		}
		throw new Error('invalid token');
	} catch(error){
		console.log(error);
		return null;
	}
};