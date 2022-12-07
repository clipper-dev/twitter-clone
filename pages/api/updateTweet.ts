import { TweetUpdated } from '../../typings.def';
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TweetUpdated = req.body;

/* make an update mutation for sanity.io */
    const mutation = {
        mutations: [
            {
                patch: {
                    id: data._id,
                    set: {
                        _type: "tweet",
                        content: data.content,
                        username: data.username,
                        picture: data.picture,
                        image: data.image,
                    },
                }
            }
        ]
    };
  const endpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2022-12-12/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    body: JSON.stringify(mutation),
  });
  const result = await response.json();
  res.status(200).json({ message: "OK" });
}
