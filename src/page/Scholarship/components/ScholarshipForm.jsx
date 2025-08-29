import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  User,
  FileText,
  CreditCard,
  Loader2,
} from "lucide-react";
import BasicInformation from "./BasicInformation";
import DocumentUpload from "./DocumentUpload";
import Payment from "./Payment";
import { useRegisterMutation } from "../../../hooks/useRegisterMutation";
import PaymentCallbackModal from "./PaymentCallbackModal";

const ScholarshipForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Basic Information
    full_name: "",
    email: "",
    qualification: "",
    age: "",
    university: "",
    course: "",
    terms: "false",
    // Documents
    documents: {},
  });

  // Use the register mutation
  const { mutate: registerUser, isPending: isSubmitting } =
    useRegisterMutation();

  const steps = [
    {
      id: 0,
      title: "Basic Information",
      description: "Personal details",
      icon: User,
      component: BasicInformation,
      validateStep: BasicInformation.validateStep,
    },
    {
      id: 1,
      title: "Document Upload",
      description: "Required documents",
      icon: FileText,
      component: DocumentUpload,
      validateStep: DocumentUpload.validateStep,
    },
    {
      id: 2,
      title: "Payment",
      description: "Application fee",
      icon: CreditCard,
      component: Payment,
      validateStep: null,
    },
  ];

  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData.component;

  const isStepCompleted = (stepIndex) => {
    const step = steps[stepIndex];

    if (stepIndex === 2) {
      return false;
    }

    if (step.validateStep) {
      return step.validateStep(formData).isValid;
    }
    return false;
  };

  const handleNext = () => {
    if (currentStep === 2) {
      submitApplication();
      return;
    }

    const validation = currentStepData.validateStep
      ? currentStepData.validateStep(formData)
      : { isValid: true, errors: {} };

    if (validation.isValid) {
      setErrors({});
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setErrors(validation.errors);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const submitApplication = () => {
    registerUser(formData, {
      onSuccess: (data) => {
        if (data.status) {
          setSubmitStatus("success");
          setSubmitMessage(
            "Application submitted successfully! Redirecting to payment..."
          );

          // Redirect to payment page
          setTimeout(() => {
            window.location.href = data.data.authorization_url;
          }, 2000);
        } else {
          setSubmitStatus("error");
          setSubmitMessage(data.message || "Failed to submit application");
        }
      },
      onError: (error) => {
        console.error("Application submission error:", error);
        setSubmitStatus("error");
        setSubmitMessage(
          error.response?.data?.message ||
            error.message ||
            "Failed to submit application. Please try again or contact support."
        );
      },
    });
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isCompleted = isStepCompleted(index);
        const isAccessible = index <= currentStep;

        return (
          <React.Fragment key={step.id}>
            <button
              onClick={() => isAccessible && setCurrentStep(index)}
              disabled={!isAccessible}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : isCompleted
                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                  : isAccessible
                  ? "bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  isActive
                    ? "bg-green-600 text-white"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <div className="hidden sm:block text-left">
                <div
                  className={`font-medium ${isActive ? "text-green-800" : ""}`}
                >
                  {step.title}
                </div>
                <div className="text-sm opacity-75">{step.description}</div>
              </div>
            </button>

            {index < steps.length - 1 && (
              <div
                className={`hidden sm:block flex-1 h-px mx-4 ${
                  isCompleted ? "bg-green-300" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const NavigationButtons = () => {
    if (submitStatus === "success") return null;

    return (
      <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0 || isSubmitting}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 0 || isSubmitting
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={isSubmitting}
          className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
        >
          {currentStep < steps.length - 1 ? (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Scholarship Application
          </h2>
          <p className="text-gray-600">
            Complete all steps to submit your application
          </p>
        </div>

        <StepIndicator />

        {/* Status Messages */}
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center ${
              submitStatus === "success"
                ? "bg-green-100 border border-green-300 text-green-700"
                : "bg-red-100 border border-red-300 text-red-700"
            }`}
          >
            {submitStatus === "success" ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            <div>
              <p className="font-semibold">
                {submitStatus === "success" ? "Success!" : "Error"}
              </p>
              <p className="text-sm">{submitMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            <StepComponent
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        </AnimatePresence>

        <NavigationButtons />

        {/* Submitting Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex items-center space-x-4 shadow-xl">
              <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              <div>
                <p className="font-semibold text-gray-800">
                  Processing Application...
                </p>
                <p className="text-sm text-gray-600">
                  Please wait while we submit your application
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
          <PaymentCallbackModal />

    </div>
  );
};

export default ScholarshipForm;
