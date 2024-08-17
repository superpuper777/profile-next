import { usePathname } from "next/navigation";

const useIsGuest = () => {
  const pathname = usePathname();
  return pathname === "/account/guest";
};

export default useIsGuest;
