import { jwtDecode } from "jwt-decode";

export const getClientCookie = (name) => {
  if (typeof document === "undefined") return null; // Prevent server errors
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return null;
};

export const getAuthToken = () => getClientCookie("authToken");
export const getAuthUser = () => getClientCookie("authUser");

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};