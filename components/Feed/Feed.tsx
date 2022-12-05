"use client"
import React from "react";
import styles from "./Feed.module.css";
import {BsStars} from 'react-icons/bs'
import TweetBox from "../TweetBox/TweetBox";
import { Tweet } from "../../typings.def";

import TweetView from "../TweetView/TweetView";

interface Props {
  tweets: Tweet[]
}

export default function Feed({ tweets}:Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Home</h1>
        <h1 className={styles.swapFeedIcon}><BsStars/></h1>
      </div>
      <TweetBox/>
      {tweets.map(tweet => {
        return (
          <TweetView key={tweet._id} tweet={tweet}/>
        )
      })}
    </div>
  );
}
