import Image from "next/image";
import React, { useState } from "react";
import styles from "./TweetBox.module.css";
import { HiPhoto, HiGif, HiListBullet } from "react-icons/hi2";
import { HiEmojiHappy, HiCalendar, HiLocationMarker } from "react-icons/hi";

export default function TweetBox() {
  const [tweetInput, setTweetInput] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.profilePicture}>
        <Image
          src="https://randomuser.me/api/portraits/women/1.jpg"
          alt="User profile"
          layout="fill"
        />
      </div>
      <form>
        <input
          type="text"
          placeholder="What's happening?"
          value={tweetInput}
          onChange={(e) => setTweetInput(e.target.value)}
        />
        <div className={styles.items}>
          {/* icons */}
          <div className={styles.utilityButtons}>
            <HiPhoto />
            <HiGif />
            <HiListBullet />
            <HiEmojiHappy />
            <HiCalendar />
            <HiLocationMarker />
          </div>
          {/* submiting form */}
          <button disabled={!tweetInput} className={styles.submitButton}>Tweet</button>
        </div>
      </form>
    </div>
  );
}
