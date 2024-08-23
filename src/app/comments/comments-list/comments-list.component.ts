import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'comments-list',
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.css'
})
export class CommentsListComponent implements OnInit {
  comments: Comment[] = []
  constructor(private readonly commentService: CommentService) {

  }
  ngOnInit(): void {
    this.comments = this.commentService.getComments()
  }
}
