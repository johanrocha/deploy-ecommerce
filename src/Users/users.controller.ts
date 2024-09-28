import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  Headers,
  // UseGuards,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { User } from './user.interface';
//import { AuthGuard } from 'src/Auth/auth-guard.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';

import { UserDto } from './user.dto';
import { AuthGuard } from 'src/Auth/auth-guard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/Auth/roles.guard';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    //   private readonly usersDbService: UsersDbService,
  ) {}
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(
    @Query('name') name?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (name) {
      //   return this.usersService.getUsersByName(name);
    }
    return this.usersService.getUsers(page, limit);
  }
  /*
  // : Request & { now: string }
  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: UserDto, @Req() request: Request & { now: string }) {
    console.log('dentro del endpoint', request.now);
    return this.usersService.createUser(user);
    // return this.usersDbService.saveUser(user);
    // { ...user, createdAt: request.now }
  }
*/
  @Get('profile')
  //@UseGuards(AuthGuard)
  getUserProfile(@Headers('token') token?: string) {
    if (token !== '1234') {
      return 'sin acceso';
    }
    return 'este endpoint devuelve un profile del usuario';
  }

  @Get('profile/images')
  // @UseGuards(AuthGuard)
  getUserImages() {
    return 'este endpoint devuelve las imagenes del usuario';
  }

  @HttpCode(418)
  @Get('coffee')
  // @UseGuards(AuthGuard)
  getCoffee() {
    return 'no se hacer cafe, soy una tetera';
  }

  @Get('message')
  //@UseGuards(AuthGuard)
  getMessage(@Res() response: Response) {
    response.status(200).send('Hola, mundo!');
  }

  @Get('request')
  // @UseGuards(AuthGuard)
  getRequest(@Req() request: Request) {
    console.log(request);
    return 'esta ruta loguea el request';
  }

  @Get(':id')
  //@UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  //@UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: User) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  //@UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
