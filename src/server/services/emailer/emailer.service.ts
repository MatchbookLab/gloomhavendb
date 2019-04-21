import { Injectable } from '@angular/core';
import { SentMessageInfo } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import * as Mail from 'nodemailer/lib/mailer/index';
import { DEFAULT_EMAIL_FROM } from '../../environment';

export interface ExtraEmailerOptions {
  replyTo?: string;
  attachments?: Attachment[];
}

@Injectable()
export class EmailerService {
  fromEmail = DEFAULT_EMAIL_FROM;
  protected mailer: Mail;

  constructor() {
    setTimeout(() => {
      if (!this.mailer) {
        throw new Error('Cannot inject `Emailer` directly');
      }
    });
  }

  async sendMail(mailOptions: Mail.Options): Promise<SentMessageInfo> {
    if (!mailOptions.from) {
      mailOptions.from = this.fromEmail;
    }

    try {
      return await this.mailer.sendMail(mailOptions);
    } catch (err) {
      console.error(err);

      throw err;
    }
  }
}
