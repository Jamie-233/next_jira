import * as auth from "auth-user";
import { useAuth } from "context/auth-context";
import { stringify } from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: Object;
  token?: string;
}

export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // RESTful API 401 Unauthorized or Token invalidation
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "Please login align" });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
      }

      return Promise.reject(data);
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};