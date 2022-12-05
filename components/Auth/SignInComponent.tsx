"use client"
import React from 'react'
import styles from './SignInComponent.module.css'
import { getProviders, signIn } from "next-auth/react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

export default function SignInComponent({providers}:Props) {
  
  return (
    <div className={styles.container}>
      <h2>Welcome 👋</h2>
       {Object.values(providers!).map((provider)=>(
        <div key={provider.name}>
          <button onClick={()=>signIn(provider.id, {
            callbackUrl: "localhost:3000"
          })}>Sign in with {provider.name}</button>
          </div>
            ))}
    </div>
  )
}