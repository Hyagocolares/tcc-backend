// src/services/emailService.ts
import nodemailer from 'nodemailer';
import environment from '../config/environment'

interface WelcomeEmailData {
  name: string;
  email: string;
  senha: string;
  instructions: string;
}

interface RequestEmailData {

}

const transport = nodemailer.createTransport({
  host: environment.mailtrap.host,
  port: environment.mailtrap.port,
  auth: {
    user: environment.mailtrap.user,
    pass: environment.mailtrap.pass
  }
} as nodemailer.TransportOptions);

export const sendWelcomeEmail = async (to: string, data: WelcomeEmailData): Promise<void> => {
  const mailOptions = {
    from: '"Seu Sistema" <no-reply@seusistema.com>',
    to,
    subject: 'Bem-vindo! Aqui estão seus dados de acesso',
    text: `
      Olá ${data.name},

      Seu cadastro foi realizado com sucesso!

      Dados de acesso:
      E-mail: ${data.email}
      senha: ${data.senha}

      ${data.instructions}

      Atenciosamente,
      Equipe do Sistema
    `,
    html: `
      <p>Olá ${data.name},</p>
      <p>Seu cadastro foi realizado com sucesso!</p>
      <p><strong>Dados de acesso:</strong><br>
         E-mail: ${data.email}<br>
         senha: ${data.senha}</p>
      <p>${data.instructions}</p>
      <p>Atenciosamente,<br>Equipe do Sistema</p>
    `
  };

  try {
    await transport.sendMail(mailOptions);
    console.log(`E-mail enviado com sucesso para ${to}`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${to}:`, error);
    throw error;
  }
}

export const sendResetPasswordEmail = async (to: string, token: string): Promise<void> => {
  const resetLink = `${environment.frontend.url}/reset-password?token=${token}`;
  const mailOptions = {
    from: '"Seu Sistema" <no-reply@seusistema.com>',
    to,
    subject: 'Recuperação de Senha',
    text: `
          Para recuperar sua senha, acesse o link:
          ${resetLink}
          Este link é válido por 15 minutos.
        `,
    html: `
          <p>Para recuperar sua senha, clique <a href="${resetLink}">aqui</a>.</p>
          <p>Este link é válido por 15 minutos.</p>
        `
  };

  try {
    await transport.sendMail(mailOptions);
    console.log(`E-mail de recuperação enviado para ${to}`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${to}:`, error);
    throw error;
  }

}

export const sendRequestTeacherEmail = async (to: string, data: RequestEmailData): Promise<void> => {
  const mailOptions = {
    from: '"Seu Sistema" <no-reply@seusistema.com>',
    to,
    subject: 'Request criada com sucesso!',
    text: ``,
    html: ``
  }

  try {
    await transport.sendMail(mailOptions);
    console.log(`E-mail de recuperação enviado para ${to}`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${to}:`, error);
    throw error;
  }
}

export const sendRequestCoordinatorEmail = async (to: string, data: RequestEmailData): Promise<void> => {
  const mailOptions = {
    from: '"Seu Sistema" <no-reply@seusistema.com>',
    to,
    subject: 'Request criada com sucesso!',
    text: ``,
    html: ``
  }

  try {
    await transport.sendMail(mailOptions);
    console.log(`E-mail de recuperação enviado para ${to}`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${to}:`, error);
    throw error;
  }
}

export const sendRequestDirectorEmail = async (to: string, data: RequestEmailData): Promise<void> => {
  const mailOptions = {
    from: '"Seu Sistema" <no-reply@seusistema.com>',
    to,
    subject: 'Request criada com sucesso!',
    text: ``,
    html: ``
  }

  try {
    await transport.sendMail(mailOptions);
    console.log(`E-mail de recuperação enviado para ${to}`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${to}:`, error);
    throw error;
  }
}