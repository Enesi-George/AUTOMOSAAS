import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import TermsModal from "./TermsModal";

const BasicInformation = ({ formData, setFormData, errors, setErrors }) => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // Course options organized by category
  const courseOptions = [
    {
      category: "Engineering & Natural Sciences",
      courses: [
        "Chemical Engineering",
        "Mechanical Engineering", 
        "Electrical Engineering",
        "Computer Science",
        "Cyber Security",
        "Engineering Physics",
        "Applied Mathematics",
        "Biochemistry and Molecular Biology",
        "Geosciences",
        "Physics"
      ]
    },
    {
      category: "Business",
      courses: [
        "Business Administration (MBA)",
        "Business Analytics",
        "Energy Business",
        "Accounting",
        "Finance",
        "International Business"
      ]
    },
    {
      category: "Arts & Sciences",
      courses: [
        "English Language Studies",
        "Anthropology",
        "Sociology",
        "History",
        "Environmental Science",
        "Geology and Earth Science",
        "Museum Science and Management"
      ]
    },
    {
      category: "Psychology & Behavioral Sciences",
      courses: [
        "Clinical Psychology",
        "Industrial-Organizational Psychology"
      ]
    },
    {
      category: "Health Sciences",
      courses: [
        "Athletic Training",
        "Speech-Language Pathology",
        "Nursing"
      ]
    },
    {
      category: "Education & Fine Arts",
      courses: [
        "Mathematics Teacher Education",
        "Music Teacher Education",
        "Fine Arts"
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear any previous errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    const { fullName, email, qualification, age, university, courseOfStudy, termsAccepted } = formData;

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters long";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email address";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!qualification) {
      newErrors.qualification = "Please select your academic qualification";
    }

    if (!age) {
      newErrors.age = "Please enter your age";
    } else if (parseInt(age) < 18) {
      newErrors.age = "Applicants must be 18 years or older";
    }

    if (!university) {
      newErrors.university = "Please select your preferred university";
    }

    if (!courseOfStudy) {
      newErrors.courseOfStudy = "Please select your preferred course of study";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Basic Information</h3>
        <p className="text-gray-600">Please provide your personal information</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-1 flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.fullName}
            </motion.p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-1 flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </motion.p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Academic Qualification */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Academic Qualification *
          </label>
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors ${
              errors.qualification ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select qualification</option>
            <option value="BSc">BSc (Bachelor of Science)</option>
            <option value="HND">HND (Higher National Diploma)</option>
            <option value="BA">BA (Bachelor of Arts)</option>
            <option value="BEng">BEng (Bachelor of Engineering)</option>
            <option value="Other">Other Bachelor's Degree</option>
          </select>
          {errors.qualification && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-1 flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.qualification}
            </motion.p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Age *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            min="18"
            max="100"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors ${
              errors.age ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your age"
          />
          {errors.age && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-1 flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.age}
            </motion.p>
          )}
        </div>
      </div>

      {/* University Selection */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Preferred University *
        </label>
        <select
          name="university"
          value={formData.university}
          onChange={handleInputChange}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors ${
            errors.university ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select your preferred university</option>
          <option value="University of Tulsa">The University of Tulsa (Oklahoma USA)</option>
          <option value="Harvard University" disabled className="text-gray-400">
            Harvard University (Not Available)
          </option>
          <option value="Stanford University" disabled className="text-gray-400">
            Stanford University (Not Available)
          </option>
          <option value="MIT" disabled className="text-gray-400">
            Massachusetts Institute of Technology (Not Available)
          </option>
          <option value="University of California Berkeley" disabled className="text-gray-400">
            University of California, Berkeley (Not Available)
          </option>
        </select>
        {errors.university && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-sm mt-1 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.university}
          </motion.p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Currently, only The University of Tulsa is available for applications. More universities will be added soon.
        </p>
      </div>

      {/* Course of Study Selection */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Preferred Course of Study *
        </label>
        <select
          name="courseOfStudy"
          value={formData.courseOfStudy || ""}
          onChange={handleInputChange}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors ${
            errors.courseOfStudy ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select your preferred course</option>
          {courseOptions.map((category, categoryIndex) => (
            <optgroup key={categoryIndex} label={category.category}>
              {category.courses.map((course, courseIndex) => (
                <option key={`${categoryIndex}-${courseIndex}`} value={course}>
                  {course}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.courseOfStudy && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-sm mt-1 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.courseOfStudy}
          </motion.p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          All courses listed are available for master's degree programs at The University of Tulsa.
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
            className={`h-5 w-5 accent-green-600 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1 ${
              errors.termsAccepted ? "border-red-500" : ""
            }`}
          />
          <div>
            <p className="text-gray-700">
              I accept the{" "}
              <button
                type="button"
                onClick={() => setIsTermsModalOpen(true)}
                className="text-green-600 underline hover:text-green-700 transition-colors"
              >
                terms and conditions
              </button>{" "}
              *
            </p>
            {errors.termsAccepted && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1 flex items-center"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.termsAccepted}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Success Message */}
      {formData.fullName && formData.email && formData.qualification && formData.age && formData.university && formData.courseOfStudy && formData.termsAccepted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          <p className="text-sm">Basic information completed! You can proceed to the next step.</p>
        </motion.div>
      )}

      {/* Terms Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </motion.div>
  );
};

BasicInformation.validateStep = (formData) => {
  const errors = {};
  const { fullName, email, qualification, age, university, courseOfStudy, termsAccepted } = formData;

  if (!fullName?.trim()) {
    errors.fullName = "Please enter your full name";
  } else if (fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters long";
  }

  if (!email?.trim()) {
    errors.email = "Please enter your email address";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  if (!qualification) {
    errors.qualification = "Please select your academic qualification";
  }

  if (!age) {
    errors.age = "Please enter your age";
  } else if (parseInt(age) < 18) {
    errors.age = "Applicants must be 18 years or older";
  }

  if (!university) {
    errors.university = "Please select your preferred university";
  }

  if (!courseOfStudy) {
    errors.courseOfStudy = "Please select your preferred course of study";
  }

  if (!termsAccepted) {
    errors.termsAccepted = "You must accept the terms and conditions to proceed";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default BasicInformation;