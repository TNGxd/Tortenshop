import React from 'react';
import { ShoppingCart, Cake, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Cake className="h-8 w-8 text-pink-600" />
              <span className="font-bold text-xl text-gray-800">Sweet Delights</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-pink-600 transition">Shop</Link>
            <Link to="/create" className="text-gray-600 hover:text-pink-600 transition">Create Cake</Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-pink-600 transition" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user?.email}</span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-pink-600 transition"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <User className="h-6 w-6 text-gray-600 hover:text-pink-600 transition" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}