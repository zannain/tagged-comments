import { User } from "../models/user.model";

export function getUsers(): User[] {
  const users: User[] = [
    { userID: 1, name: 'Luke' },
    { userID: 2, name: 'Darth' },
    { userID: 3, name: 'Leia' },
    { userID: 4, name: 'Han' },
    { userID: 5, name: 'Yoda' },
  ];
  return users;
}

export const defaultAuthor: User = {
  userID: 0,
  name: 'Baby Yoda'
}

