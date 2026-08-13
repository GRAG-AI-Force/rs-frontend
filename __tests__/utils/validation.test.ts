import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateOtp,
} from '../../src/utils/validation';

describe('Form Validation Utility Suite', () => {
  it('validates email correctly', () => {
    expect(validateEmail('test@resporesence.org').isValid).toBe(true);
    expect(validateEmail('invalid-email').isValid).toBe(false);
    expect(validateEmail('').isValid).toBe(false);
  });

  it('validates phone number correctly', () => {
    expect(validatePhone('+15552345678').isValid).toBe(true);
    expect(validatePhone('123').isValid).toBe(false);
  });

  it('validates password strength rules', () => {
    expect(validatePassword('Weak123').isValid).toBe(false); // short
    expect(validatePassword('nouppercase123').isValid).toBe(false); // no caps
    expect(validatePassword('NoNumbersHere').isValid).toBe(false); // no numbers
    expect(validatePassword('ValidPass123').isValid).toBe(true);
  });

  it('validates password matching', () => {
    expect(validateConfirmPassword('Pass1234', 'Pass1234').isValid).toBe(true);
    expect(validateConfirmPassword('Pass1234', 'Different').isValid).toBe(false);
  });

  it('validates 6-digit OTP code', () => {
    expect(validateOtp('123456', 6).isValid).toBe(true);
    expect(validateOtp('12345', 6).isValid).toBe(false);
    expect(validateOtp('abc123', 6).isValid).toBe(false);
  });
});
