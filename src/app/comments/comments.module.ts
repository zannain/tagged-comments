import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentsComponent } from './comments.component';
import { CommentService } from './services/comment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultMentionHighlighter, HighlightMentionsDirective } from '../directives/highlight-mentions.directive';
import { MentionDirective } from '../directives/mention.directive';
import { CommentFormService } from './services/comment-form.service';



@NgModule({
  declarations: [CommentFormComponent, CommentsComponent, CommentComponent, CommentsListComponent],
  providers: [CommentService, CommentFormService, { provide: 'MentionHighlighter', useClass: DefaultMentionHighlighter }],
  imports: [
    MentionDirective,
    HighlightMentionsDirective,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CommentFormComponent, CommentsComponent, CommentComponent, CommentsListComponent]
})
export class CommentsModule { }
