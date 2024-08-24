import { redirect } from "next/navigation";

export default function Home() {
  redirect("/account/list");
  return null;
}
