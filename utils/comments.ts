import { Comment, CommentPure } from "../typings.def";

/* CREATE */
export const postComment = async (comment: CommentPure): Promise<void> => {
    const res = await fetch(`/api/addComment`, {
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
