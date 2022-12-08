/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { HiCheck, HiPencil, HiTrash } from "react-icons/hi2";
import ReactTimeago from "react-timeago";
import { Comment, CommentUpdated } from "../../typings.def";
import { deleteComment, updateComment } from "../../utils/comments";
import styles from "./CommentView.module.css";

interface Props {
  comment: Comment;
  toggleRefetchFlag: () => void;
}

export default function CommentView({ comment, toggleRefetchFlag }: Props) {
  const [editComment, setEditComment] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>(comment.content);
  const { data: session } = useSession();

  const handleEditComment = async () => {
    const updatedComment: CommentUpdated = {
      content: editedComment,
      _id: comment._id,
      username: comment.username,
      picture: comment.picture,
      tweetId: comment.tweetId,
    };
    await updateComment(updatedComment);
    setEditComment(false);
    toggleRefetchFlag();
  };

    const handleDeleteComment = async () => {
        await deleteComment(comment._id);
        toggleRefetchFlag();
    };

  return (
    <div className={styles.comment}>
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
          <ReactTimeago className={styles.timeAgo} date={comment._createdAt} />
          {comment.username === session?.user?.name &&
            (editComment ? (
              <>
                <HiCheck
                  className={styles.editTweet}
                  onClick={() => handleEditComment()}
                />
                <HiX
                  className={styles.editTweet}
                  onClick={() => setEditComment(false)}
                />
              </>
            ) : (
              <>
                <HiPencil
                  className={styles.editTweet}
                  onClick={() => setEditComment(true)}
                />
                <HiTrash
                    className={styles.editTweet}
                    onClick={() => handleDeleteComment()}
                />
              </>
            ))}
        </div>
        {editComment ? (
          <input
            className={styles.editTweetInput}
            value={editedComment}
            onChange={(e) => {
              setEditedComment(e.target.value);
            }}
          />
        ) : (
          <div className={styles.tweet}>{comment.content}</div>
        )}
      </div>
    </div>
  );
}
