import React, { useEffect, useState } from 'react';
import {
  Star, Favorite, FavoriteBorder, NewReleases,
  LocalFireDepartment, FilterList, Search, Close
} from '@mui/icons-material';
import { getDetailsWithoutLogin } from '../../api/customerAPIs';
const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    metalType: [],
    priceRange: [0, 5000000],
    inStock: false,
    onSale: false
  });
  const [sortOption, setSortOption] = useState('featured');
  const [visibleItems, setVisibleItems] = useState(8);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDetailsWithoutLogin();
        setCollections(res.data.item);
        setFilteredCollections(res.data.item);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    let result = [...collections];
    if (searchTerm) {
      result = result.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.metalType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.category.length > 0) {
      result = result.filter(item => filters.category.includes(item.category));
    }
    if (filters.metalType.length > 0) {
      result = result.filter(item => filters.metalType.includes(item.metalType));
    }
    result = result.filter(item => {
      const price = parseFloat(item.metalPrice);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    if (filters.inStock) {
      result = result.filter(item => item.quantity > 0);
    }
    if (filters.onSale) {
      result = result.filter(item => item.tags && item.tags.includes('sale'));
    }
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => parseFloat(a.metalPrice) - parseFloat(b.metalPrice));
        break;
      case 'price-high':
        result.sort((a, b) => parseFloat(b.metalPrice) - parseFloat(a.metalPrice));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: 
        break;
    }

    setFilteredCollections(result);
    setVisibleItems(8); 
  }, [collections, searchTerm, filters, sortOption]);
  const toggleWishlist = (itemId) => {
    setWishlist(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  const loadMore = () => {
    setVisibleItems(prev => prev + 8);
  };
  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const getUniqueValues = (key) => {
    const values = collections.map(item => item[key]);
    return [...new Set(values)];
  };
  const isNewItem = (dateString) => {
    const itemDate = new Date(dateString);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return itemDate > thirtyDaysAgo;
  };
  const QuickViewModal = ({ item, onClose }) => {
    if (!item) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10"
            >
              <Close />
            </button>
            <div className="grid md:grid-cols-2 gap-8 p-6">
              <div className="sticky top-0">
                <img 
                  src={item.image} 
                  alt={item.itemName} 
                  className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{item.itemName}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fontSize="small" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">(24 reviews)</span>
                </div>
                
                <div className="mb-6">
                  <span className="text-2xl font-bold">${item.metalPrice}</span>
                  {item.tags?.includes('sale') && (
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ₹{(parseFloat(item.metalPrice) * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-medium">Metal Type</h3>
                    <p>{item.metalType} ({item.itemPurity})</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Weight</h3>
                    <p>{item.weight}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Availability</h3>
                    <p className={item.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                      {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                </div>
                
                <button 
                  className={`w-full py-3 px-6 rounded-lg transition duration-300 mb-4 ${
                    item.quantity > 0 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={item.quantity <= 0}
                >
                  {item.quantity > 0 ? 'Add to Cart' : 'Sold Out'}
                </button>
                
                <button 
                  className="w-full py-3 px-6 border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-50 transition duration-300"
                  onClick={() => toggleWishlist(item.ID)}
                >
                  {wishlist.includes(item.ID) ? (
                    <span className="flex items-center justify-center">
                      <Favorite className="text-red-500 mr-2" /> Remove from Wishlist
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FavoriteBorder className="mr-2" /> Add to Wishlist
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-titillium font-bold text-amber-600 mb-2">Our Exquisite Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover handcrafted jewelry pieces that reflect elegance and timeless beauty
          </p>
        </div>
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, metal or category..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterList /> Filters
            </button>
            
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {getUniqueValues('category').map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-amber-500 focus:ring-amber-500"
                        checked={filters.category.includes(category)}
                        onChange={() => toggleFilter('category', category)}
                      />
                      <span className="ml-2">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Metal Type</h3>
                <div className="space-y-2">
                  {getUniqueValues('metalType').map(metal => (
                    <label key={metal} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-amber-500 focus:ring-amber-500"
                        checked={filters.metalType.includes(metal)}
                        onChange={() => toggleFilter('metalType', metal)}
                      />
                      <span className="ml-2">{metal}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span>₹{filters.priceRange[0]}</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-amber-500 focus:ring-amber-500"
                      checked={filters.inStock}
                      onChange={() => setFilters(prev => ({ ...prev, inStock: !prev.inStock }))}
                    />
                    <span className="ml-2">In Stock Only</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-amber-500 focus:ring-amber-500"
                      checked={filters.onSale}
                      onChange={() => setFilters(prev => ({ ...prev, onSale: !prev.onSale }))}
                    />
                    <span className="ml-2">On Sale</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {Math.min(visibleItems, filteredCollections.length)} of {filteredCollections.length} items
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
            <button 
              className="mt-4 px-4 py-2 text-amber-500 border border-amber-500 rounded-lg hover:bg-amber-50"
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  category: [],
                  metalType: [],
                  priceRange: [0, 5000000],
                  inStock: false,
                  onSale: false
                });
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCollections.slice(0, visibleItems).map((item) => (
            <div key={item.ID} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
              <div className="relative flex-grow">
                <img 
                  src={item.image} 
                  alt={item.itemName} 
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => setQuickViewItem(item)}
                />
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {isNewItem(item.date) && (
                    <span className="bg-white text-amber-600 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                      <NewReleases className="mr-1" fontSize="small" /> NEW
                    </span>
                  )}
                  {item.tags?.includes('bestseller') && (
                    <span className="bg-white text-red-500 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                      <LocalFireDepartment className="mr-1" fontSize="small" /> BESTSELLER
                    </span>
                  )}
                </div>
                <button 
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  onClick={() => toggleWishlist(item.ID)}
                >
                  {wishlist.includes(item.ID) ? (
                    <Favorite className="text-red-500" />
                  ) : (
                    <FavoriteBorder className="text-gray-400 hover:text-red-500" />
                  )}
                </button>
                {item.tags?.includes('sale') && (
                  <span className="absolute bottom-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    SALE
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 
                    className="font-medium text-gray-900 cursor-pointer hover:text-amber-600"
                    onClick={() => setQuickViewItem(item)}
                  >
                    {item.itemName}
                  </h3>
                  <div className="flex items-center">
                    <Star className="text-amber-400" fontSize="small" />
                    <span className="text-sm text-gray-600 ml-1">4.5</span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <p className="text-sm text-gray-600">{item.metalType} ({item.itemPurity})</p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-bold text-gray-900">₹{item.metalPrice}</span>
                    {item.tags?.includes('sale') && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{(parseFloat(item.metalPrice) * 1.2).toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded-lg transition duration-300 ${
                      item.quantity > 0 
                        ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={item.quantity <= 0}
                  >
                    {item.quantity > 0 ? 'Add to Cart' : 'Sold Out'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleItems < filteredCollections.length && (
          <div className="text-center mt-12">
            <button 
              className="border border-amber-500 text-amber-500 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium transition duration-300"
              onClick={loadMore}
            >
              Load More ({filteredCollections.length - visibleItems} remaining)
            </button>
          </div>
        )}

        {/* Quick View Modal */}
        {quickViewItem && (
          <QuickViewModal 
            item={quickViewItem} 
            onClose={() => setQuickViewItem(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default Collections;