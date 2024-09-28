import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
//import { UsersDbService } from './usersDb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], // para conectar orm al user
  controllers: [UsersController],
  providers: [UsersService, UsersRepository], // , UsersRepository, UsersDbServiceagregamos el servicio de base de datos

  exports: [UsersRepository], //UsersRepository
})
export class UsersModule {}
