'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '../customers/loading';
const AddCustomer = () => {
  const [isLoad,setIsLoad]=useState(false);

  const [customerData, setCustomerData] = useState({
    name: '',
    phoneNumber: '',
    city: '',
  });
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoad(true);
    e.preventDefault();
    console.log("data is ",customerData);
    const updatedData = {
        ...customerData,
        userEmail: session?.user?.email, 
      };
    try {
     var data=customerData;
     
     try {
      const res=  await fetch('http://localhost:3000/api/customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        const resp=await res.json();
        setIsLoad(false);
  if(resp.status===200)
  {
    alert("data success"+resp.status+resp.message);
  }
  else
{
  alert("error in insertion"+resp.message);
}
      } catch (error) {
        console.error('Error in handleAddCustomer:', error);
      }
      setCustomerData({
        name: '',
        phoneNumber: '',
        city: '',
      });
      window.location.href='/customers';
    } catch (error) {
      console.error('Error adding customer:', error);
      // Handle error as needed (e.g., display an error message)
    }
  };
if(session)
{
  return (
    <div >
    <form onSubmit={handleSubmit} className=' flex flex-col gap-4 border'>
      <div>
        <label>
          Customer Name:
          <input type="text" name="name" value={customerData.name} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={customerData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          City:
          <input type="text" name="city" value={customerData.city} onChange={handleChange} required />
        </label>
      </div>
      <div>
{    !isLoad &&    <button className=' text-black border bg-green-600' type="submit">Add Customer</button>
}      </div>
{isLoad && <Loading/>}
    </form>
    </div>
  );
} else{
  return <>
 <button className=' ml-2 mt-2' onClick={() => window.location.href='/'}>
SignIN
</button>
  </>
}
};

export default AddCustomer;
