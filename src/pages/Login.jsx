import React from "react";
import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host";
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", JSON.stringify(true));
    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const error = useActionData();
  const message = useLoaderData();
  const navigate = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {error && <h3 className="red">{error}</h3>}
      {message && <h3>{message}</h3>}
      <Form className="login-form" method="post" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigate.state === "submitting"}> {navigate.state === "submitting" ? "Logging in..." : "Log in"}</button>
      </Form>
    </div>
  );
}
