import { Router } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

const usersRouter = Router();


usersRouter.get('/', async (request, response) => {
  
    return response.send();
});

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
    const { useName, useEmail, usePassword } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      useName,
      useEmail,
      usePasswordHash: usePassword
    })


    return response.json(user);
});


export default usersRouter;
