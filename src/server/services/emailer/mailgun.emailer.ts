import * as nodemailer from 'nodemailer';
import * as mailgunTransport from 'nodemailer-mailgun-transport';
import * as Mail from 'nodemailer/lib/mailer/index';
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '../../environment';
import { EmailerService } from './emailer.service';

export class MailgunEmailer extends EmailerService {
  protected mailer: Mail = nodemailer.createTransport(
    mailgunTransport({
      auth: {
        api_key: MAILGUN_API_KEY,
        domain: MAILGUN_DOMAIN,
      },
    }),
  );
}
