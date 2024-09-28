import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const users = await this.usersRepository.find({ take: limit, skip: skip });

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (!user) {
      return `No se encontro el usuario con id: ${id}`;
    }
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async createUser(user: Partial<Users>): Promise<Partial<Users>> {
    const newUser = await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });

    const { password, ...userNoPassword } = dbUser;

    return userNoPassword;
  }

  async updateUser(id: string, user: Users): Promise<Partial<Users>> {
    await this.usersRepository.update(id, user);

    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = updatedUser;

    return userNoPassword;
  }

  async deleteUser(id: string): Promise<Partial<Users>> {
    const user = await this.usersRepository.findOneBy({ id });

    this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;

    return userNoPassword;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
