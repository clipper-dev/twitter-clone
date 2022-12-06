import { Comment, Tweet } from '../../typings.def';
import type { NextApiRequest, NextApiResponse } from 'next'
import {groq} from 'next-sanity'
import {client} from '../../sanity'


const query = groq`
  *[_type=="comment" && references(*[_type=="tweet" && _id==$tweetId]._id)] {
    _id,
    ...
  } | order(_createdAt desc)
`

type Data = {
  comments: Comment[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {tweetId} = req.query;
  
  const comments : Comment[] = await client.fetch(query, {tweetId});
  res.status(200).json({ comments })
}
