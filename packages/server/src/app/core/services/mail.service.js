import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

export class MailService {
  /** @return {MailService} */
  static instance() {
    if (MailService.#instance) return MailService.#instance;

    MailService.#instance = new MailService();

    return MailService.#instance;
  }

  /** @type {MailService} */
  static #instance;

  /** @type {import('nodemailer').Mailer} */
  #mailTransporter;

  #handlebarOptions = {
    viewEngine: {
      partialsDir: process.env.EMAIL_TEMPLATES_PATH,
      defaultLayout: false
    },
    viewPath: process.env.EMAIL_TEMPLATES_PATH,
    extName: 'template'
  };

  /** @return {void} */
  initialize() {
    const mailServerEmailAddress = process.env.MAIL_SERVER_EMAIL_ADDRESS;
    const mailServerPassword = process.env.MAIL_SERVER_PASSWORD;

    if (!mailServerPassword || !mailServerEmailAddress) {
      throw Error('Email address and password for sending emails are not defined.');
    }
    this.#mailTransporter = createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: process.env.MAIL_SERVER_EMAIL_ADDRESS,
        pass: process.env.MAIL_SERVER_PASSWORD
      }
    });

    this.#mailTransporter.use('compile', hbs(this.#handlebarOptions));
  }

  /**
   * @param options {{ to: string, subject: string, template: string, context: Record<string, any> }}
   * @return {Promise<void>}
   */
  async sendEmail(options) {
    await this.#mailTransporter.sendMail({
      from: '"Wasted" <info@wasted.nl.eu.org>',
      ...options
    });
  }
}
