import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Comment } from '../../models/comment.model';
import { comments } from '../../data/comments';
import { UserService } from '../../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [...comments];
  constructor(private userService: UserService) {
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
  private detectMentionedUsers(content: string): User[] {
    const mentionedUsers: User[] = [];
    const users = this.userService.getUsers();
    users.forEach(user => {
      if (content.includes(`@${user.name}`)) {
        mentionedUsers.push(user);
      }
    });
    return mentionedUsers;
  }
}
