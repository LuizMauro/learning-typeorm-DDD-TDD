import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository:Repository<User>;

  constructor(){
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined>{
      const user = await this.ormRepository.findOne({where: { useID: id }});

      return user;
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({where: { useEmail: email }});

    return user;
  }



  public async create({ useEmail, useName, usePasswordHash}: ICreateUserDTO): Promise<User>{

    const user = this.ormRepository.create({
        useEmail: useEmail,
        useName: useName,
        usePasswordHash: usePasswordHash
    });


    await this.ormRepository.save(user);

    return user;

  }


  public async save(user: User): Promise<User>{
      return this.ormRepository.save(user);
  } 
  


}

export default UsersRepository;
