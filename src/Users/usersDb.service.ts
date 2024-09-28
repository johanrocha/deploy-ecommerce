import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersDbService {
  constructor() {} //    @InjectRepository(Users) private userRepository: Repository<Users>,

  async saveUser(user: Users) {
    //   return await this.userRepository.save(user);
  }
}
