"use client"
import React from "react";
import styles from "./Feed.module.css";
import {BsStars} from 'react-icons/bs'
import TweetBox from "../TweetBox/TweetBox";
import { Tweet } from "../../typings.def";

import TweetView from "../TweetView/TweetView";
import { useSession } from "next-auth/react";
import { fetchTweets } from "../../utils/tweets";

interface Props {
  tweets: Tweet[]
  filteredTweets: string
}

export default function Feed({ tweets, filteredTweets}:Props) {
  const {data: session} = useSession();
  const [tweetsFetched, setTweetsFetched] = React.useState<Tweet[]>(tweets);
  
  const toggleRefetchFlag = async () => {
    setTweetsFetched(await fetchTweets());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Home</h1>
        <h1 className={styles.swapFeedIcon}><BsStars/></h1>
      </div>
      {session && <TweetBox toggleRefetchFlag={toggleRefetchFlag}/>}
      {tweetsFetched.filter((tweet) => tweet.content.toLowerCase().includes(filteredTweets.toLowerCase())).map(tweet => {
        return (
          <TweetView key={tweet._id} tweet={tweet} toggleRefetchFlag={toggleRefetchFlag}/>
        )
      })}
    </div>
  );
}
