import React from 'react';
import { CheckCircle } from 'lucide-react';

interface OrderConfirmationProps {
  orderNumber: string;
  email: string;
}

export default function OrderConfirmation({ orderNumber, email }: OrderConfirmationProps) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h2>
      <p className="text-gray-600 mb-6">
        Order #{orderNumber} has been successfully placed
      </p>
      <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto mb-8">
        <p className="text-sm text-gray-600 mb-2">
          A confirmation email has been sent to:
        </p>
        <p className="font-medium text-gray-800">{email}</p>
      </div>
      <p className="text-sm text-gray-500">
        Please check your email for the order details and receipt
      </p>
    </div>
  );
}