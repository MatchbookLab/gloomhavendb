import * as Mail from 'nodemailer/lib/mailer/index';
import { EmailerService } from './emailer.service';

export class ProductionEmailer extends EmailerService {
  protected mailer: Mail = <any>{};
}
