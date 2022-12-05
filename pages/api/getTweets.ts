import { Tweet } from '../../typings.def';
import type { NextApiRequest, NextApiResponse } from 'next'
import {groq} from 'next-sanity'
import {client} from '../../sanity'


const query = groq`
  *[_type=="tweet"] {
    _id,
    ...
  } | order(_createdAt desc)
`

type Data = {
  tweets: Tweet[]
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets: Tweet[] = await client.fetch(query);
  res.status(200).json({ tweets })
}
