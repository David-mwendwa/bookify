/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_PWD: 'TfvWue1TgXmqDYbS',
    MONGO_URI:
      'mongodb+srv://techdave:TfvWue1TgXmqDYbS@cluster0.uxfwa3a.mongodb.net/bookify?retryWrites=true&w=majority',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
