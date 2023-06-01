import { createTransport } from 'nodemailer';
import { TemplateEngine } from 'thymeleaf';

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

  /** @type {import('thymeleaf').TemplateEngine } */
  #thymeleafEngine;

  constructor() {
    this.#mailTransporter = createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: process.env.MAIL_SERVER_EMAIL_ADDRESS,
        pass: process.env.MAIL_SERVER_PASSWORD
      }
    });
    this.#thymeleafEngine = new TemplateEngine();
  }

  /**
   * @param options {{ to: string, subject: string, templatePath: string, templateContext: Record<string, any> }}
   * @return {Promise<void>}
   */
  async sendEmail(options) {
    const html = await this.#thymeleafEngine.processFile(
      options.templatePath,
      options.templateContext
    );

    await this.#mailTransporter.sendMail({
      from: 'info@wasted.nl.eu.org',
      html: html,
      ...options
    });
  }
}
