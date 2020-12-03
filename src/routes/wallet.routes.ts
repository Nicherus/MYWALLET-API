import { Router } from 'express';
import { createFlowItem, getWallet } from 'src/repositories/WalletsRepository';
import { getUserIdByToken } from '../repositories/SessionsRepository';

const walletRouter = Router();

walletRouter.post('/inflow', async (request, response) => {
	const {value, description} = request.body;
	const token = request.headers['authorization'];
	if(token){
		try{
			const id = await getUserIdByToken(token);
			if(id){
				const flow = await createFlowItem(id, value, description);
				console.log(flow);
				if(flow){
					return response.status(201).send('Ok!');
				} else return response.status(400).send('Error');
			} else{
				throw new Error('token invalid');
			}
		} catch(error){
			console.log(error);
			return response.status(400).send('Error');
		}
	}
});

walletRouter.post('/outflow', async (request, response) => {
	const {value, description} = request.body;
	const token = request.headers['authorization'];
	if(token){
		try{
			const id = await getUserIdByToken(token);
			if(id){
				const flow = await createFlowItem(id, value, description);
				console.log(flow);
				if(flow){
					return response.status(201).send('Ok!');
				} else return response.status(400).send('Error');
			} else{
				throw new Error('token invalid');
			}
		} catch(error){
			console.log(error);
			return response.status(400).send('Error');
		}
	}
});

walletRouter.get('/', async (request, response) => {
	const token = request.headers['authorization'];
	if(token){
		try{
			const wallet = await getWallet(token);
			if(wallet){
				console.log(wallet);
				return response.status(200).send(wallet);
			}
			throw new Error('invalid token');
		} catch(error){
			console.log(error);
			return response.status(401).send('Error');
		}
	} else{
		return response.status(401).send('Error');
	}
});

export default walletRouter;