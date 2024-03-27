import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderList from './OrderList';

const OrdersScreen = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch uncompleted orders
        const uncompletedResponse = await axios.get('https://api.sunrero.space/order_menu_orders/my_orders', {
          params: {
            state: ["new", "waiting_for_confirmation", "confirmed"],
            resort: "/resorts/0dbfee1d-af9d-4489-ad9a-0c402907a028",
            itemsPerPage: 6,
            page: 1
          },
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDk3OTg4OTUsImV4cCI6MTc0MTM1NTg0Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoicmFkb3NsYXZAZWxpdHkuZGV2In0.YISa1YJkjHBbI7jXOOhIK6oVZT12jOaKuPdbG5MBsS3G7Ovi4bhcPNMhcEXjl13EjPk56EJgIjwuEpL-WvUYNdXO8eEZa4vPCKRhDnzYMnL1Jp5UL3F0nVgek0GtQEPfYDVc8vGY_xlKb681eRzJzsTq06z5x44s1POlGAvbJQcGS9FrGAMCaaMHhU4bX0I88W7zx7s2lJQnNQvcaCOL4cTi9hv5oeLlIYcZZGyXxCa6RYEuIPw1X1Mc2PvG84CBQUJSVGJEexeyrbrMK8e3XNo4hbPPL4s2nFp6j8hrwURH12gusLLVKX8J5SbWjsgdBV2wg2kZklvuTDsOZP7yow'
          }
        });
    
        // Fetch completed orders
        const completedResponse = await axios.get('https://api.sunrero.space/order_menu_orders/my_orders', {
          params: {
            state: ["completed", "canceled_by_customer", "rejected", "expired", "failed"],
            resort: "/resorts/0dbfee1d-af9d-4489-ad9a-0c402907a028",
            itemsPerPage: 6,
            page: 1
          },
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDk3OTg4OTUsImV4cCI6MTc0MTM1NTg0Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoicmFkb3NsYXZAZWxpdHkuZGV2In0.YISa1YJkjHBbI7jXOOhIK6oVZT12jOaKuPdbG5MBsS3G7Ovi4bhcPNMhcEXjl13EjPk56EJgIjwuEpL-WvUYNdXO8eEZa4vPCKRhDnzYMnL1Jp5UL3F0nVgek0GtQEPfYDVc8vGY_xlKb681eRzJzsTq06z5x44s1POlGAvbJQcGS9FrGAMCaaMHhU4bX0I88W7zx7s2lJQnNQvcaCOL4cTi9hv5oeLlIYcZZGyXxCa6RYEuIPw1X1Mc2PvG84CBQUJSVGJEexeyrbrMK8e3XNo4hbPPL4s2nFp6j8hrwURH12gusLLVKX8J5SbWjsgdBV2wg2kZklvuTDsOZP7yow'
          }
        });

        const pendingOrdersData = uncompletedResponse.data['hydra:member'];
        const completedOrdersData = completedResponse.data['hydra:member'];

        // Update state with fetched data
        setPendingOrders(pendingOrdersData);
        setCompletedOrders(completedOrdersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="orders-screen">
      <h2>Orders</h2>
      <div className="orders-screen-buttons">
        <button className="orders-screen-button" onClick={() => handleTabChange('pending')}>Pending</button>
        <button className="orders-screen-button" onClick={() => handleTabChange('completed')}>Completed</button>
      </div>
      <div>
        {activeTab === 'pending' && (
          <div>
            <h3>Pending Orders</h3>
            <OrderList orders={pendingOrders} />
          </div>
        )}
        {activeTab === 'completed' && (
          <div>
            <h3>Completed Orders</h3>
            <OrderList orders={completedOrders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;
