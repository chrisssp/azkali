import type { AuthResponse, LoginCredentials } from './types';

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        resolve({
          user: {
            id: '1',
            email: credentials.email,
            name: 'Usuario Demo',
            role: 'admin',
          },
          token: 'mock-jwt-token-12345',
        });
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 1500);
  });
};

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
