import { User } from "./user.model"

export interface Comment {
  id: number
  content: string
  mentionedUsers?: User[]
  createdAt: Date
}
