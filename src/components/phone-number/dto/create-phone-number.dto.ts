import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Validate } from "class-validator";
import { CheckPhoneNumber } from "src/common/validatorContraints/checkPhoneNumber";
import { CheckPhoneType } from "src/common/validatorContraints/checkPhoneType";

export class CreatePhoneNumberDto {
  @Validate(CheckPhoneNumber)
  @IsString()
  @ApiProperty({ example: '0123456789' })
  phone: string;
}