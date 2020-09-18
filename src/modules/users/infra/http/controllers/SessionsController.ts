import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';


export default class SessionsController {

    public async create(request: Request, response: Response): Promise<Response>{
        const usersRepository = new UsersRepository();
        const { email, password } = request.body;

        const authenticateUserService = container.resolve(AuthenticateUserService);

        const { user, token} = await authenticateUserService.execute({
        email,
        password
        });

        delete user.usePasswordHash;

        return response.json({ user, token })
    }


}