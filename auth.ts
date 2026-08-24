import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const allowedLogin = "jellewijma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    signIn({ profile }) {
      const login = profile && "login" in profile ? String(profile.login) : "";
      return login.toLowerCase() === allowedLogin;
    },
    jwt({ token, account, profile }) {
      if (account?.provider === "github" && account.access_token) {
        token.githubAccessToken = account.access_token;
      }

      if (profile && "login" in profile) {
        token.githubLogin = String(profile.login).toLowerCase();
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.login = String(token.githubLogin ?? "");
      }

      return session;
    },
  },
  trustHost: true,
});
