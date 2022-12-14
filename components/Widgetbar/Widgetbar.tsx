"use client";
import React from "react";
import { HiDotsHorizontal, HiSearch } from "react-icons/hi";
import styles from "./Widgetbar.module.css";
import { trends } from "../../Data/data";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  setFilteredTweets: React.Dispatch<React.SetStateAction<string>>;
}

export default function Widgetbar({ setFilteredTweets }: Props) {
  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
  });
  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <HiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search Twitter"
          onChange={(e) => setFilteredTweets(e.target.value)}
        />
      </div>
      {session ? (
        <div className={styles.trends}>
          <h2>Trends for you</h2>
          {trends.map((trend, index) => (
            <div key={index} className={styles.trend}>
              <div className={styles.text}>
                <p>Trending in the World</p>
                <h3>{trend.title}</h3>
                <p>{formatter.format(trend.count)} Tweets</p>
              </div>
              <HiDotsHorizontal className={styles.icon} />
            </div>
          ))}
          <div className={styles.showMore}>
            <p>Show more</p>
          </div>
        </div>
      ) : (
        <Link href="/auth/signin" className={styles.tweetButton}>
          Sign it
        </Link>
      )}
    </div>
  );
}
