// import InflowOutflow from '../models/InflowOutflow';
// import db from '../database/index';

export const createFlowItem =  async (
	value: number, 
	description: string,
) : Promise<any> => {
	console.log(value, description);
};

export const getWallet = async (
	token: string,
) : Promise<any> => {
	console.log('getting wallet with token', token);
};