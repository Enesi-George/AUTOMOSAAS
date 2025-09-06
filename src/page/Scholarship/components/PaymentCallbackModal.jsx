import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Loader2, ExternalLink } from "lucide-react";
import { getPaymentStatus } from "../../../services/register";
import { useRef } from "react";
import { paymentCallback } from "../../../services/register";

const PaymentCallbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [tnxReference, setTnxReference] = useState(null);

  const hasVerified = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const trxref = urlParams.get("trxref");
    const reference = urlParams.get("reference");

    if ((trxref || reference) && !hasVerified.current) {
      setIsOpen(true);
      hasVerified.current = true;
      verifyPayment(trxref || reference);
    }
  }, []);

  const verifyPayment = async (reference) => {
    setTnxReference(reference);
    await paymentCallback({ reference });

    try {
      setIsLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use getPaymentStatus instead of paymentCallback to avoid double processing
      const response = await getPaymentStatus(reference);

      if (response.status && response.data.status === "completed") {
        setPaymentStatus({
          status: "success",
          amount: response.data.amount,
          paid_at: response.data.paid_at,
          email: response.data.email,
        });
      } else {
        setPaymentStatus({ status: "failed" });
        setError(response.message || "Payment verification failed");
      }
    } catch (err) {
      console.error("Payment verification error:", err);
      setPaymentStatus({ status: "failed" });
      setError(
        err.response?.data?.message || "Failed to verify payment status"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Clean URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
      >
        <div className="p-6">
          {isLoading ? (
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Verifying Payment...
              </h3>
              <p className="text-gray-600">
                Please wait while we verify your payment status.
              </p>
            </div>
          ) : paymentStatus?.status === "success" ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                Your scholarship application has been processed successfully.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-left">
                <h4 className="font-semibold text-green-800 mb-2">
                  Payment Details
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-semibold text-green-700">
                      {tnxReference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-700">
                      &#8358;{paymentStatus.amount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-green-700 capitalize">
                      {paymentStatus.status}
                    </span>
                  </div>
                  {paymentStatus.paid_at && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paid At:</span>
                      <span className="font-semibold text-green-700 capitalize">
                        {new Date(paymentStatus.paid_at).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {paymentStatus.email && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-green-700 capitalize">
                        {paymentStatus.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                You will receive a confirmation email shortly with your
                application details.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* <XCircle className="w-10 h-10 text-red-600" /> */}
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              {/* <h3 className="text-xl font-bold text-red-800 mb-2">
                Payment Failed
              </h3> */}
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                {error || "There was an issue with your payment."}
              </p>
              {/* <p className="text-sm text-gray-500 mb-4">
                Please try again or contact support if the issue persists.
              </p> */}
               <p className="text-gray-600 mb-4">
                Your scholarship application has been processed successfully.
              </p>

              <p className="text-sm text-gray-500 mb-4">
                You will receive a confirmation email shortly with your
                application details.
              </p>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              {isLoading ? "Please Wait..." : "Continue"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCallbackModal;
