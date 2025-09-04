import React from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  CheckCircle, 
  Shield,
  DollarSign,
  Lock,
  FileText,
  User
} from "lucide-react";

const Payment = ({ formData, isSubmitting }) => {
  const PAYMENT_AMOUNT = 5500; // 10,000 naira

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const ApplicationSummary = () => (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Application Summary</h4>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Full Name:</span>
          <span className="font-medium text-gray-800">{formData.full_name}</span>
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
          <span className="text-gray-600">University:</span>
          <span className="font-medium text-gray-800">{formData.university}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Course:</span>
          <span className="font-medium text-gray-800">{formData.course}</span>
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
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Review & Submit</h3>
        <p className="text-gray-600">Review your application and submit to proceed to payment</p>
      </div>

      <ApplicationSummary />

      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <div className="mb-6">
          <CreditCard className="w-16 h-16 mx-auto text-green-600 mb-4" />
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Ready to Submit
          </h4>
          <p className="text-gray-600 mb-4">
            Click the submit button below to complete your scholarship application and proceed to payment
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

        {/* Security Features */}
        <div className="text-center">
          <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
            <Shield className="w-4 h-4 mr-2" />
            <span>Secured Payment Processing</span>
          </div>
          <div className="flex items-center justify-center text-xs text-gray-400">
            <Lock className="w-3 h-3 mr-1" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Application Information
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Your application will be processed after successful payment</li>
          <li>• You will be redirected to a secure payment gateway</li>
          <li>• The application fee is non-refundable</li>
          <li>• You will receive a confirmation email after submission</li>
          <li>• Accepted payment methods: Card, Bank Transfer, USSD</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Payment;