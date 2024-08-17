import { create } from "zustand";

interface AuthState {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
  clearApiKey: () => void;
}

const safeLocalStorage = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("LocalStorage error", error);
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("LocalStorage error", error);
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("LocalStorage error", error);
    }
  },
};

export const useAuthStore = create<AuthState>()((set) => ({
  apiKey: safeLocalStorage.getItem("api_key") || null,
  setApiKey: (key: string | null) => {
    if (key) {
      safeLocalStorage.setItem("api_key", key);
    } else {
      safeLocalStorage.removeItem("api_key");
    }
    set({ apiKey: key });
  },
  clearApiKey: () => {
    safeLocalStorage.removeItem("api_key");
    set({ apiKey: null });
  },
}));
