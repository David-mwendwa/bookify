/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_PWD: 'TfvWue1TgXmqDYbS',
    MONGO_URI:
      'mongodb+srv://techdave:TfvWue1TgXmqDYbS@cluster0.uxfwa3a.mongodb.net/bookify?retryWrites=true&w=majority',

    CLOUDINARY_CLOUD_NAME: 'techdave',
    CLOUDINARY_API_KEY: '739477856127672',
    CLOUDINARY_API_SECRET: 'tCQKDpHPjSQ3buzVMUbm_O_Bab4',

    NEXTAUTH_SECRET: 'Xn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y',
    NEXTAUTH_URL: 'http://localhost:3000/',

    SMTP_HOST: 'sandbox.smtp.mailtrap.io',
    SMTP_PORT: 2525,
    SMTP_USER: 'e4efcf7267eebc',
    SMTP_PASSWORD: 'f626e6efccc2e1',
    SMTP_FROM_NAME: 'Bookify',
    SMTP_FROM_EMAIL: 'noreply@bookify.com',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
