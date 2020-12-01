import { Router } from 'express';
import userRouter from './user.routes';
import walletRouter from './wallet.routes';

const routes = Router();

routes.use('/api/user', userRouter);
routes.use('/api/wallet', walletRouter);

export default routes;