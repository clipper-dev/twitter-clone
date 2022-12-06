/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import styles from "./Sidebar.module.css";
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
  HiLogout,
} from "react-icons/hi";
import Image from "next/image";
import SidebarRow from "./SidebarRow";
import {signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
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
        {session ? (
          <div className={styles.sidebar}>
            <div className={styles.sidebarInner}>
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
            <div className={styles.profile} onClick={()=> signOut()}>
              <div className={styles.content}>
                <img
                  className={styles.profilePicture}
                  src={
                    session?.user?.image ||
                    "https://randomuser.me/api/portraits/women/1.jpg"
                  }
                  alt="User profile"
                  width={40}
                  height={40}
                />
                <div className={styles.profileText}>
                  <h3>{session?.user?.name}</h3>
                  <p>@{session?.user?.name?.toLowerCase().replace(/\s+/g, "")}</p>
                </div>
              </div>
              <HiLogout className={styles.profileButton}/>
            </div>
            <div className={styles.profileMobile} onClick={()=> signOut()}>
              <div className={styles.content}>
                <img
                  className={styles.profilePicture}
                  src={
                    session?.user?.image ||
                    "https://randomuser.me/api/portraits/women/1.jpg"
                  }
                  alt="User profile"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <SidebarRow Icon={HiOutlineHashtag} title="Explore" />
            <SidebarRow Icon={HiOutlineDotsCircleHorizontal} title="More" />
          </>
        )}
      </div>
  );
}
