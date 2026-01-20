"use client";

import { useContext, createContext, ReactNode } from "react";

interface AuthProps {
  authState: { authenticated: boolean | null; user: any };
  onRegister: (email: string, password: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({} as AuthProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //auth logic here
};
