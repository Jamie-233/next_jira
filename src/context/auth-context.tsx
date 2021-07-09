import React, { ReactNode, useCallback } from "react";
import { User } from "pages/project-list/search-panel";
import * as auth from "auth-user";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageError, FullPageLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "store/auto.slice";
export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

// const AuthContext =
//   React.createContext<
//     | {
//         user: User | null;
//         login: (form: AuthForm) => Promise<void>;
//         register: (form: AuthForm) => Promise<void>;
//         logout: () => Promise<void>;
//       }
//     | undefined
//   >(undefined);

// AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    error,
    isIdle,
    isLoading,
    isError,
    // data: user,
    // setData: setUser,
  } = useAsync<User | null>();
  // const [user, setUser] = useState<User | null>(null);

  // const login = (form: AuthForm) => auth.login(form).then(setUser);
  // const register = (form: AuthForm) => auth.register(form).then(setUser);
  // const logout = () => auth.logout().then(() => setUser(null));

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  // return (
  //   <AuthContext.Provider
  //     children={children}
  //     value={{ user, login, register, logout }}
  //   />
  // );

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };

  // const context = React.useContext(AuthContext);
  // if (!context) throw new Error("useAuth Must Be Used in AuthProvider");
  // return context;
};
