import '../styles/globals.css'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed/Feed'
import Sidebar from '../components/Sidebar/Sidebar'
import Widgetbar from '../components/Widgetbar/Widgetbar'
import styles from '../styles/Home.module.css'
import { Comment, Tweet } from '../typings.def'
import type { NextApiRequest, NextApiResponse } from 'next'
import {groq} from 'next-sanity'
import {client} from '../sanity'

import { unstable_getServerSession } from 'next-auth/next'
import { Providers } from '../components/Auth/Providers'

const query = groq`
  *[_type=="tweet"] {
    _id,
    ...
  } | order(_createdAt desc)
`
type Data = {
  tweets: Tweet[]
}
async function GetTweetsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets: Tweet[] = await client.fetch(query);
  return tweets;
}
async function GetTweets() {
  const tweets: Tweet[] = await GetTweetsHandler({} as NextApiRequest, {} as NextApiResponse);

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

