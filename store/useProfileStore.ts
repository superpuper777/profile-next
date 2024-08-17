import { create } from "zustand";
import { ProfileDto } from "@/app/types/profile";

interface ProfileState {
  profile: ProfileDto | null;
  setProfile: (profile: ProfileDto) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile: ProfileDto) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
