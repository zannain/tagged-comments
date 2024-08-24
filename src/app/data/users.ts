import { User } from "../models/user.model";

export function generateUsers(count: number): User[] {
  const names = [
    'John', 'Mark', 'Bryan', 'Gabbey', 'Gabe',
    'Alice', 'Bob', 'Charlie', 'Diana', 'Eve',
    'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy',
    'Mallory', 'Niaj', 'Olivia', 'Peggy', 'Walter'
  ];

  return Array.from({ length: count }, (_, index) => {
    return {
      userID: index + 1,
      name: names[index % names.length] // Reuse names if count exceeds names length
    };
  });
}

export const users = generateUsers(20);
