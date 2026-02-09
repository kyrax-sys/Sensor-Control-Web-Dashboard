export type Role = "doctor" | "user";

const TOKEN_KEY = "auth_token";
const ROLE_KEY = "auth_role";

export const storeAuth = (token: string, role: Role) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
};

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getRole = (): Role | null => {
  const role = localStorage.getItem(ROLE_KEY);
  return role as Role | null;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};
