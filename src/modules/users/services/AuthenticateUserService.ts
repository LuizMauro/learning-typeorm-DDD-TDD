import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppErros';
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
){}

  public async execute({ email, password }: IRequest): Promise<IResponse>{

    const user = await this.usersRepository.findByEmail(email);


    if(!user){
      throw new AppError('Email não existe', 401);
    }

    const passwordMathced = await compare(password, user.usePasswordHash);

    if(!passwordMathced){
      throw new AppError('Email ou senha incorretos', 401);
    }

    //Usuario tudo ok

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.useID,
      expiresIn: expiresIn,
    });

    return {user, token}

  }
}


export default AuthenticateUserService;
