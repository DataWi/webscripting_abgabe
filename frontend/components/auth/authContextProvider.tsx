import { useRouter } from "next/router";
import React, { createContext, use, useEffect, useState } from "react";
import useHttp from "../util/hooks/useHttp";

type AuthUser = {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
};

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string, target?: string) => void;
  logout: () => void;
  user: AuthUser | null;
  token: string;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: "",
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
  const { isLoading, error, data, sendRequest, clear } = useHttp();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const basic = localStorage.getItem("basic");
    if (basic) {
      setToken(basic);
    }
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuthenticated(true);
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const basic = localStorage.getItem("basic");
    if (basic) {
      return;
    }
    if (token !== "") return;
    setTimeout(() => {
      sendRequest({
        url: "http://localhost/api/setup",
        method: "GET",
        reqIdentifer: "auth",
      });
    }, 500);
  }, [sendRequest, token]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("basic", data.token);
      }
      clear();
    }
  }, [isLoading, error, data]);

  const router = useRouter();

  const login = (
    userData: AuthUser,
    token: string,
    target: string = "/courses"
  ) => {
    setIsAuthenticated(true);
    localStorage.removeItem("basic");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(token);
    router.push(target);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, token }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthContextProvider, useAuth };
