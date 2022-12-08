import '../../../styles/globals.css'
import React from "react";
import styles from "../../../styles/SignIn.module.css";
import { getProviders } from "next-auth/react";
import SignInComponent from "../../../components/Auth/SignInComponent";

export default async function SignIn() {
  const providers = await getProviders();
  return <div className={styles.container}>
    <SignInComponent/>
  </div>;
}
