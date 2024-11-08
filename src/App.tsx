import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import CreateCake from './pages/CreateCake';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateCake />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}