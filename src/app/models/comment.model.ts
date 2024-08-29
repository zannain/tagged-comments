import { User } from "./user.model"

export interface Comment {
  id: number
  content: string
  mentionedUsers?: User[]
  author: User
  createdAt: Date
}
