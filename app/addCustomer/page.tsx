// pages/index.tsx

import React from 'react';
import AddCustomer from '../components/addCustomer';
import { addCustomer } from '../../actions/customer.action';

const HomePage: React.FC = () => {
  const handleAddCustomer = async (customerData: { name: string; phoneNumber: string; city: string }) => {
    try {
      // You would typically get the userId from the authentication context or session
      const userId = 'user123'; // Replace with your actual user ID retrieval logic

      await addCustomer(userId, customerData);
      // Optionally, you can perform additional actions after adding the customer
    } catch (error) {
      // Handle error as needed (e.g., display an error message)
      console.error('Error in handleAddCustomer:', error);
    }
  };

  return (
    <div>
      <h1>Customer Management</h1>
      <AddCustomer/>
      {/* Other content goes here */}
    </div>
  );
};

export default HomePage;
