export type TweetPure = {
    content: string
    username: string
    picture: string
    image?: string
}

export interface Tweet extends TweetPure {
    _id: string
    _createdAt: string
    _updatedAt: string
    _type: 'tweet'
    _rev: string
}

export type CommenPure = {
    content: string
    username: string
    picture: string
    tweetId: string
}

export interface Comment extends CommenPure {
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