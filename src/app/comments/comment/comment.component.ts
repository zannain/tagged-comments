import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment: Comment | null = null;
  // NOTE: Since there is no auth every comment is made by the System user
  loggedInUser: string = "Baby Yoda"
}
