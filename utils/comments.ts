import { CommentUpdated } from './../typings.def';
import { Comment, CommentPure } from "../typings.def";

/* CREATE */
export const postComment = async (comment: CommentPure): Promise<void> => {
    const res = await fetch(`/api/postComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
};

/* READ */
export const fetchComments = async (id: string): Promise<Comment[]> => {
  const res = await fetch(`/api/getComments?tweetId=${id}`);
  const data = await res.json();
  const comments: Comment[] = data.comments;
  return comments;
};

/* UPDATE */
export const updateComment = async (comment: CommentUpdated): Promise<void> => {
    const res = await fetch(`/api/updateComment`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });
    }

/* DELETE */
export const deleteComment = async (id: string): Promise<void> => {
    const res = await fetch(`/api/deleteComment`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(id as string),
    });
}
