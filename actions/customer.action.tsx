'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetAllCustomers(email: any) {
  let data = null;

  try {

    data = await prisma.customer.findMany({
      where: { userEmail: email }
    })
    console.log("data received is ",data,email);
  } catch (error) {

  }
  finally {
    await prisma.$disconnect();
    return data;

  }
}

import axios from 'axios';


export async function getCurrentTemperature(city:String) {
  try {
    const apiKey = '9591c2b0b7647bce3ad61da174e00b6e';
    // const response = await axios.get(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    // );
const urlKey= 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey
const res=await fetch(urlKey);
const data=await res.json();
console.log(data);


  return data;


    // console.log("api data",response);
    // if (response.status === 200) {
    //   return response.data.main.temp;
    // } else {
    //   throw new Error('Failed to fetch temperature data');
    // }
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    throw error;
  }
}
