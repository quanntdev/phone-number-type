import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PhoneNumberService } from './phone-number.service';
import { PaginationQuery } from 'src/common/dtos';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';

@ApiTags('Phone Number')
@Controller('api/phone-number')
export class PhoneNumberController {
  constructor(private readonly phoneNumberService: PhoneNumberService) {}

  @Get()
  async findAll(@Query() pagination: PaginationQuery) {
    return await this.phoneNumberService.findAll(pagination);
  }

  @Post()
  async create(
    @Body() body: CreatePhoneNumberDto,
  ) {
    return await this.phoneNumberService.create(body);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.phoneNumberService.remove(+id);
  }
}
