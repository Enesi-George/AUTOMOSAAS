import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Shield,
  DollarSign,
  Lock
} from "lucide-react";

const Payment = ({ formData, onPaymentSuccess, isSubmitting, setIsSubmitting }) => {
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failed', null
  const [paymentError, setPaymentError] = useState('');

  const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const PAYMENT_AMOUNT = 10000; // 10,000 naira

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const initializePaystackPayment = () => {
    if (!PAYSTACK_PUBLIC_KEY) {
      setPaymentError('Payment configuration error. Please contact support.');
      setPaymentStatus('failed');
      return;
    }

    setIsSubmitting(true);
    setPaymentError('');
    setPaymentStatus(null);

    // Check if PaystackPop is loaded
    if (typeof PaystackPop === 'undefined') {
      // If Paystack is not loaded, load it dynamically
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => {
        proceedWithPayment();
      };
      script.onerror = () => {
        setPaymentError('Failed to load payment system. Please try again.');
        setPaymentStatus('failed');
        setIsSubmitting(false);
      };
      document.head.appendChild(script);
    } else {
      proceedWithPayment();
    }
  };

  const proceedWithPayment = () => {
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: PAYMENT_AMOUNT * 100, // Convert to kobo
      currency: 'NGN',
      metadata: {
        fullName: formData.fullName,
        qualification: formData.qualification,
        age: formData.age,
        applicationId: `AUTOSAAS-${Date.now()}`,
        custom_fields: [
          {
            display_name: 'Full Name',
            variable_name: 'full_name',
            value: formData.fullName
          },
          {
            display_name: 'Qualification',
            variable_name: 'qualification',
            value: formData.qualification
          },
          {
            display_name: 'Age',
            variable_name: 'age',
            value: formData.age
          }
        ]
      },
      callback: function(response) {
        setIsSubmitting(false);
        setPaymentStatus('success');
        // Call the success handler with payment reference
        onPaymentSuccess({
          reference: response.reference,
          amount: PAYMENT_AMOUNT,
          status: 'success'
        });
      },
      onClose: function() {
        setIsSubmitting(false);
        setPaymentError('Payment was cancelled. Please try again to complete your application.');
        setPaymentStatus('failed');
      }
    });

    handler.openIframe();
  };

  const ApplicationSummary = () => (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Application Summary</h4>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Full Name:</span>
          <span className="font-medium text-gray-800">{formData.fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Email:</span>
          <span className="font-medium text-gray-800">{formData.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Qualification:</span>
          <span className="font-medium text-gray-800">{formData.qualification}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Age:</span>
          <span className="font-medium text-gray-800">{formData.age} years</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Documents:</span>
          <span className="font-medium text-green-600">
            {formData.documents?.qualification && formData.documents?.passport ? '✓ Uploaded' : '✗ Missing'}
          </span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-bold">
          <span className="text-gray-800">Application Fee:</span>
          <span className="text-green-600">{formatCurrency(PAYMENT_AMOUNT)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment</h3>
        <p className="text-gray-600">Complete your scholarship application payment</p>
      </div>

      <ApplicationSummary />

      {paymentStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg"
        >
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3" />
            <h4 className="text-lg font-semibold">Payment Successful!</h4>
          </div>
          <p className="text-sm">
            Your payment has been processed successfully. Your scholarship application is now complete.
            We will review your application and get back to you via email.
          </p>
        </motion.div>
      )}

      {paymentStatus === 'failed' && paymentError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg"
        >
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p className="text-sm">{paymentError}</p>
          </div>
        </motion.div>
      )}

      {paymentStatus !== 'success' && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <div className="mb-6">
            <CreditCard className="w-16 h-16 mx-auto text-green-600 mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Secure Payment
            </h4>
            <p className="text-gray-600 mb-4">
              Pay your application fee of {formatCurrency(PAYMENT_AMOUNT)} to complete your scholarship application
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-700 mb-1">
                {formatCurrency(PAYMENT_AMOUNT)}
              </div>
              <div className="text-sm text-green-600">Application Fee</div>
            </div>
          </div>

          <button
            onClick={initializePaystackPayment}
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pay with Paystack
              </>
            )}
          </button>

          {/* Security Features */}
          <div className="text-center">
            <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
              <Shield className="w-4 h-4 mr-2" />
              <span>Secured by Paystack</span>
            </div>
            <div className="flex items-center justify-center text-xs text-gray-400">
              <Lock className="w-3 h-3 mr-1" />
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Payment Information
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Payment is processed securely through Paystack</li>
          <li>• The application fee is non-refundable</li>
          <li>• You will receive a payment confirmation email</li>
          <li>• Payment is required to complete your application</li>
          <li>• Accepted payment methods: Card, Bank Transfer, USSD</li>
        </ul>
      </div>

      {/* Load Paystack Script */}
      {typeof window !== 'undefined' && !window.PaystackPop && (
        <script src="https://js.paystack.co/v1/inline.js"></script>
      )}
    </motion.div>
  );
};

Payment.validateStep = (formData) => {
  const errors = {};
  
  if (!formData.paymentReference) {
    errors.payment = "Payment is required to complete your application";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default Payment;
