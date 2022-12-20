import http from "./httpService";

const apiEndPoint = "/users";

export function getUser() {
  return http.get(`${apiEndPoint}/me`);
}

export function registerUser(user) {
  return http.post(apiEndPoint, user);
}

export function getUsersByAdmin() {
  return http.get(apiEndPoint);
}

export function deleteUserByAdmin(user) {
  return http.delete(`${apiEndPoint}/${user._id}`);
}
