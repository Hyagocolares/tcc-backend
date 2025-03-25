// src/config/environment.js
const environment = {
  server: {
    host: process.env.SERVER_HOST || '127.0.0.1',
    port: process.env.SERVER_PORT || 3003,
    mode: process.env.SERVER_MODE || 'development',
  },
  database: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || '5432',
    name: process.env.DATABASE_NAME || 'postgres',
    schema: process.env.DATABASE_SCHEMA || 'ufra_requests',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '1234',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || true, // false true
    queryLogging: process.env.DATABASE_QUERY_LOGGING === 'true' || true,
  },
  mailtrap: {
    host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
    port: process.env.MAILTRAP_PORT || 2525,
    user: process.env.MAILTRAP_USER || '6ba9ac03902e18',
    pass: process.env.MAILTRAP_PASS || 'a73025a345322c',
    from: process.env.EMAIL_FROM || 'seuemail@dominio.com',
  }

}

export default environment