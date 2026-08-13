export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, message: 'Please enter a valid email address.' };
  }
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, message: 'Phone number is required.' };
  }
  const phoneClean = phone.replace(/[\s\-()+]/g, '');
  if (!/^\d{7,15}$/.test(phoneClean)) {
    return { isValid: false, message: 'Phone number must be between 7 and 15 digits.' };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Password is required.' };
  }
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number.' };
  }
  return { isValid: true };
};

export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password.' };
  }
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match.' };
  }
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required.` };
  }
  return { isValid: true };
};

export const validateOtp = (otp: string, length = 6): ValidationResult => {
  if (!otp || otp.length !== length) {
    return { isValid: false, message: `OTP must be ${length} digits.` };
  }
  if (!/^\d+$/.test(otp)) {
    return { isValid: false, message: 'OTP must contain numbers only.' };
  }
  return { isValid: true };
};
