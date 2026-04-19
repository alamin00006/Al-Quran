import { redirect } from "next/navigation";

// Redirects legacy search route requests back to the home search experience.
export default function SearchRedirect() {
  redirect("/");
}
