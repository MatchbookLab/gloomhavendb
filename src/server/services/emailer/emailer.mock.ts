import { SentMessageInfo } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer/index';
import { EmailerService } from './emailer.service';

export class EmailerMock extends EmailerService {
  mailer = <any>{};

  async sendMail(mailOptions: Mail.Options): Promise<SentMessageInfo> {
    return { mockData: true };
  }
}
