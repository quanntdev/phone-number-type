import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsNumber,
  IsIn,
  IsEmail,
  IsBoolean,
  IsDateString,
  Validate,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../../common/decorators/match.decorator';

export class UpdateMyProfileDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Hapo' })
  first_name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Hapo' })
  last_name: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  gender: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: '2016-10-14' })
  birth_of_date: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'admin@haposoft.com' })
  email: string;

  @IsOptional()
  @IsOptional()
  @ApiProperty({ example: '0987654321' })
  phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Hapo' })
  address: string;

  @ApiProperty({ required: false, type: 'file', format: 'binary' })
  @IsOptional()
  profileImg: string;
}
