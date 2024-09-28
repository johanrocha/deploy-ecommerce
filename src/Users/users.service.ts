import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';
import { Users } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }
  getUser(id: string) {
    return this.usersRepository.getById(id);
  }

  createUser(user: any) {
    return this.usersRepository.createUser(user);
    //user: Omit<User, 'id'>
  }

  updateUser(id: string, user: any) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
