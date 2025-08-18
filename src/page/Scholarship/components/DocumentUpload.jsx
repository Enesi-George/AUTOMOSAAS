import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  File,
  Image as ImageIcon,
  X,
  AlertCircle,
  CheckCircle,
  FileText,
  Camera,
} from "lucide-react";

const DocumentUpload = ({ formData, setFormData, errors, setErrors }) => {
  const qualificationInputRef = useRef(null);
  const passportInputRef = useRef(null);

  const validateFile = (file, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = {
      // qualification: ["application/pdf", "image/jpeg", "image/png"],
      qualification: ["application/pdf"],
      passport: ["image/jpeg", "image/png"],
    };

    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    if (!allowedTypes[type].includes(file.type)) {
      const typeText =
        type === "qualification" ? "PDF, JPG, or PNG" : "JPG or PNG";
      return `File must be ${typeText} format`;
    }

    return null;
  };

  const handleFileUpload = (e, documentType) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateFile(file, documentType);
    if (error) {
      setErrors({
        ...errors,
        [documentType]: error,
      });
      return;
    }

    // Clear any previous errors
    if (errors[documentType]) {
      const newErrors = { ...errors };
      delete newErrors[documentType];
      setErrors(newErrors);
    }

    // Create file preview URL for images
    let previewUrl = null;
    if (file.type.startsWith("image/")) {
      previewUrl = URL.createObjectURL(file);
    }

    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [documentType]: {
          file,
          preview: previewUrl,
          name: file.name,
          size: file.size,
          type: file.type,
        },
      },
    });
  };

  const removeFile = (documentType) => {
    // Revoke the preview URL to prevent memory leaks
    if (formData.documents?.[documentType]?.preview) {
      URL.revokeObjectURL(formData.documents[documentType].preview);
    }

    const newDocuments = { ...formData.documents };
    delete newDocuments[documentType];

    setFormData({
      ...formData,
      documents: newDocuments,
    });

    // Clear the file input
    if (documentType === "qualification" && qualificationInputRef.current) {
      qualificationInputRef.current.value = "";
    }
    if (documentType === "passport" && passportInputRef.current) {
      passportInputRef.current.value = "";
    }
  };

  // New function to handle replace file click
  const handleReplaceFile = (documentType) => {
    const inputRef =
      documentType === "qualification"
        ? qualificationInputRef
        : passportInputRef;
    if (inputRef.current) {
      // Reset the input value to ensure change event fires even if same file is selected
      inputRef.current.value = "";
      // Trigger the file dialog
      inputRef.current.click();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const FileUploadArea = ({
    documentType,
    title,
    description,
    icon: Icon,
    acceptedFormats,
    inputRef,
  }) => {
    const document = formData.documents?.[documentType];
    const hasError = errors[documentType];

    return (
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          hasError
            ? "border-red-300 bg-red-50"
            : document
            ? "border-green-300 bg-green-50"
            : "border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50"
        }`}
      >
        <div className="text-center">
          <Icon
            className={`w-12 h-12 mx-auto mb-4 ${
              hasError
                ? "text-red-400"
                : document
                ? "text-green-500"
                : "text-gray-400"
            }`}
          />

          <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
          <p className="text-gray-600 text-sm mb-4">{description}</p>

          {!document ? (
            <>
              <input
                ref={inputRef}
                type="file"
                onChange={(e) => handleFileUpload(e, documentType)}
                accept={acceptedFormats}
                className="hidden"
                id={`upload-${documentType}`}
              />
              <label
                htmlFor={`upload-${documentType}`}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Max size: 5MB • Formats: {acceptedFormats.split(",").join(", ")}
              </p>
            </>
          ) : (
            <div className="bg-white rounded-lg p-4 border">
              {document.preview && documentType === "passport" ? (
                <div className="mb-4">
                  <img
                    src={document.preview}
                    alt="Passport preview"
                    className="max-w-full max-h-48 mx-auto rounded-lg shadow-md object-cover"
                  />
                  {/* <p className="text-sm text-green-600 mt-2 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Image looks clear and visible
                  </p> */}
                </div>
              ) : document.type === "application/pdf" ? (
                <div className="flex items-center justify-center mb-4">
                  <FileText className="w-16 h-16 text-red-500" />
                </div>
              ) : (
                <div className="flex items-center justify-center mb-4">
                  <File className="w-16 h-16 text-gray-500" />
                </div>
              )}

              <div className="text-left">
                <p className="font-medium text-gray-800 truncate">
                  {document.name}
                </p>
                <p className="text-sm text-gray-600">
                  {formatFileSize(document.size)}
                </p>
              </div>

              {/* Hidden file input for replace functionality */}
              <input
                ref={inputRef}
                type="file"
                onChange={(e) => handleFileUpload(e, documentType)}
                accept={acceptedFormats}
                className="hidden"
                id={`upload-${documentType}`}
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => handleReplaceFile(documentType)}
                  className="text-green-600 hover:text-green-700 text-sm cursor-pointer underline"
                >
                  Replace File
                </button>
                <button
                  type="button"
                  onClick={() => removeFile(documentType)}
                  className="text-red-600 hover:text-red-700 text-sm flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </button>
              </div>
            </div>
          )}

          {hasError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-2 flex items-center justify-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors[documentType]}
            </motion.p>
          )}
        </div>
      </div>
    );
  };

  const hasQualification = formData.documents?.qualification;
  const hasPassport = formData.documents?.passport;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Document Upload
        </h3>
        <p className="text-gray-600">Please upload your required documents</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Academic Qualification Certificate */}
        <FileUploadArea
          documentType="qualification"
          title="Academic Qualification Certificate"
          description="Upload your original academic qualification certificate"
          icon={FileText}
          // acceptedFormats=".pdf,.jpg,.jpeg,.png"
          acceptedFormats=".pdf only"
          inputRef={qualificationInputRef}
        />

        {/* Passport Photograph */}
        <FileUploadArea
          documentType="passport"
          title="Passport Photograph"
          description="Upload a clear, recent passport-sized photograph"
          icon={Camera}
          acceptedFormats=".jpg,.jpeg,.png"
          inputRef={passportInputRef}
        />
      </div>

      {/* Photo Quality Guidelines */}
      {hasPassport && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
            <ImageIcon className="w-5 h-5 mr-2" />
            Photo Quality Check
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ensure the photo is clear and not blurry</li>
            <li>• Face should be clearly visible and centered</li>
            <li>• Good lighting with no shadows</li>
            <li>• Plain background (white or light colored)</li>
            <li>• Recent photo (taken within the last 6 months)</li>
          </ul>
        </div>
      )}

      {/* Success Message */}
      {hasQualification && hasPassport && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          <p className="text-sm">
            All documents uploaded successfully! You can proceed to payment.
          </p>
        </motion.div>
      )}

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• All documents must be clear and legible</li>
          <li>• File size should not exceed 5MB per document</li>
          <li>• Accepted formats: JPG, PNG, PDF</li>
          <li>• Documents will be verified during the selection process</li>
        </ul>
      </div>
    </motion.div>
  );
};

DocumentUpload.validateStep = (formData) => {
  const errors = {};

  if (!formData.documents?.qualification) {
    errors.qualification =
      "Please upload your academic qualification certificate";
  }

  if (!formData.documents?.passport) {
    errors.passport = "Please upload your passport photograph";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default DocumentUpload;
