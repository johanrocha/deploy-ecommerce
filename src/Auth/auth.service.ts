import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from 'src/Users/users.repository';
import * as bcrypt from 'bcrypt';

import { Users } from 'src/Users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth() {
    return 'auth list';
  }
  // registro del usuario
  async signup(user: Partial<Users>) {
    const { email, password } = user;
    if (!email || !password) throw new BadRequestException('Data is required');
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) throw new BadRequestException('email is registered');

    // proceso de registro
    // hashear la password
    const hashedPassword = await bcrypt.hash(password, 10);

    // guardar el usuario en la bd
    return await this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    console.log('signing in');
    if (!email || !password) return 'Data is required';

    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) throw new BadRequestException('Invalid Credentials');
    // compracion de contrase;as
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new BadRequestException('Invalid Credentials');

    // fira del token
    const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin };

    // generamos el token
    const token = this.jwtService.sign(payload);
    // entregamos la respuesta
    return {
      message: 'Logged-in User',
      token,
    };
  }

  //    if (!user) return 'Invalid Credentials';
  //    if (user.password === password) return 'Logged In';
  //    return 'Invalid Credentials';
}
