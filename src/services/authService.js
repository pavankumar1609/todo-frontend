import jwt_decode from "jwt-decode";
import http from "./httpService";

const apiEndPoint = "/auth";
const tokenKey = "token";

export async function loginUser(user) {
  const { data: jwt } = await http.post(apiEndPoint, user);
  localStorage.setItem(tokenKey, jwt);
}

export function logoutUser() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt_decode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

http.setJwt(getJwt());

const auth = {
  loginUser,
  logoutUser,
  getCurrentUser,
  loginWithJwt,
};

export default auth;
