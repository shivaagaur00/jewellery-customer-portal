import { Link } from 'react-router-dom';
import { ShoppingCart, Person, LocalOffer, CreditCard, Receipt } from '@mui/icons-material';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Jewelry Store
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/products" className="flex items-center text-gray-600 hover:text-gray-900">
              <ShoppingCart className="mr-1" />
              Products
            </Link>
            <Link to="/orders" className="flex items-center text-gray-600 hover:text-gray-900">
              <Receipt className="mr-1" />
              Orders
            </Link>
            <Link to="/loans" className="flex items-center text-gray-600 hover:text-gray-900">
              <CreditCard className="mr-1" />
              Loans
            </Link>
            <Link to="/offers" className="flex items-center text-gray-600 hover:text-gray-900">
              <LocalOffer className="mr-1" />
              Offers
            </Link>
            <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-900">
              <Person className="mr-1" />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 