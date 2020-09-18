import { Router } from 'express';

import authenticated from '@modules/users/infra/http/middlewares/Authenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentRouter = Router();
const appointmentController =  new AppointmentController();

appointmentRouter.use(authenticated);

appointmentRouter.post('/', appointmentController.create );

export default appointmentRouter;
