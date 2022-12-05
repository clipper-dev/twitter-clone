export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Content of the comment',
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
      name: 'tweet',
      title: 'Commented tweet',
      description: 'The tweet the following comment has been added to.',
      type: 'reference',
      to: {
        type: 'tweet'
      }
    },
  ],
}