/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_PWD: 'TfvWue1TgXmqDYbS',
    MONGO_URI:
      'mongodb+srv://techdave:TfvWue1TgXmqDYbS@cluster0.uxfwa3a.mongodb.net/bookify?retryWrites=true&w=majority',

    STRIPE_API_KEY:
      'pk_test_51Imu8iKOyrEmScQWPjLK1SnUf9PbG8rllu8jmde1hV3ACQ6Qgmah6LUbIY6ihb89T4drjJvpcopn6V5HMwKvZEef00WiY46IBc',
    STRIPE_SECRET_KEY:
      'sk_test_51Imu8iKOyrEmScQW3cepN6ppj7EXKrrhf3VTtEkBihn9Kt2o8S5PH4Or5w7VARuWOmF6HTsbU8LrbiT2g6oGFnid00mvREAaRm',
    // STRIPE_WEBHOOK_SECRET:
    //   'whsec_ab30dea7e2d1614b3a156c3f35b6529a44cb28b9f139638074dba87039a245cb',
    STRIPE_WEBHOOK_SECRET: 'whsec_Q6VUyFK5YrhkFIUCYklgyO0Hkfg0uWbl',

    CLOUDINARY_CLOUD_NAME: 'techdave',
    CLOUDINARY_API_KEY: '739477856127672',
    CLOUDINARY_API_SECRET: 'tCQKDpHPjSQ3buzVMUbm_O_Bab4',

    NEXTAUTH_SECRET: 'Xn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y',
    NEXTAUTH_URL: 'https://bookify.vercel.app',

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
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
