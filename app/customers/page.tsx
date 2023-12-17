'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { GetAllCustomers } from '@/actions/customer.action';
import Loading from './loading';
export async function getCustomers(email: any) {

  if (email) {
    const data = await GetAllCustomers(email);
    return data;
  }
  else {
    return [];
  }
}

export default function CustomerPage() {

  const { data: session } = useSession();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
const [isLoad,setIsLoad]=useState(false);
  useEffect(() => {

    console.log("session is useeffe", session);
    if (!session) {

    } else {
      async function getData() {
setIsLoad(true);
        getCustomers(session?.user?.email).then((data) => {
          setCustomers(data);
          setIsLoad(false);
        });
      }
      
      getData();
    }
  }, [session]);

  const filteredCustomers = customers?.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (session) {
    return (
      <div>
        <h1 className=' text-3xl'>Customer Data</h1>
        <div>
          <label>
            Search by Name:
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button onClick={() =>{setIsLoad(true); getCustomers(session.user?.email).then((data) => {setCustomers(data);setIsLoad(false);})}}>
            Refresh Data
          </button>
          <button className=' ml-2' onClick={() => window.location.href = '/addCustomer'}>
            ADD Customer
          </button>
      
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>Live Temperature</th>
            </tr>
          </thead>
          <tbody>
            {!isLoad && filteredCustomers?.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.city}</td>
                <td>{customer.temperature.toFixed(2)}</td>
              </tr>
            ))}
            {isLoad && <Loading/>}
          </tbody>
        </table>
      </div>
    );
  }
  else {
    return <>
      <button className=' ml-2 mt-2' onClick={() => window.location.href = '/'}>
        SignIN
      </button>
    </>
  }
}
