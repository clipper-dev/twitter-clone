import React from "react";
import styles from "./Feed.module.css";
import {BsStars} from 'react-icons/bs'

export default function Feed() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Home</h1>
        <h1 className={styles.swapFeedIcon}><BsStars/></h1>
      </div>
    </div>
  );
}
