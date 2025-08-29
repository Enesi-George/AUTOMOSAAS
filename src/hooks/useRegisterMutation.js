import { useMutation } from '@tanstack/react-query';
import { register } from '../services/register';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (formData) => {
      const submissionData = new FormData();
      
      // Add basic information
      submissionData.append("full_name", formData.full_name);
      submissionData.append("email", formData.email);
      submissionData.append("qualification", formData.qualification);
      submissionData.append("age", formData.age);
      submissionData.append("university", formData.university);
      submissionData.append("course", formData.course);
      submissionData.append("terms", formData.terms);
      
      // Add documents - access the .file property, not the entire object
      if (formData.documents?.qualification?.file) {
        submissionData.append("documents[]", formData.documents.qualification.file);
      }
      if (formData.documents?.passport?.file) {
        submissionData.append("documents[]", formData.documents.passport.file);
      }

      return register(submissionData);
    },
    onSuccess: (data) => {
      // Handle successful registration
      console.log('Registration successful:', data);
    },
    onError: (error) => {
      // Handle error
      console.error('Registration failed:', error);
    }
  });
};