import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Comment } from '../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [{ id: 0, content: 'Hello World', createdAt: new Date(), mentionedUsers: [] }];
  private users: User[] = [
    { userID: 1, name: 'Zannain' },
    { userID: 2, name: 'Uswa' },
    { userID: 3, name: 'Bryan' },
    { userID: 4, name: 'Gabbey' },
    { userID: 5, name: 'Gabe' },
  ];
  constructor() { }
  addComment(commentText: string): void {
    const mentionedUsers = this.detectMentionedUsers(commentText)
    const newComment: Comment = {
      id: this.comments.length + 1,
      content: commentText,
      createdAt: new Date(),
      mentionedUsers,
    }
    this.comments.push(newComment);
  }
  getComments(): Comment[] {
    return this.comments
  }
  getUsers(): User[] {
    return this.users;
  }
  private detectMentionedUsers(content: string): User[] {
    const mentionedUsers: User[] = [];
    this.users.forEach(user => {
      if (content.includes(`@${user.name}`)) {
        mentionedUsers.push(user);
      }
    });
    return mentionedUsers;
  }
}
