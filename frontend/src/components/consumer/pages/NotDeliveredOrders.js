import React, { useEffect, useState } from 'react';
import {
  LocalShipping,
  WatchLater,
  CheckCircleOutline,
  Diamond,
  Close,
  CalendarToday
} from '@mui/icons-material';

const NotDeliveredOrders = () => {
  const [activeTab, setActiveTab] = useState('all');
const dummyOrders = [
  {
    _id: "order1234567890abcdef",
    items: [
      {
        _id: "item1",
        image: "https://images.unsplash.com/photo-1603808033193-762a2b8b8129",
      },
      {
        _id: "item2",
        image: "https://images.unsplash.com/photo-1556228710-0e2c2fb9d902",
      }
    ],
    orderCost: 12499,
    orderDate: "2025-07-01T10:30:00Z",
    expectedDeliveryDate: "2025-07-07T10:30:00Z",
    deliveryStatus: "not_delivered",
    paymentStatus: "pending"
  },
  {
    _id: "order234567890abcdefg",
    items: [
      {
        _id: "item3",
        image: "https://images.unsplash.com/photo-1589913562551-fb7b37d8cd75"
      }
    ],
    orderCost: 18999,
    orderDate: "2025-06-25T14:00:00Z",
    expectedDeliveryDate: "2025-07-01T14:00:00Z",
    deliveryStatus: "shipped",
    paymentStatus: "paid"
  },
  {
    _id: "order34567890abcdefg1",
    items: [
      {
        _id: "item4",
        image: "https://images.unsplash.com/photo-1614852202525-b4f75e0327c7"
      }
    ],
    orderCost: 7599,
    orderDate: "2025-06-20T12:00:00Z",
    expectedDeliveryDate: "2025-06-26T12:00:00Z",
    deliveryStatus: "processing",
    paymentStatus: "paid"
  }
];

  const [filteredOrders, setFilteredOrders] = useState(dummyOrders);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredOrders(dummyOrders);
    } else {
      setFilteredOrders(dummyOrders.filter(order => order.deliveryStatus === activeTab));
    }
  }, [activeTab, dummyOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'not_delivered':
        return 'bg-amber-100 text-amber-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Your Orders</h1>
          <p className="text-amber-700">Track your precious jewelry purchases</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['all', 'processing', 'shipped', 'not_delivered'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-amber-800 hover:bg-amber-100'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <Diamond className="text-amber-400 mx-auto" style={{ fontSize: '4rem' }} />
              <h3 className="text-xl font-medium text-amber-900 mt-4">
                {activeTab === 'all' 
                  ? 'No orders found' 
                  : `No ${activeTab.replace('_', ' ')} orders`}
              </h3>
              <p className="text-amber-600 mt-2">
                {activeTab === 'all' 
                  ? 'Your purchased jewelry will appear here' 
                  : 'Try checking all orders'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-amber-100">
              {filteredOrders.map((order) => (
                <div key={order._id} className="p-6 hover:bg-amber-50 transition-colors">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Order Image (using first item's image) */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                      <div className="relative aspect-square bg-amber-100 rounded-lg overflow-hidden">
                        {order.items[0]?.image ? (
                          <img 
                            src={order.items[0].image} 
                            alt="Jewelry item"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Diamond className="w-full h-full text-amber-300 p-8" />
                        )}
                        <span className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-sm font-medium">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-amber-900">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </h3>
                          <p className="text-sm text-amber-600">
                            Placed on {formatDate(order.orderDate)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.deliveryStatus)}`}>
                          {order.deliveryStatus.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <CalendarToday className="text-amber-500" fontSize="small" />
                          <div>
                            <p className="text-xs text-amber-600">Expected Delivery</p>
                            <p className="font-medium">
                              {formatDate(order.expectedDeliveryDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <LocalShipping className="text-amber-500" fontSize="small" />
                          <div>
                            <p className="text-xs text-amber-600">Shipping</p>
                            <p className="font-medium">
                              {order.deliveryStatus === 'shipped' ? 'On the way' : 'Preparing'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-amber-100 flex justify-between items-center">
                        <p className="text-lg font-bold text-amber-800">
                          ₹{order.orderCost.toLocaleString()}
                        </p>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
                            View Details
                          </button>
                          {order.deliveryStatus === 'shipped' && (
                            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                              Track Package
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Status Legend */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h4 className="font-medium text-amber-900 mb-3">Order Status Guide</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span>Processing - Being crafted by artisans</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400"></span>
              <span>Shipped - On its way to you</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span>Delivered - Received successfully</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotDeliveredOrders;