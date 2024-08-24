import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Comment } from '../../models/comment.model';
import { users } from '../../data/users';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [{ id: 0, content: 'Hello World', createdAt: new Date(), mentionedUsers: [] }];
  private users: User[] = [];
  constructor() {
    this.users = users
  }
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
