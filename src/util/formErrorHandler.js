export const checkPasswords = (pw1, pw2) => {
  if (pw1 === pw2) return true;
  return false;
};

export const checkEmails = (e1, e2) => {
  if (!e1.contains("@") || !e2.contains("@")) return false;
};
