import { TweetUpdated } from './../typings.def';
/* UPDATE */
export const likeTweet = async (tweet: TweetUpdated): Promise<void> => {
    const res = await fetch(`/api/likeTweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweet),
    });
  };