import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious cakes to get started!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          Browse Cakes
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold text-gray-800">Total</span>
          <span className="text-2xl font-bold text-pink-600">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}