export const validatePassword = (password: string): boolean => {
  if (!password.match(/[a-z]/)?.length) {
    return false;
  }

  if (!password.match(/\d/)?.length) {
    return false;
  }

  return true;
};
