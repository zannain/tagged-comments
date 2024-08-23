import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { User } from '../../models/user.model';
import { CommentFormService } from '../services/comment-form.service';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {
  commentForm: FormGroup;

  constructor(private readonly commentService: CommentService, private readonly commentFormService: CommentFormService) {

    this.commentForm = this.commentFormService.createCommentForm()
  }
  getUsers(): User[] {
    return this.commentService.getUsers();
  }
  addComment() {
    if (this.commentFormService.isFormValid(this.commentForm)) {
      const commentText = this.commentFormService.getCommentText(this.commentForm);
      this.commentService.addComment(commentText);
      this.commentFormService.resetForm(this.commentForm);
    }
  }
}
