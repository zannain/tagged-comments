import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentsModule } from './comments/comments.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tagged-comments';
}
