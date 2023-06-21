import { Inject, Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { I18nService } from 'nestjs-i18n';

@ValidatorConstraint({ name: 'isDateString', async: false })
@Injectable()
export class IsDateString implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return !!text && Boolean(text.match(/^(\d{4}-\d{2}-\d{2})$/g)) && Boolean(Date.parse(text));
  }

  defaultMessage(args: ValidationArguments) {
    return "not Date String"
  }
}
