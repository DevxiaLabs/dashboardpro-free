/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password meets minimum requirements
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Validate a required field is not empty
 */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate passwords match
 */
export function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

/**
 * Validate a number is positive
 */
export function isPositiveNumber(value: number): boolean {
  return value > 0;
}

/**
 * Get validation error message for a field
 */
export function getFieldError(
  fieldName: string,
  value: string,
  rules: {
    required?: boolean;
    email?: boolean;
    minLength?: number;
    matchWith?: { value: string; label: string };
  }
): string | null {
  if (rules.required && !isRequired(value)) {
    return `${fieldName} is required`;
  }
  if (rules.email && value && !isValidEmail(value)) {
    return "Please enter a valid email address";
  }
  if (rules.minLength && value && value.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }
  if (rules.matchWith && value !== rules.matchWith.value) {
    return `${fieldName} must match ${rules.matchWith.label}`;
  }
  return null;
}
