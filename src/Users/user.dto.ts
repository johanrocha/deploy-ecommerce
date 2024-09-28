import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPasword.decorator';

export class UserDto {
  /**
   * debe ser un string de entre 3 y 8 caracteres
   * @example 'test user01'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * debe ser un string y un email valido
   * @example 'testuser01@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * debe ser un string entre 8 y 15 caracteres, con al menos una minuscula, una mayuscula, un numero y un caracter especial
   *@example 'Mm$12345'
   */
  @IsStrongPassword(
    {
      minLength: 8, // Longitud mínima de 8 caracteres
      minUppercase: 1, // Al menos 1 letra mayúscula
      minLowercase: 1, // Al menos 1 letra minúscula
      minNumbers: 1, // Al menos 1 número
      minSymbols: 1, // Al menos 1 símbolo
    },
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.',
    },
  ) //longitud de 8 mayuscula, minuscula
  @MaxLength(15)
  password: string;
 /**
   * debe ser un string entre 8 y 15 caracteres, con al menos una minuscula, una mayuscula, un numero y un caracter especial
   *@example 'Mm$12345'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password']) // es el dtopassword
  confirmPassword: string;

  /**
   * debe ser tipo number
   *@example '987654321'
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * debe ser string entre 4 y 20 caracteres
   *@example 'PERU'
   */
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  country?: string;

  /**
   * debe ser string entre 3 y 8 caracteres
   *@example 'Calle Las Pizzas 234 - surco'
   */
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  /**
   * debe ser string entre 3 y 20 caracteres
   *@example 'Lima'
   */
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  city?: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;

  //min 17:21 para continuar
}

export class LoginUserDto extends PickType(UserDto, ['email', 'password']) {}
