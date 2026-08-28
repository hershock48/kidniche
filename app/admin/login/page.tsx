import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/panel/auth";
import LoginForm from "./LoginForm";

export default async function AdminLogin() {
  if (await isAuthed()) redirect("/admin");
  return (
    <div className="login-box">
      <span className="kicker">Owner panel</span>
      <h1>Enter your PIN</h1>
      <p style={{ color: "var(--ink-soft)", fontSize: 14.5, marginTop: 8 }}>
        The four digits Kevin gave you. Forgot it? Call or text him.
      </p>
      <LoginForm />
    </div>
  );
}
