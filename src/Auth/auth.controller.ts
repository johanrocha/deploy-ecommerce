import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { AuthService } from 'src/Auth/auth.service';
import { LoginUserDto, UserDto } from 'src/Users/user.dto';
import { Users } from 'src/Users/user.entity';
@ApiTags('Auth')
//@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAuth() {
    return this.authService.getAuth();
  }
  @Post('signup')
  signup(@Body() user: UserDto) {
    console.log('entro signup');
    return this.authService.signup(user);
  }

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
