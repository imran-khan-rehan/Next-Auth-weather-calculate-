// pages/api/add-customer.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';
import { getServerSession } from 'next-auth/next';
import NextAuth from '@/pages/api/auth/[...nextauth]';
const prisma = new PrismaClient();
import { getCurrentTemperature } from '@/actions/customer.action';
export async function PUT(req: Request) {
    let data = null;
    const email = await req.json();
    try {

        const session = await getServerSession(NextAuth);
        console.log("session data is ", session, NextAuth);

        data = await prisma.customer.findMany({
            where: { userEmail: email }
        })
        console.log(data);
    } catch (error) {

    }
    finally {
        await prisma.$disconnect();
        return NextResponse.json({ data, status: 200 });

    }
}

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method === 'POST') {
        var response=null;
        const { name, phoneNumber, city, userEmail } = await req.json();
        console.log(name, phoneNumber, city, userEmail);
        const temperature = await getCurrentTemperature(city);
        try {
            console.log("temperature received is ", temperature);
            // Assuming you have a "Customer" model with fields "name", "phoneNumber", "city", and "userId"
            if (temperature.main) {
                if (temperature.main.temp) {
              const t=temperature.main.temp-273;
                    await prisma.customer.create({
                        data: {
                            name: name,
                            phoneNumber: phoneNumber,
                            city: city,
                            temperature: t,
                            userEmail: userEmail,
                        },
                    });
                    return NextResponse.json({ success: true ,status: 200 });
                }
                
            }
            return NextResponse.json({ success: false ,message:temperature.message,status: 400 });

            // res.status(201).json({ message: 'Customer added successfully' });
        } catch (error) {
            console.error('Error adding customer to database:', error);
            return NextResponse.json({ success: false }, { status: 200 });
        }
        finally {
            await prisma.$disconnect();
        }
    } else {
        return NextResponse.json({ success: true }, { status: 200 });
    }
}
