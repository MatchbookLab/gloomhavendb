import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer/index';
import * as SmtpTransport from 'nodemailer/lib/smtp-transport';
import { IS_DOCKER } from '../../environment';
import { EmailerService } from './emailer.service';

export class MailhogEmailer extends EmailerService {
  protected mailer: Mail = nodemailer.createTransport(
    new SmtpTransport({
      url: `smtp://${IS_DOCKER ? 'mailhog' : 'localhost'}:1025`,
    }),
  );
}
