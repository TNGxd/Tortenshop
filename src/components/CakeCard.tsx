import { type Cake } from '../types';

interface CakeCardProps {
  cake: Cake;
  onClick: () => void;
}

export default function CakeCard({ cake, onClick }: CakeCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={cake.image} 
          alt={cake.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{cake.name}</h3>
          <span className="text-pink-600 font-bold">${cake.price}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{cake.description}</p>
      </div>
    </div>
  );
}