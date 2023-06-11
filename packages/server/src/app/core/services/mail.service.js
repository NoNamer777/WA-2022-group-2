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

  /** @return {void} */
  initialize() {
    const mailServerEmailAddress = process.env.MAIL_SERVER_EMAIL_ADDRESS;
    const mailServerPassword = process.env.MAIL_SERVER_PASSWORD;
    const emailTemplatesPath =
      process.env.EMAIL_TEMPLATES_PATH || './packages/server/src/public/assets/email-templates';

    if (!mailServerPassword || !mailServerEmailAddress) {
      throw Error(
        'Email address, or email application password for sending emails is not defined.'
      );
    }
    this.#mailTransporter = createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: mailServerEmailAddress,
        pass: mailServerPassword
      }
    });

    this.#mailTransporter.use(
      'compile',
      hbs({
        viewEngine: {
          partialsDir: emailTemplatesPath,
          defaultLayout: false
        },
        viewPath: emailTemplatesPath,
        extName: '.template.html'
      })
    );
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
