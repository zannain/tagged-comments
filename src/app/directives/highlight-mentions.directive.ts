import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { User } from '../models/user.model';

@Directive({
  selector: '[highlightMention]',
  standalone: true,
})
export class HighlightMentionsDirective {
  @Input() highlightMention: string = '';
  // TODO: Look into why undefined needs to be added
  @Input() mentionedUsers: User[] | undefined = []
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['highlightMention']) {
      this.highlightMentions();
    }
  }

  private highlightMentions(): void {
    // Parse the input string and replace mentions with bold tags
    const mentionRegex = /(@\w+)/g;
    // Replace each mention with a bold tag if the user is mentioned
    const parsedText = this.highlightMention.replace(mentionRegex, (match) => {
      // Extract the username without the @ symbol
      const username = match.substring(1);
      let isMentioned = false;
      // Check if this username is in the mentionedUsers array
      if (this.mentionedUsers) {
        // NOTE: Would be better to match on ID in case two users have the same name
        isMentioned = this.mentionedUsers.some(user => user.name === username);
      }

      // If mentioned, return the bolded version, else return the original match
      return isMentioned ? `<b>${match}</b>` : match;
    });
    // Set the HTML content of the element
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', parsedText);
  }
}
