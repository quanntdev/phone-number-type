import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isEmail
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@ValidatorConstraint({ name: 'CheckIsEmail', async: false })
@Injectable()
export class CheckIsEmail implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if ((value == "")  || isEmail(value)) {
      return true;
    }
    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Not Email";
  }
}
