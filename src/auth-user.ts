import { Users } from "pages/project-list/search-panel";
const localStorageKey = "__auth_user_token__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: Users }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (param: { username: string; password: string }) => {
  fetch(`${apiUrl}/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      console.log("ok");
      return handleUserResponse(await response.json());
    }
  });
};

export const register = (param: { username: string; password: string }) => {
  fetch(`${apiUrl}/register`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(localStorageKey);
