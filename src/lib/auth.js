import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  session:{
    cookieCache:{
      enabled:true,
      strategy:"jwt",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    }
  },
  plugins:[
    jwt()
  ],
  database: mongodbAdapter(client.db("ideavault"), {
    client,
  }),


});