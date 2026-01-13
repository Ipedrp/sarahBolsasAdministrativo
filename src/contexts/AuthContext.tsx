import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiPublic, apiPrivate } from "@/server/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  email: string;
  type: "ADMIN";
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Inicialização do auth (ESSENCIAL)
  useEffect(() => {
    const token = localStorage.getItem("@token");
    const userData = localStorage.getItem("@user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);

        apiPrivate.defaults.headers.common.Authorization = `Bearer ${token}`;
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("@token");
        localStorage.removeItem("@user");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    try {
      setError(null);

      const response = await apiPublic.post("/admin/login/returnToken", {
        email,
        password,
      });

      const { token } = response.data;

      const decoded = jwtDecode<{
        email: string;
        type: "ADMIN";
      }>(token);

      const user = {
        email: decoded.email,
        type: decoded.type,
      };

      localStorage.setItem("@token", token);
      localStorage.setItem("@user", JSON.stringify(user));

      apiPrivate.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(user);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Erro ao autenticar");
      } else {
        setError("Erro inesperado");
      }
      throw err;
    }
  }

  function signOut() {
    localStorage.removeItem("@token");
    localStorage.removeItem("@user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
 