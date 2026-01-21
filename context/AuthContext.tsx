"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { api } from "@/lib/api";

interface AuthProps {
  authState: {
    authenticated: boolean | null;
    user: Record<string, any> | null;
  };
  onRegister: (email: string, password: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    authenticated: boolean | null;
    user: any;
  }>({
    authenticated: null,
    user: null,
  });
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const res = await api.get("/auth/me");
        setAuthState({ authenticated: true, user: res.data.user });
      } catch (err: any) {
        console.log("User not authenticated", err);
        setAuthState({ authenticated: false, user: null });
      }
    };
    checkUserStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setAuthState({ authenticated: true, user: res.data.user });
      router.push("/dashboard");
      return res;
    } catch (err: any) {
      return {
        error: true,
        msg: err.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      return await api.post("/auth/register", { email, password });
    } catch (err: any) {
      return {
        error: true,
        msg: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("auth/logout");
      setAuthState({ authenticated: false, user: null });
      router.push("/login");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        onLogin: login,
        onRegister: register,
        onLogout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
