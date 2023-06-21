import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsDateString,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';;
import { CheckIsEmail } from 'src/common/validatorContraints/checkIsEmail';

export class GetDataWithIdParams {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: 1 })
  id: number;
}

export class CreateNewUser {
  @IsString()
  @Validate(CheckIsEmail)
  @ApiProperty({ example: 'admin@haposoft.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Hapo@12345' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Hapo@12345' })
  confirm_password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  role: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'Hapo' })
  first_name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Hapo' })
  last_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '0987654321' })
  phone: string;

  @IsOptional()
  @ApiProperty({ example: '2016-10-14' })
  birth_of_date: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: '2016-10-14' })
  date_of_joining: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Hapo' })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  gender: boolean;
}
