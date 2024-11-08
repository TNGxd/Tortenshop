import React from 'react';
import CakeCard from '../components/CakeCard';
import { useCart } from '../contexts/CartContext';
import { Cake } from '../types';

const FEATURED_CAKES: Cake[] = [
  {
    id: '1',
    name: 'Classic Chocolate',
    description: 'Rich chocolate layers with smooth ganache and fresh berries',
    price: 45,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    category: 'signature'
  },
  {
    id: '2',
    name: 'Strawberry Dream',
    description: 'Light vanilla sponge with fresh strawberries and cream',
    price: 40,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    category: 'seasonal'
  },
  {
    id: '3',
    name: 'Caramel Delight',
    description: 'Butterscotch cake layers with salted caramel buttercream',
    price: 48,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80',
    category: 'signature'
  },
  {
    id: '4',
    name: 'Berry Bliss',
    description: 'Mixed berry compote between light chiffon cake layers',
    price: 42,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
    category: 'seasonal'
  }
];

export default function Home() {
  const { addToCart } = useCart();

  const handleAddToCart = (cake: Cake) => {
    addToCart({
      id: cake.id,
      cake,
      quantity: 1,
      isCustom: false
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Sweet Delights Bakery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handcrafted cakes made with love and the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_CAKES.map((cake) => (
            <CakeCard
              key={cake.id}
              cake={cake}
              onClick={() => handleAddToCart(cake)}
            />
          ))}
        </div>
      </section>

      <section className="py-12 bg-pink-50 rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Your Own Cake</h2>
          <p className="text-gray-600 mb-8">
            Design your perfect cake with our custom cake builder
          </p>
          <a
            href="/create"
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Start Creating
          </a>
        </div>
      </section>
    </div>
  );
}