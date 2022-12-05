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