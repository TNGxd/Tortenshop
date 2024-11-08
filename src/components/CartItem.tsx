import { Minus, Plus, Trash2 } from 'lucide-react';
import { type CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { cake, quantity } = item;
  
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <img
        src={item.isCustom ? '/custom-cake-placeholder.jpg' : (cake as any).image}
        alt={item.isCustom ? 'Custom Cake' : (cake as any).name}
        className="w-24 h-24 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {item.isCustom ? 'Custom Cake' : (cake as any).name}
        </h3>
        {item.isCustom && (
          <p className="text-sm text-gray-600">
            Base: {(cake as any).base}, Filling: {(cake as any).filling}, Topping: {(cake as any).topping}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdateQuantity(item.id, quantity - 1)}
          disabled={quantity <= 1}
          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="w-24 text-right font-semibold">
        ${(cake.price * quantity).toFixed(2)}
      </div>
      
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}