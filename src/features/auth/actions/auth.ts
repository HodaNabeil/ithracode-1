import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { env } from '@/config/env';
import { AUTH_ROUTES } from '@/constant/auth';

export const { handlers, signOut } = NextAuth({
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),

    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),

    Credentials({
      async authorize(credentials) {
        if (
          credentials?.email === 'admin@test.com' &&
          credentials?.password === '123456'
        ) {
          return {
            id: '1',
            email: 'admin@test.com',
            role: 'ADMIN',
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role || 'STUDENT';
      }

      if (account?.provider) {
        token.provider = account.provider;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: AUTH_ROUTES.SIGN_IN,
  },
});
