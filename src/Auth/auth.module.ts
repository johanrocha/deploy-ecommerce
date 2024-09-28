import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Users/user.entity';
import { UsersModule } from 'src/Users/users.module';
import { UsersRepository } from 'src/Users/users.repository';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], //UsersModule
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
