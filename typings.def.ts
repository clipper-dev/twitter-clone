export type TweetPure = {
    content: string
    username: string
    picture: string
    image?: string
}
export interface TweetUpdated extends TweetPure {
    _id: string
}
export interface Tweet extends TweetPure {
    _id: string
    _createdAt: string
    _updatedAt: string
    _type: 'tweet'
    _rev: string
}

export type CommentPure = {
    content: string
    username: string
    picture: string
    tweetId: string
}

export interface Comment extends CommentPure {
    _id: string
    _createdAt: string
    _updatedAt: string
    _type: 'comment'
    _rev: string
    tweet: {
        _ref: string
        _type: 'reference'
    }
}