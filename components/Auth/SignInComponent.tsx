"use client";
import React from "react";
import styles from "./SignInComponent.module.css";
import { signIn } from "next-auth/react";

export default function SignInComponent() {
  return (
    <div className={styles.container}>
      <h2>Welcome 👋</h2>
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Sign in Google
      </button>
    </div>
  );
}
