import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { CheckPhoneNumber } from "src/common/validatorContraints/checkPhoneNumber";
import { CheckPhoneType } from "src/common/validatorContraints/checkPhoneType";

export class CreateChannelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'testing-channel' })
  channelName: string;
}
