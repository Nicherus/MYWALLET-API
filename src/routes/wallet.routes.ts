import { Router } from 'express';

const walletRouter = Router();

walletRouter.post('/inflow', async (request, response) => {
	response.status(200).send('Inflow Route');
});

walletRouter.post('/outflow', async (request, response) => {
	response.status(200).send('Outflow Route');
});

walletRouter.get('/wallet', async (request, response) => {
	response.status(200).send('Wallet Data Route');
});

export default walletRouter;