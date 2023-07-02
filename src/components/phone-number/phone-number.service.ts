import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneNumber } from 'src/entities';
import { Brackets, Repository } from 'typeorm';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { checkMysqlError } from 'src/common/validatorContraints/checkMysqlError';
import {
  MOBIPHONE_PHONE,
  PHONE_NAME,
  PHONE_TYPE,
  VIETTEL_PHONE,
  VINAPHONE_PHONE,
} from 'src/constants/phoneType';
import { SUCCESS_CODES } from 'src/constants/successCodes';
import { PaginationQuery, PaginationResponseWithTotalData } from 'src/common/dtos';

@Injectable()
export class PhoneNumberService {
  constructor(
    @InjectRepository(PhoneNumber)
    private readonly phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  async create(body: CreatePhoneNumberDto) {
    try {
      const { phone } = body;
      const formattedPhone = this.formatPhoneNumber(phone);
      const phoneOperator = this.getTelePhoneOperator(formattedPhone);
      if (!phoneOperator) {
        throw new BadRequestException('Cannot find Phone Number Operator');
      }

      const checkPhone = await this.phoneNumberRepository.findOne({where: {phone: formattedPhone}})
      if(checkPhone) {
        throw new BadRequestException('This Phone has been created');
      }
      const phoneData = {
        phone: formattedPhone,
        type_id: +phoneOperator,
      };

      const data = await this.phoneNumberRepository.save(phoneData);

      return {
        data: {
          ...data,
          phoneOperator: PHONE_NAME[+phoneOperator],
        },
        message: SUCCESS_CODES.CREATE_SUCCESSFULLY,
      };
    } catch (e) {
      checkMysqlError(e);
    }
  }

  async findAll(pagination: PaginationQuery) {
    try {
      const { offset = 0, limit = 0, keyword } = pagination;
      const data = this.phoneNumberRepository
        .createQueryBuilder('phone')
        .orderBy('phone.id', 'DESC')
        .skip(offset)
        .take(limit);

      if (keyword) {
        data.andWhere(
          new Brackets((qr) => {
            qr.where('phone.phone LIKE :keyword', {
              keyword: `%${keyword}%`,
            });
          }),
        );
      }

      const [phone, count] = await data.getManyAndCount();
      const response = new PaginationResponseWithTotalData<any>(
        phone,
        count,
      );

      return {
        data: response,
      };
    } catch (e) {
      checkMysqlError(e);
    }
  }

  async remove(id: number) {
    try {
        const phone = await this.phoneNumberRepository.findOne({where: {id: id}})
        if(!phone) {
            throw new NotFoundException("Cannot find phone number")
        } 

        await this.phoneNumberRepository.softDelete({id})

        return {
            data: [],
            message: SUCCESS_CODES.DELETE_SUCCESSFULLY
        }
    } catch(e) {
        checkMysqlError(e)
    }
  }

  protected formatPhoneNumber = (phone: string) => {
    let convertedString = '';
    for (let i = 0; i < phone.length; i++) {
      if (isNaN(parseInt(phone[i]))) {
        convertedString += '0';
      } else {
        convertedString += phone[i];
        let j = i + 1;
        while (j < phone.length && !isNaN(parseInt(phone[j]))) {
          convertedString += phone[j];
          j++;
        }
        i = j - 1;
      }
    }
    return convertedString;
  };

  protected getTelePhoneOperator = (phone: string) => {
    const phonePrefix = phone.slice(0, 3);

    const operatorMap = {
      [PHONE_TYPE.MOBIFONE]: MOBIPHONE_PHONE,
      [PHONE_TYPE.VIETTEL]: VIETTEL_PHONE,
      [PHONE_TYPE.VINAPHONE]: VINAPHONE_PHONE,
    };

    for (const prefix in operatorMap) {
      if (operatorMap[prefix].includes(phonePrefix)) {
        return prefix;
      }
    }

    return false;
  };
}
