import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { APIError } from "better-auth/api";
import { prisma } from "@/lib/prisma";

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
  },
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          if (!adminEmail || user.email.toLowerCase() !== adminEmail) {
            throw new APIError("FORBIDDEN", {
              message: "Only the configured admin account can be created.",
            });
          }

          return {
            data: {
              ...user,
              emailVerified: true,
            },
          };
        },
      },
    },
  },
  plugins: [nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;
