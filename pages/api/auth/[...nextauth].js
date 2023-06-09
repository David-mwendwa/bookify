import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '../../../models/user';
import dbConnect from '../../../config/dbConnect';

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    authorize: async (credentials) => {
      dbConnect(); // not needed
      const { email, password } = credentials;
      // Check if email and password is entered
      if (!email || !password) {
        throw new Error('Please enter email or password');
      }
      // Find user in the database
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new Error('Invalid Email or Password');
      }
      // Check if password is correct or not
      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        throw new Error('Invalid Email or Password');
      }
      return Promise.resolve(user);
    },
  }),
];

const callbacks = {
  jwt: async ({ token, user }) => {
    if (user) token.user = user;
    return Promise.resolve(token);
  },
  session: async ({ session, token }) => {
    session.user = token.user;
    return Promise.resolve(session);
  },
};

export default NextAuth({
  session: { jwt: true },
  secret: process.env.NEXTAUTH_SECRET,
  providers,
  callbacks,
});
