import { Tweet, TweetPure, TweetUpdated } from "../typings.def";

/* CREATE */
export const postTweet = async (tweet: TweetPure): Promise<void> => {
  await fetch(`/api/postTweet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tweet),
  });
};

/* READ */
export const fetchTweets = async (): Promise<Tweet[]> => {
  const res = await fetch(`/api/getTweets`);
  const data = await res.json();
  const tweets: Tweet[] = data.tweets;
  return tweets;
};

/* UPDATE */
export const updateTweet = async (tweet: TweetUpdated): Promise<void> => {
  const res = await fetch(`/api/updateTweet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tweet),
  });
};

/* DELETE */
export const deleteTweet = async (id: string): Promise<void> => {
  const res = await fetch(`/api/deleteTweet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id as string),
  });
};