import { Comment } from "../models/comment.model";
import { defaultAuthor, getUsers } from "./users";

const users = getUsers()

export const comments: Comment[] = [
  {
    id: 1,
    content: "@Luke The Force will be with you, always.",
    mentionedUsers: [users[0]],
    createdAt: new Date('2024-08-20T10:30:00'),
    author: defaultAuthor
  },
  {
    id: 2,
    content: "I am your father. @Luke",
    mentionedUsers: [users[0]],
    createdAt: new Date('2024-08-21T15:45:00'),
    author: defaultAuthor
  },
  {
    id: 3,
    content: "@Yoda Do or do not. There is no try.",
    mentionedUsers: [users[4]],
    createdAt: new Date('2024-08-22T08:15:00'),
    author: defaultAuthor
  },
  {
    id: 4,
    content: "@Han I've got a bad feeling about this.",
    mentionedUsers: [users[3]],
    createdAt: new Date('2024-08-22T12:00:00'),
    author: defaultAuthor
  },
  {
    id: 5,
    content: "@Leia Help me, Obi-Wan Kenobi. You're my only hope.",
    mentionedUsers: [users[2]],
    createdAt: new Date('2024-08-23T09:00:00'),
    author: defaultAuthor
  },
  {
    id: 6,
    content: "It's not my fault! @Han",
    mentionedUsers: [users[3]],
    createdAt: new Date('2024-08-23T10:00:00'),
    author: defaultAuthor
  },
  {
    id: 7,
    content: "In my experience, there is no such thing as luck.",
    mentionedUsers: [],
    createdAt: new Date('2024-08-23T11:00:00'),
    author: defaultAuthor
  },
  {
    id: 8,
    content: "The ability to destroy a planet is insignificant next to the power of the Force.",
    mentionedUsers: [],
    createdAt: new Date('2024-08-23T12:00:00'),
    author: defaultAuthor
  },
  {
    id: 9,
    content: "You were the Chosen One!",
    mentionedUsers: [],
    createdAt: new Date('2024-08-23T13:00:00'),
    author: defaultAuthor
  },
  {
    id: 10,
    content: "I find your lack of faith disturbing.",
    mentionedUsers: [],
    createdAt: new Date('2024-08-23T14:00:00'),
    author: defaultAuthor
  }
];

