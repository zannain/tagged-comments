import { Directive, ElementRef, Inject, Input, Renderer2, SimpleChanges } from '@angular/core';
import { User } from '../models/user.model';

interface MentionHighlighter {
  highlight(text: string, users: User[]): string;
}

export class DefaultMentionHighlighter implements MentionHighlighter {
  highlight(text: string, users: User[]): string {
    const mentionRegex = /(@\w+)/g;
    return text.replace(mentionRegex, (match) => {
      const username = match.substring(1);
      const isMentioned = users.some(user => user.name === username);
      return isMentioned ? `<b class="highlight">${match}</b>` : match;
    });
  }
}
@Directive({
  selector: '[highlightMention]',
  standalone: true,
})
export class HighlightMentionsDirective {
  @Input() highlightMention: string = '';
  // TODO: Look into why undefined needs to be added
  @Input() mentionedUsers: User[] | undefined = []
  constructor(private el: ElementRef, private renderer: Renderer2, @Inject('MentionHighlighter') private highlighter: MentionHighlighter) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['highlightMention'] || changes['mentionedUsers']) {
      this.updateHighlights();
    }
  }

  private updateHighlights(): void {
    if (this.mentionedUsers) {

      const highlightedText = this.highlighter.highlight(this.highlightMention, this.mentionedUsers);
      this.el.nativeElement.innerHTML = highlightedText;
    }
  }

}
