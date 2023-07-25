import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PhoneNumberService } from './phone-number.service';
import { PaginationQuery } from 'src/common/dtos';
import { CreatePhoneNumberDto, CreatePhoneNumberDto2 } from './dto/create-phone-number.dto';

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

  @Post("/test-actions")
  async createAction(
    @Body() body: CreatePhoneNumberDto,
  ) {
    return await this.phoneNumberService.create(body);
  }

  @Post("/test-actions-2")
  async createAction2(
    @Body() body: CreatePhoneNumberDto2,
  ) {
    return await body;
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.phoneNumberService.remove(+id);
  }
}
