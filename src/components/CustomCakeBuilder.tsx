import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cake as CakeIcon, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { CustomCake } from '../types';

const options = {
  bases: [
    { 
      id: 'chocolate', 
      name: 'Chocolate', 
      price: 15,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 'vanilla', 
      name: 'Vanilla', 
      price: 12,
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 'red-velvet', 
      name: 'Red Velvet', 
      price: 18,
      image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=400&q=80'
    }
  ],
  fillings: [
    { 
      id: 'cream', 
      name: 'Whipped Cream', 
      price: 5,
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 'chocolate', 
      name: 'Chocolate Ganache', 
      price: 7,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 'fruit', 
      name: 'Fresh Berries', 
      price: 8,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80'
    }
  ],
  toppings: [
    { 
      id: 'sprinkles', 
      name: 'Rainbow Sprinkles', 
      price: 3,
      image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 'chocolate', 
      name: 'Chocolate Shavings', 
      price: 4,
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 'fruit', 
      name: 'Fresh Fruit', 
      price: 6,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80'
    }
  ]
};

export default function CustomCakeBuilder() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selection, setSelection] = useState({
    base: '',
    filling: '',
    topping: ''
  });

  const calculatePrice = () => {
    const basePrice = options.bases.find(b => b.id === selection.base)?.price || 0;
    const fillingPrice = options.fillings.find(f => f.id === selection.filling)?.price || 0;
    const toppingPrice = options.toppings.find(t => t.id === selection.topping)?.price || 0;
    return basePrice + fillingPrice + toppingPrice;
  };

  const handleAddToCart = () => {
    const customCake: CustomCake = {
      base: selection.base,
      filling: selection.filling,
      topping: selection.topping,
      price: calculatePrice()
    };

    addToCart({
      id: `custom-${Date.now()}`,
      cake: customCake,
      quantity: 1,
      isCustom: true
    });

    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center space-x-2 mb-8">
        <CakeIcon className="h-8 w-8 text-pink-600" />
        <h2 className="text-2xl font-bold text-gray-800">Create Your Dream Cake</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {Object.entries(options).map(([category, items]) => (
          <div key={category} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 capitalize">{category}</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelection(prev => ({ ...prev, [category.slice(0, -1)]: item.id }))}
                  className={`w-full rounded-xl transition duration-200 overflow-hidden ${
                    selection[category.slice(0, -1)] === item.id
                      ? 'ring-2 ring-pink-600 ring-offset-2'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute inset-0 ${
                      selection[category.slice(0, -1)] === item.id
                        ? 'bg-pink-600/20'
                        : 'bg-black/40 group-hover:bg-black/30'
                    } transition-colors`}/>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-pink-600 font-semibold">${item.price}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-md mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-lg font-semibold text-gray-800">Total Price</p>
              <p className="text-sm text-gray-600">Includes all selections</p>
            </div>
            <div className="text-2xl font-bold text-pink-600">${calculatePrice()}</div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!selection.base || !selection.filling || !selection.topping}
            className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}