import { create } from "zustand";
import   loginUser  from "../services/auth.service";


interface AuthState {
  user: any;
  error: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  error: false,

  login: async (email, password) => {
    try {
      const data  = await  loginUser( email, password );
      console.log(data);
      localStorage.setItem("token", data?.token ?? "");
      set({ user: data?.email, token: data?.token, error: false });
    } catch (error) {
        set({ error: true });
        console.error("Error en login:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;