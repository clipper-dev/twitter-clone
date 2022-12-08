import "../styles/globals.css";
import Feed from "../components/Feed/Feed";
import Sidebar from "../components/Sidebar/Sidebar";
import Widgetbar from "../components/Widgetbar/Widgetbar";
import styles from "../styles/Home.module.css";
import { Tweet } from "../typings.def";
import { groq } from "next-sanity";
import { client } from "../sanity";

import { unstable_getServerSession } from "next-auth/next";
import { Providers } from "../components/Auth/Providers";
import MainView from "../components/MainView/MainView";

const query = groq`
  *[_type=="tweet"] {
    _id,
    ...
  } | order(_createdAt desc)
`;
export default async function Home() {
  const tweets: Tweet[] = await client.fetch(query);
  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* sidebar */}
          <Sidebar />
          {/* main feed */}
          <MainView tweets={tweets} />
        </main>
      </div>
    </Providers>
  );
}
