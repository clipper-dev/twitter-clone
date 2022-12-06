import React from "react";
import { IconType } from "react-icons";
import styles from "./SidebarRow.module.css";

interface Props {
  Icon: IconType;
  title: string;
}

export default function SidebarRow({ Icon, title}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <span>{title}</span>
    </div>
  );
}
