import React from "react";
import { Tweet } from "../../typings.def";
import styles from "./TweetView.module.css";
import TimeAgo from "react-timeago";

interface Props {
  tweet: Tweet;
}

export default function TweetView({ tweet }: Props) {
  return (
    <div className={styles.container}>
      <img
        className={styles.picture}
        src={tweet.picture}
        alt="Profile picture"
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.user}>{tweet.username}</div>
          <div className={styles.userName}>
            @{tweet.username.toLowerCase().replace(/\s+/g, "")}
          </div>
          <TimeAgo className={styles.timeAgo} date={tweet._createdAt} />
        </div>
        <div className={styles.tweet}>{tweet.content}</div>
        <img className={styles.image} src={tweet.image} alt="Tweets image" />
      </div>
    </div>
  );
}
