import '../styles/globals.css'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed/Feed'
import Sidebar from '../components/Sidebar/Sidebar'
import Widgetbar from '../components/Widgetbar/Widgetbar'
import styles from '../styles/Home.module.css'
import { Comment, Tweet } from '../typings.def'

import { unstable_getServerSession } from 'next-auth/next'
import { Providers } from '../components/Auth/Providers'

async function GetTweets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getTweets`);
  const data = await res.json();
  const tweets: Tweet[] = data;
  return tweets;
}
export default async function Home() {

  const tweets = await GetTweets();

  const session = await unstable_getServerSession();
  
  return (
    <Providers session={session}>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* sidebar */}
          <Sidebar/>
          {/* main feed */}
          <Feed tweets={tweets}/>
          {/* widgets */}
          <Widgetbar/>
        </main>
      </div>
    </Providers>
  )
}

