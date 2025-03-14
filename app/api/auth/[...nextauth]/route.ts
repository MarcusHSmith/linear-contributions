import NextAuth from "next-auth";
import type { AuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

interface LinearProfile {
  id: string;
  name: string;
  email: string;
}

interface ExtendedSession extends Session {
  accessToken?: string;
}

const config: AuthOptions = {
  providers: [
    {
      id: "linear",
      name: "Linear",
      type: "oauth",
      clientId: process.env.LINEAR_CLIENT_ID!,
      clientSecret: process.env.LINEAR_CLIENT_SECRET!,
      authorization: {
        url: "https://linear.app/oauth/authorize",
        params: {
          scope: "read",
        },
      },
      token: "https://api.linear.app/oauth/token",
      userinfo: {
        url: "https://api.linear.app/graphql",
        async request({ tokens }) {
          console.log(
            "Attempting to fetch user info with token:",
            tokens.access_token
          );
          const response = await fetch("https://api.linear.app/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.access_token}`,
            },
            body: JSON.stringify({
              query: `query { viewer { id name email } }`,
            }),
          });
          const data = await response.json();
          console.log("User info response:", data);
          return data.data.viewer;
        },
      },
      profile(profile: LinearProfile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: JWT;
    }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(config);

export { handler as GET, handler as POST };
