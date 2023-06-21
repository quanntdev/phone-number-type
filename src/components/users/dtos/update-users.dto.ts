import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsIn,
  IsEmail,
  IsBoolean,
  MinLength,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNewUser } from './users.dto';
import { Match } from 'src/common/decorators/match.decorator';

export class UpdateUsers extends CreateNewUser {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'admin@haposoft.com' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Hapo@12345' })
  password: string;

  @IsString()
  @IsOptional()
  @Match('password')
  @ApiProperty({ example: 'Hapo@12345' })
  confirm_password: string;

  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3])
  @ApiProperty({ example: 1 })
  role: number;

  lang:string;
}
