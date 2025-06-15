import React from 'react';
import { 
  dummyConsumer, 
  dummyOrders, 
  dummyLoans, 
  dummyPurchases, 
  dummyTransactions,
  dummyItems
} from './../DummyData';
import Navbar from './../Navbar';
const Profile = () => {
  const consumer = dummyConsumer;
  const orders = dummyOrders.filter(order => order.customerID === consumer.id);
  const loans = dummyLoans.filter(loan => loan.customerID === consumer.id);
  const purchases = dummyPurchases.filter(purchase => purchase.cutomerId === consumer.id);
  const transactions = dummyTransactions.filter(transaction => transaction.customerID === consumer.id);
  const unreadNotifications = consumer.notifications.filter(notification => !notification.isRead);
  const readNotifications = consumer.notifications.filter(notification => notification.isRead);
  const getItemDetails = (itemId) => {
    return dummyItems.find(item => item.ID === itemId);
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center">
          <img 
            src={consumer.image} 
            alt={consumer.name} 
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{consumer.name}</h1>
            <p className="text-gray-600 mb-2">{consumer.address}</p>
            <p className="text-gray-600 mb-2">{consumer.contactNumber}</p>
            <p className="text-gray-600">Member since: {new Date(consumer.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Unread Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Unread Notifications</h2>
          {unreadNotifications.length > 0 ? (
            <ul className="space-y-3">
              {unreadNotifications.map((notification, index) => (
                <li key={index} className="border-l-4 border-red-500 pl-4 py-2">
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-500">{new Date(notification.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No unread notifications</p>
          )}
        </div>

        {/* Read Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Notifications</h2>
          {readNotifications.length > 0 ? (
            <ul className="space-y-3">
              {readNotifications.map((notification, index) => (
                <li key={index} className="border-l-4 border-gray-300 pl-4 py-2">
                  <p className="text-gray-700">{notification.message}</p>
                  <p className="text-sm text-gray-500">{new Date(notification.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent notifications</p>
          )}
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Delivery</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{order.itemName}</div>
                      <div className="text-sm text-gray-500">{order.orderDescription}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">${order.priceExpected}</div>
                      <div className="text-sm text-gray-500">Deposit: ${order.depositedAmount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.expectedDeliverDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No orders found</p>
        )}
      </div>

      {/* Loans */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Loans</h2>
        {loans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{loan.itemType}</div>
                      <div className="text-sm text-gray-500">{loan.itemDescription}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${loan.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">${loan.loanAmount}</div>
                      <div className="text-sm text-gray-500">Paid: ${loan.loanPaidedAmount}</div>
                      <div className="text-sm text-gray-500">Remaining: ${loan.remainingAmount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(loan.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No active loans</p>
        )}
      </div>

      {/* Purchases */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Purchases</h2>
        {purchases.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {purchases.map((purchase, index) => {
                  const item = getItemDetails(purchase.itemId);
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{item?.itemName || 'Unknown Item'}</div>
                        <div className="text-sm text-gray-500">{item?.metalType} {item?.itemPurity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {purchase.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${purchase.amountPaid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(purchase.date).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No purchases found</p>
        )}
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                      <div className="text-sm text-gray-500">{transaction.transactionMode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${transaction.transactionAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No transactions found</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Profile;