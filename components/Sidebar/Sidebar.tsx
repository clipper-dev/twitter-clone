import React from "react";
import styles from "./Sidebar.module.css";
import {
  HiHome,
  HiHashtag,
  HiBell,
  HiMail,
  HiBookmark,
  HiViewList,
  HiUser,
  HiDotsCircleHorizontal,
} from "react-icons/hi";
import {
  HiOutlineHome,
  HiOutlineHashtag,
  HiOutlineBell,
  HiOutlineMail,
  HiOutlineBookmark,
  HiOutlineViewList,
  HiOutlineUser,
  HiOutlineDotsCircleHorizontal,
  HiPencil,
} from "react-icons/hi";
import Image from "next/image";
import SidebarRow from "./SidebarRow";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src="https://coderburg.com/extra/twitter.png"
          alt="logo"
          width={30}
          height={25}
        />
      </div>
      <SidebarRow Icon={HiOutlineHome} title="Home" />
      <SidebarRow Icon={HiOutlineHashtag} title="Explore" />
      <SidebarRow Icon={HiOutlineBell} title="Notification" />
      <SidebarRow Icon={HiOutlineMail} title="Messages" />
      <SidebarRow Icon={HiOutlineBookmark} title="Bookmarks" />
      <SidebarRow Icon={HiOutlineViewList} title="Lists" />
      <SidebarRow Icon={HiOutlineUser} title="Profile" />
      <SidebarRow Icon={HiOutlineDotsCircleHorizontal} title="More" />

      {/* tweet button */}
      <div className={styles.tweetButton}>Tweet</div>
      <div className={styles.tweetButtonMobile}>
        <HiPencil />
      </div>
    </div>
  );
}
