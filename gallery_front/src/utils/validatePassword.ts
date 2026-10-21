export const validatePassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    password.length <= 64 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[@!$*-]/.test(password)
  );
};
