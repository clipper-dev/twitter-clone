import React from "react";
import { HiSearch } from "react-icons/hi";
import styles from "./Widgetbar.module.css";

export default function Widgetbar() {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
          <HiSearch className={styles.searchIcon}/>
        <input type="text" placeholder="Search Twitter" />
      </div>
    </div>
  );
}
