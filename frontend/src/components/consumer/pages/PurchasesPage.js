import React from 'react';
import {
  ShoppingBag as ShoppingBagIcon,
  CalendarToday as CalendarIcon,
  LocalOffer as PriceTagIcon,
  CheckCircle as CheckCircleIcon,
  Payment as PaymentIcon,
  Store as StoreIcon,
  Receipt as ReceiptIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import { Rating } from '@mui/material';

const PurchasesPage = () => {
  // Dummy purchase data
  const purchases = [
    {
      id: 'PUR1001',
      date: '2023-06-15',
      items: [
        {
          id: 'ITEM101',
          name: '22k Gold Necklace',
          image: '/gold-necklace.jpg',
          price: 42500,
          quantity: 1,
          weight: '18 grams',
          purity: '22 Karat',
          seller: 'Mohan Jewellers',
          rating: 4.5,
          status: 'Delivered'
        },
        {
          id: 'ITEM102',
          name: 'Diamond Stud Earrings',
          image: '/diamond-earrings.jpg',
          price: 28500,
          quantity: 1,
          weight: '2.5 grams',
          purity: '18K White Gold',
          seller: 'Diamond Palace',
          rating: 5,
          status: 'Delivered'
        }
      ],
      totalAmount: 71000,
      paymentMethod: 'Credit Card',
      deliveryDate: '2023-06-18',
      invoiceUrl: '/invoices/PUR1001.pdf'
    },
    {
      id: 'PUR1002',
      date: '2023-05-22',
      items: [
        {
          id: 'ITEM201',
          name: 'Platinum Wedding Ring',
          image: '/platinum-ring.jpg',
          price: 67500,
          quantity: 1,
          weight: '8 grams',
          purity: 'PT950',
          seller: 'Royal Platinum',
          rating: 4,
          status: 'Delivered'
        }
      ],
      totalAmount: 67500,
      paymentMethod: 'Bank Transfer',
      deliveryDate: '2023-05-25',
      invoiceUrl: '/invoices/PUR1002.pdf'
    },
    {
      id: 'PUR1003',
      date: '2023-07-10',
      items: [
        {
          id: 'ITEM301',
          name: 'Silver Bracelet',
          image: '/silver-bracelet.jpg',
          price: 12500,
          quantity: 2,
          weight: '45 grams',
          purity: '925 Sterling Silver',
          seller: 'Silver Treasures',
          rating: null,
          status: 'Shipped'
        },
        {
          id: 'ITEM302',
          name: 'Gemstone Pendant',
          image: '/gemstone-pendant.jpg',
          price: 18500,
          quantity: 1,
          weight: '12 grams',
          purity: '18K Gold',
          seller: 'Gems Gallery',
          rating: null,
          status: 'Shipped'
        }
      ],
      totalAmount: 43500,
      paymentMethod: 'UPI',
      deliveryDate: '2023-07-15',
      invoiceUrl: '/invoices/PUR1003.pdf'
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"><CheckCircleIcon fontSize="small" /> Delivered</span>;
      case 'Shipped':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"><PaymentIcon fontSize="small" /> Shipped</span>;
      case 'Processing':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"><ReceiptIcon fontSize="small" /> Processing</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Purchases</h1>
          <p className="text-gray-600">View your jewelry purchase history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm">Total Purchases</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm">Total Spent</h3>
            <p className="text-2xl font-bold">₹1,82,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm">Items Purchased</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-amber-500">
            <h3 className="text-gray-500 text-sm">Average Rating</h3>
            <div className="flex items-center gap-1">
              <Rating value={4.5} precision={0.5} readOnly size="small" />
              <span className="text-2xl font-bold">4.5</span>
            </div>
          </div>
        </div>

        {/* Purchases List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {purchases.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBagIcon className="text-gray-400 mx-auto text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-900">No purchases found</h3>
              <p className="text-gray-600">Your purchase history will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {purchases.map((purchase) => (
                <div key={purchase.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{purchase.id}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <CalendarIcon fontSize="small" />
                        {formatDate(purchase.date)}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-1 text-sm">
                        <PriceTagIcon fontSize="small" className="text-gray-500" />
                        <span className="font-medium">{formatCurrency(purchase.totalAmount)}</span>
                      </div>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors">
                        View Invoice
                      </button>
                    </div>
                  </div>

                  {/* Purchase Items */}
                  <div className="space-y-4">
                    {purchase.items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                        {/* Item Image */}
                        <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <ShoppingBagIcon className="text-gray-400 text-3xl" />
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                {item.quantity} × {formatCurrency(item.price)} = {formatCurrency(item.price * item.quantity)}
                              </p>
                            </div>
                            {getStatusBadge(item.status)}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <StoreIcon fontSize="small" className="text-gray-500" />
                              <span>{item.seller}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Weight:</span>
                              <span>{item.weight}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Purity:</span>
                              <span>{item.purity}</span>
                            </div>
                          </div>

                          {/* Rating Section */}
                          <div className="mt-3">
                            {item.rating ? (
                              <div className="flex items-center gap-2">
                                <Rating value={item.rating} precision={0.5} readOnly size="small" />
                                <span className="text-sm text-gray-600">Rated</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Rating
                                  value={0}
                                  precision={0.5}
                                  size="small"
                                  icon={<StarIcon fontSize="inherit" />}
                                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                />
                                <span className="text-sm text-gray-600">Rate this product</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Purchase Summary */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div className="text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Payment Method:</span> {purchase.paymentMethod}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Expected Delivery:</span> {formatDate(purchase.deliveryDate)}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                        Track Order
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-sm">
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasesPage;