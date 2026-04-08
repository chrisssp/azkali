export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

// ─── Register Flow ────────────────────────────────────────────────────────────

export interface RegisterFormData {
  // Step 1 – Identity
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  // Step 2 – Credentials
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
  // Step 3 – Personal Data
  birthDate: string;
  sex: string;
  // Step 4 – Economic Data
  monthlyIncome: string;
  occupation: string;
  // Step 5 – Financial Goals
  financialGoals: string[];
}

export type RegisterStep = 1 | 2 | 3 | 4 | 5;

export interface RegisterStepProps {
  form: import('react-hook-form').UseFormReturn<RegisterFormData>;
}
