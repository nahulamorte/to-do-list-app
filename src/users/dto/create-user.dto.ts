import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Min, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;


}