import { Module } from '@nestjs/common';
import { PhoneNumberController } from './phone-number.controller';
import { PhoneNumberService } from './phone-number.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber])],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService]
})
export class PhoneNumberModule {}
