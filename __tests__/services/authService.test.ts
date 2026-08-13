import { authService } from '../../src/services/auth/authService';

describe('AuthService Suite', () => {
  it('authenticates user successfully with valid credentials', async () => {
    const res = await authService.login({
      emailOrPhone: 'sarah.jenkins@resporesence.org',
      password: 'ValidPassword123',
    });

    expect(res.success).toBe(true);
    expect(res.token).toBeDefined();
    expect(res.user?.fullName).toBe('Dr. Sarah Jenkins');
  });

  it('rejects login with wrong password', async () => {
    const res = await authService.login({
      emailOrPhone: 'sarah.jenkins@resporesence.org',
      password: 'WrongPass123',
    });

    expect(res.success).toBe(false);
    expect(res.message).toContain('Invalid credentials');
  });

  it('handles user registration', async () => {
    const res = await authService.register({
      fullName: 'Alex River',
      email: 'alex@resporesence.org',
      phone: '+15550001111',
      password: 'StrongPassword123',
      confirmPassword: 'StrongPassword123',
    });

    expect(res.success).toBe(true);
    expect(res.user?.fullName).toBe('Alex River');
  });

  it('handles OTP verification', async () => {
    const res = await authService.verifyOtp('123456', 'alex@resporesence.org');
    expect(res.success).toBe(true);
  });

  it('rejects invalid OTP 000000', async () => {
    const res = await authService.verifyOtp('000000', 'alex@resporesence.org');
    expect(res.success).toBe(false);
  });
});
