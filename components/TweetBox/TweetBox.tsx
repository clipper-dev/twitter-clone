/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import styles from "./TweetBox.module.css";
import { HiPhoto, HiGif, HiListBullet } from "react-icons/hi2";
import { HiEmojiHappy, HiCalendar, HiLocationMarker } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { TweetPure, Tweet } from "../../typings.def";
import { postTweet } from "../../utils/tweets";

interface Props {
  toggleRefetchFlag: () => void;
}
export default function TweetBox({ toggleRefetchFlag }: Props) {
  const [tweetInput, setTweetInput] = useState<string>("");
  const { data: session } = useSession();
  const [image, setImage] = useState<string>("");
  const [showImageBox, setShowImageBox] = useState<boolean>(false);

  const addTweet = async () => {
    const tweetPure: TweetPure = {
      content: tweetInput,
      image: image || "",
      username: session?.user?.name || "Anonymous",
      picture:
        session?.user?.image ||
        "https://randomuser.me/api/portraits/women/1.jpg",
    };
    await postTweet(tweetPure);
  };

  const handleAddTweet = async (e: any) => {
    e.preventDefault();
    await addTweet();
    setTweetInput("");
    setImage("");
    setShowImageBox(false);
    toggleRefetchFlag();
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.profilePicture}
        src={
          session?.user?.image ||
          "https://randomuser.me/api/portraits/women/1.jpg"
        }
        alt="User profile"
        width={48}
        height={48}
      />
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
            <HiPhoto onClick={() => setShowImageBox(!showImageBox)} />
            <HiGif />
            <HiListBullet />
            <HiEmojiHappy />
            <HiCalendar />
            <HiLocationMarker />
          </div>

          <button
            disabled={!tweetInput}
            className={styles.submitButton}
            onClick={(e) => {
              handleAddTweet(e);
            }}
          >
            Tweet
          </button>
        </div>
        {showImageBox && (
          <div className={styles.imageBox}>
            <input
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {image && <img src={image} alt="Image preview" width="90%" />}
          </div>
        )}
      </form>
    </div>
  );
}
