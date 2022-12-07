"use client"
import React from "react";
import styles from "./Feed.module.css";
import {BsStars} from 'react-icons/bs'
import TweetBox from "../TweetBox/TweetBox";
import { Tweet } from "../../typings.def";

import TweetView from "../TweetView/TweetView";
import { useSession } from "next-auth/react";

interface Props {
  tweets: Tweet[]
}

export default function Feed({ tweets}:Props) {
  const {data: session} = useSession();
  const [tweetsFetched, setTweetsFetched] = React.useState<Tweet[]>(tweets);


  const refetchTweets = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getTweets`);
    const data = await res.json();
    const tweets: Tweet[] = data.tweets;
    setTweetsFetched(tweets);
  };

  const toggleRefetchFlag = () => {
    refetchTweets();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Home</h1>
        <h1 className={styles.swapFeedIcon}><BsStars/></h1>
      </div>
      {session && <TweetBox toggleRefetchFlag={toggleRefetchFlag}/>}
      {tweetsFetched.map(tweet => {
        return (
          <TweetView key={tweet._id} tweet={tweet} toggleRefetchFlag={toggleRefetchFlag}/>
        )
      })}
    </div>
  );
}
