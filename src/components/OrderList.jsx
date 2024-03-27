import './OrderList.css';

const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <p>No orders available</p>;
  }

  return (
    <ul className="order-list"> 
      {orders.map((order) => (
        <li key={order.id} className="order-item"> 
          <p className="order-detail">ID: {order.id}</p>
          <p className="order-detail">Customer: {order.customer.id}</p>
          <p className="order-detail">Created At: {order.createdAt}</p>
          <p className="order-detail">Total Price: {order.totalPrice.amount} {order.totalPrice.currency}</p>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;