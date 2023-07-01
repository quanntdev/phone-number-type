import { Inject, Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { I18nService } from 'nestjs-i18n';

@ValidatorConstraint({ name: 'CheckPhoneNumber', async: false })
@Injectable()
export class CheckPhoneNumber implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if((text || text !== "" ) && text.length == 10 ) {
        return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return "Phone number must have 10 digits"
  }
}
