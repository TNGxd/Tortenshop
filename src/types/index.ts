export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'signature' | 'seasonal' | 'custom';
}

export interface CustomCake {
  base: string;
  filling: string;
  topping: string;
  price: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  cake: Cake | CustomCake;
  isCustom: boolean;
}

export interface User {
  email: string;
  orders: CartItem[];
}