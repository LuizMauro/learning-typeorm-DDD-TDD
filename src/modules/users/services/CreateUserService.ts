import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErros';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  useName: string;
  useEmail: string;
  usePasswordHash: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    useName,
    useEmail,
    usePasswordHash,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(useEmail);

    if (checkUserExists) {
      throw new AppError('Email já utilizado!');
    }

    const hashedPassword = await hash(usePasswordHash, 8);

    const user = await this.usersRepository.create({
      useName,
      useEmail,
      usePasswordHash: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
