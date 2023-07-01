import { Inject, Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { checkNumberInArray } from '../utils/checkNumberInArray';

@ValidatorConstraint({ name: 'CheckPhoneNumber', async: false })
@Injectable()
export class CheckPhoneType implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    if(checkNumberInArray(text, [1, 2, 3]) ) {
        return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return "Phone type must in [1, 2, 3]"
  }
}
