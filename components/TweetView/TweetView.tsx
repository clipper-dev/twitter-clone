/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { Comment, Tweet } from "../../typings.def";
import styles from "./TweetView.module.css";
import TimeAgo from "react-timeago";

import { HiOutlineSwitchVertical, HiUpload } from "react-icons/hi";
import { HiOutlineHeart, HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

interface Props {
  tweet: Tweet;
}

export default function TweetView({ tweet }: Props) {
  const [comments, setComments] = React.useState<Comment[]>([]);

  useEffect(() => {
    const GetComments = async (tweetId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/getComments/${tweetId}`
      );
      const data = await res.json();
      return data;
    }
  }, []);

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
        <div className={styles.icons}>
          <div className={styles.icon}>
            <HiOutlineChatBubbleOvalLeft />
            <p>1</p>
          </div>
          <div className={styles.icon}>
            <HiOutlineSwitchVertical />
            <p></p>
          </div>
          <div className={styles.icon}>
            <HiOutlineHeart />
            <p>3</p>
          </div>
          <div className={styles.icon}>
            <HiUpload />
          </div>
        </div>
      </div>
    </div>
  );
}
