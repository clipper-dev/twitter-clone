export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Content of the tweet',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'picture',
      title: 'Profile picture',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Tweet image',
      type: 'string',
    },
    {
      name: 'likes',
      title: 'People liking the tweet',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }
  ],
}