import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointmentsRoutes';
import usersRouter from '@modules/users/infra/http/routes/usersRoutes';
import sessionsRouter from '@modules/users/infra/http/routes/sessionsRoutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);


export default routes;
