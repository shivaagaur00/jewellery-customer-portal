import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toast } from 'react-toastify';
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [cartItems] = useState(3);
    const [wishlistItems] = useState(2);
    const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const handleSearchToggle = () => {
      setIsSearchOpen(!isSearchOpen);
    };
    const handleAccountMenuOpen = () => {
      setIsAccountMenuOpen((isAccountMenuOpen)=>!isAccountMenuOpen);
    };
    const handleLogout = () => {
  try {
    dispatch(logout());
    navigate('/login'); 
    toast.success("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
  
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-gray-50 to-white shadow-md border-b border-amber-100">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DiamondIcon className="text-3xl text-amber-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent tracking-wide font-serif">
              Jewelsphere
            </span>
          </div>
          <button 
            className="md:hidden p-2 rounded-full hover:bg-amber-50 text-amber-800"
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </button>
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-gray-50 md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 gap-4 md:gap-8 z-10`}>
            <a href="#home" className="text-amber-900 hover:text-amber-600 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-amber-700 hover:after:w-full after:transition-all after:duration-300 py-2">
              Home
            </a>
            <a href="#collections" className="text-amber-900 hover:text-amber-600 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-amber-700 hover:after:w-full after:transition-all after:duration-300 py-2">
              Collections
            </a>
            <a href="#categories" className="text-amber-900 hover:text-amber-600 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-amber-700 hover:after:w-full after:transition-all after:duration-300 py-2">
              Categories
            </a>
            <a href="#custom" className="text-amber-900 hover:text-amber-600 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-amber-700 hover:after:w-full after:transition-all after:duration-300 py-2">
              Custom Orders
            </a>
            <Link to="/ContactUs">
            <button className="text-amber-900 hover:text-amber-600 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-amber-700 hover:after:w-full after:transition-all after:duration-300 py-2">
              Contact
            </button>
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={handleSearchToggle}
              className="p-2 rounded-full hover:bg-amber-50 text-amber-800 hover:text-amber-600 transition-colors"
            >
              <SearchIcon />
            </button>
            
            <button className="p-2 rounded-full hover:bg-amber-50 text-amber-800 hover:text-amber-600 transition-colors relative">
              <FavoriteBorderIcon />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </button>
            
            <button className="p-2 rounded-full hover:bg-amber-50 text-amber-800 hover:text-amber-600 transition-colors relative">
              <ShoppingCartIcon />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>
            <button 
              onClick={handleAccountMenuOpen}
              className="p-2 rounded-full hover:bg-amber-50 text-amber-800 hover:text-amber-600 transition-colors"
            >
              <AccountCircleIcon />
            </button>
            {isAccountMenuOpen && (
              <div className="absolute right-6 top-16 bg-white shadow-lg rounded-md py-2 w-48 z-20 border border-amber-100">
                <a href="#" className="block px-4 py-2 text-amber-800 hover:bg-amber-50">Profile</a>
                <a href="#" className="block px-4 py-2 text-amber-800 hover:bg-amber-50">My Orders</a>
                <div className="border-t border-amber-100 my-1"></div>
                <button onClick={handleLogout} className="block px-4 py-2 text-amber-800 hover:bg-amber-50">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-amber-800 mb-4">Search for Jewelry</h3>
            <input 
              type="text" 
              placeholder="Search rings, necklaces, etc..." 
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              autoFocus
            />
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={handleSearchToggle}
                className="px-4 py-2 text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSearchToggle}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar; 