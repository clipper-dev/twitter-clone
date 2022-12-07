/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import { Comment, Tweet, CommentPure, TweetUpdated } from "../../typings.def";
import styles from "./TweetView.module.css";
import TimeAgo from "react-timeago";

import { HiOutlineSwitchVertical, HiUpload, HiX } from "react-icons/hi";
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiPencil,
  HiCheck,
  HiTrash,
} from "react-icons/hi2";
import { useSession } from "next-auth/react";

interface Props {
  tweet: Tweet;
  toggleRefetchFlag: () => void;
}

export default function TweetView({ tweet, toggleRefetchFlag }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState<string>("");
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const { data: session } = useSession();

  /* editing tweet */
  const [editTweet, setEditTweet] = useState<boolean>(false);
  const [editedTweet, setEditedTweet] = useState<string>(tweet.content);
  const [editedTweetUrl, setEditedTweetUrl] = useState<string | undefined>(
    tweet.image
  );

  const postUpdatedTweet = async () => {
    const updatedTweet: TweetUpdated = {
      content: editedTweet,
      image: editedTweetUrl,
      _id: tweet._id,
      username: tweet.username,
      picture: tweet.picture,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/updateTweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTweet),
    });
    toggleRefetchFlag();
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    postUpdatedTweet();
  };

  /* delete tweet */
  const deleteTweet = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/deleteTweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweet._id as string),
    });
  };
  const handleDeleteTweet = async () => {
    await deleteTweet();  
    toggleRefetchFlag();
  };

  /* adding comments */
  const refetchComments = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/getComments?tweetId=${tweet._id}`
    );
    const data = await res.json();
    const comments: Comment[] = data.comments;
    setComments(comments);
  };
  const postComment = async () => {
    const comment: CommentPure = {
      content: commentContent,
      username: session?.user?.name || "Anonymous",
      picture:
        session?.user?.image ||
        "https://randomuser.me/api/portraits/women/1.jpg",
      tweetId: tweet._id,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  };

  const handleAddComment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await postComment();
    setCommentContent("");
    setShowCommentBox(false);
    await refetchComments();
  };

  const fetchComments = async (tweetId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/getComments?tweetId=${tweetId}`
    );
    const data = await res.json();
    const comments: Comment[] = data.comments;
    return comments;
  };
  const getComments = async () => {
    const comments = await fetchComments(tweet._id);
    setComments(comments);
  };
  useEffect(() => {
    getComments();
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
          {tweet.username === session?.user?.name &&
            (editTweet ? (
              <>
                <HiCheck
                  className={styles.editTweet}
                  onClick={() => {
                    postUpdatedTweet();
                    setEditTweet(false);
                  }}
                />
                <HiX
                  className={styles.editTweet}
                  onClick={() => {
                    setEditTweet(false);
                  }}
                />
              </>
            ) : (
              <>
                <HiPencil
                  className={styles.editTweet}
                  onClick={() => {
                    setEditTweet(true);
                  }}
                />
                <HiTrash
                  className={styles.deleteTweet}
                  onClick={() => {
                    handleDeleteTweet();
                  }}
                />
              </>
            ))}
        </div>
        {editTweet ? (
          <textarea
            className={styles.editedTweetContent}
            value={editedTweet}
            onChange={(e) => {
              setEditedTweet(e.target.value);
            }}
          />
        ) : (
          <div className={styles.tweet}>{tweet.content}</div>
        )}
        {tweet.image !== "" &&
          (editTweet ? (
            <>
              <textarea
                className={styles.editedTweetContent}
                value={editedTweetUrl}
                onChange={(e) => {
                  setEditedTweetUrl(e.target.value);
                }}
              />
              <img
                className={styles.image}
                src={editedTweetUrl}
                alt="Tweets image"
              />
            </>
          ) : (
            <img className={styles.image} src={tweet.image} alt="Tweet image" />
          ))}
        <div className={styles.icons}>
          <div
            className={styles.icon}
            onClick={() => {
              setShowCommentBox(!showCommentBox);
            }}
          >
            <HiOutlineChatBubbleOvalLeft className={styles.iconInner} />
            <p>{comments.length}</p>
          </div>
          <div className={styles.icon}>
            <HiOutlineSwitchVertical className={styles.iconInner} />
            <p></p>
          </div>
          <div className={styles.icon}>
            <HiOutlineHeart className={styles.iconInner} />
            <p>3</p>
          </div>
          <div className={styles.icon}>
            <HiUpload className={styles.iconInner} />
          </div>
        </div>
        {comments?.length > 0 && (
          <div className={styles.comments}>
            {comments.map((comment) => (
              <div className={styles.comment} key={comment._id}>
                <img
                  className={styles.picture}
                  src={comment.picture}
                  alt="Profile picture"
                />
                <div className={styles.content}>
                  <div className={styles.header}>
                    <div className={styles.user}>{comment.username}</div>
                    <div className={styles.userName}>
                      @{comment.username.toLowerCase().replace(/\s+/g, "")}
                    </div>
                    <TimeAgo
                      className={styles.timeAgo}
                      date={comment._createdAt}
                    />
                    {/*                    {comment.username === session?.user?.name && <HiPencil className={styles.editComment} />}
                     */}{" "}
                  </div>
                  <div className={styles.tweet}>{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {showCommentBox && (
          <form className={styles.commentBox}>
            <img
              className={styles.picture}
              src={
                session?.user?.image ||
                "https://randomuser.me/api/portraits/women/1.jpg"
              }
              alt="Profile picture"
            />
            <div className={styles.content}>
              <div className={styles.header}>
                <span>In response to </span>
                <span className={styles.userName}>
                  @{tweet.username.toLowerCase().replace(/\s+/g, "")}
                </span>
              </div>
              <input
                className={styles.input}
                type="text"
                autoFocus
                placeholder="Tweet your reply"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <button
                disabled={!commentContent}
                onClick={(e) => {
                  handleAddComment(e);
                }}
              >
                Comment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
