// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// // Initialize NextAuth

// export default NextAuth({ 
//     providers: [
//         GoogleProvider({
//             clientId: "6984088107-b74m2a42votop2kk4hrhfosri34r10d3.apps.googleusercontent.com",
//             clientSecret: "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"
//         })
//     ]
// })
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
     providers: [
        GoogleProvider({
            clientId: "6984088107-b74m2a42votop2kk4hrhfosri34r10d3.apps.googleusercontent.com",
            clientSecret: "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"
        })
    ],
    secret:process.env.NEXTAUTH_URL,

  callbacks: {
    async signIn(user, account, profile) {
      // Check if the user already exists in your database
    //   const existingUser = await prisma.user.findUnique({
    //     where: { email: user.email },
      //});
      const existingUser=await prisma.user.findFirst({
        where:{email:user.user.email}
      });
      
console.log("user=",user.user.name,existingUser);
      if (existingUser===null) {
        // If the user doesn't exist, create a new user in your database
     const createdUser=   await prisma.user.create({
          data: {
            name: user.user.name,
            email: user.user.email,
          },
        });
        user.user.userId = createdUser.id;

      }
      else
      {
        user.user.userId = existingUser?.id;

      }

      return true; // Return true to allow the sign-in process to continue
    }
   
  },
});
