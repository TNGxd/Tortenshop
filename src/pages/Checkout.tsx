import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, User, MapPin, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import OrderConfirmation from '../components/OrderConfirmation';

const steps = [
  { id: 'contact', title: 'Contact', icon: User },
  { id: 'delivery', title: 'Delivery', icon: Truck },
  { id: 'payment', title: 'Payment', icon: CreditCard },
  { id: 'billing', title: 'Billing', icon: MapPin },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState('contact');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    contact: {
      email: '',
      phone: '',
    },
    delivery: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      deliveryDate: '',
      deliveryTime: '',
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
    },
    billing: {
      sameAsDelivery: true,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
    },
  });

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const generateOrderNumber = () => {
    return `ORD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(-4).toUpperCase()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    } else {
      // Generate order number
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);

      // Simulate order processing
      try {
        // Here you would typically send the order to your backend
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Clear cart and show confirmation
        clearCart();
        setOrderComplete(true);

        // After 5 seconds, redirect to home
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } catch (error) {
        console.error('Error processing order:', error);
        // Handle error appropriately
      }
    }
  };

  const isStepComplete = (stepId: string) => {
    const data = formData[stepId];
    return Object.values(data).every(value => 
      typeof value === 'boolean' ? true : Boolean(value)
    );
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <OrderConfirmation
            orderNumber={orderNumber}
            email={formData.contact.email}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isComplete = isStepComplete(step.id);
              
              return (
                <div key={step.id} className="flex-1">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'bg-pink-600 text-white'
                          : isComplete
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {isComplete ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-600">{step.title}</p>
                    {index < steps.length - 1 && (
                      <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Sections */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          {currentStep === 'contact' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Delivery Information */}
          {currentStep === 'delivery' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.delivery.firstName}
                      onChange={(e) => handleInputChange('delivery', 'firstName', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.delivery.lastName}
                      onChange={(e) => handleInputChange('delivery', 'lastName', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.delivery.address}
                    onChange={(e) => handleInputChange('delivery', 'address', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.delivery.city}
                      onChange={(e) => handleInputChange('delivery', 'city', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.delivery.postalCode}
                      onChange={(e) => handleInputChange('delivery', 'postalCode', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      value={formData.delivery.deliveryDate}
                      onChange={(e) => handleInputChange('delivery', 'deliveryDate', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Time
                    </label>
                    <select
                      value={formData.delivery.deliveryTime}
                      onChange={(e) => handleInputChange('delivery', 'deliveryTime', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (9:00 - 12:00)</option>
                      <option value="afternoon">Afternoon (12:00 - 17:00)</option>
                      <option value="evening">Evening (17:00 - 20:00)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Information */}
          {currentStep === 'payment' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.payment.cardNumber}
                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={formData.payment.cardName}
                    onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={formData.payment.expiry}
                      onChange={(e) => handleInputChange('payment', 'expiry', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={formData.payment.cvv}
                      onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Address */}
          {currentStep === 'billing' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="sameAsDelivery"
                    checked={formData.billing.sameAsDelivery}
                    onChange={(e) => handleInputChange('billing', 'sameAsDelivery', e.target.checked)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sameAsDelivery" className="ml-2 text-sm text-gray-700">
                    Same as delivery address
                  </label>
                </div>

                {!formData.billing.sameAsDelivery && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={formData.billing.firstName}
                          onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.billing.lastName}
                          onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.billing.address}
                        onChange={(e) => handleInputChange('billing', 'address', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.billing.city}
                          onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={formData.billing.postalCode}
                          onChange={(e) => handleInputChange('billing', 'postalCode', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {item.isCustom ? 'Custom Cake' : (item.cake as any).name}
                    </span>
                    <span className="text-gray-600 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-semibold">${(item.cake.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-pink-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                const currentIndex = steps.findIndex(step => step.id === currentStep);
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1].id);
                }
              }}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={currentStep === steps[0].id}
            >
              Back
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              <span>{currentStep === steps[steps.length - 1].id ? 'Place Order' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}