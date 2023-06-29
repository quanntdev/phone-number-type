import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';
import { FORGOT_PASSWORD_TEMPLATES } from 'src/constants';
import config from 'src/config';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async forgotPasswordMailler(
    toUserEmail: string,
    toUserName: string,
    time: string,
    token: string,
  ) {
    await this.mailerService.sendMail({
      to: toUserEmail,
      subject: 'Forgot Password',
      template: FORGOT_PASSWORD_TEMPLATES,
      context: {
        userName: toUserName,
        userEmail: toUserEmail,
        time: time,
        token: token,
        url: `${config.FRONTEND_URL}/change-password?token=${token}`
      },
    });
  }
}
