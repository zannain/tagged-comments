import { Directive, ElementRef, EventEmitter, Input, Output, ViewContainerRef, Renderer2, ComponentFactoryResolver, ComponentRef, HostListener } from '@angular/core';
import { MentionDropdownComponent } from '../util/mention-dropdown/mention-dropdown.component';

@Directive({
  selector: '[mentionDropdown]',
  standalone: true
})
export class MentionDirective {
  @Input() items: any[] = []
  @Output() selectItem: EventEmitter<{ [key: string]: string }> = new EventEmitter();

  private dropdownList: ComponentRef<MentionDropdownComponent> | null = null;
  constructor(private ele: ElementRef<HTMLTextAreaElement>, private readonly viewContainerRef: ViewContainerRef, private renderer: Renderer2, private componentFactoryResolver: ComponentFactoryResolver) {
  }
  @HostListener('input', ['$event']) onInput(event: KeyboardEvent): void {
    const textarea = this.ele.nativeElement as HTMLTextAreaElement;
    const cursorPosition = textarea.selectionStart;
    const text = textarea.value.substring(0, cursorPosition);

    const mentionIndex = text.lastIndexOf('@');
    if (mentionIndex > -1) {
      const query = text.substring(mentionIndex + 1);
      if (query.length >= 0) {
        this.showDropdown(query, mentionIndex);
      } else {
        this.hideDropdown();
      }
    } else {
      this.hideDropdown();
    }
  }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent): void {
    if (this.dropdownList) {
      const dropdownInstance = this.dropdownList.instance;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        dropdownInstance.activeIndex = (dropdownInstance.activeIndex + 1) % dropdownInstance.filteredData.length;
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        dropdownInstance.activeIndex = (dropdownInstance.activeIndex - 1 + dropdownInstance.filteredData.length) % dropdownInstance.filteredData.length;
      } else if (event.key === 'Enter' && dropdownInstance.activeIndex >= 0) {
        event.preventDefault();
        this.selectUser(dropdownInstance.filteredData[dropdownInstance.activeIndex]['name']);
      } else if (event.key === 'Escape') {
        this.hideDropdown();
      }
    }
  }
  @HostListener('document:click', ['$event']) onClickOutside(event: MouseEvent): void {
    if (this.dropdownList) {
      this.hideDropdown();
    }
  }
  private selectUser(userName: string): void {
    const textarea = this.ele.nativeElement as HTMLTextAreaElement;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const mentionIndex = textBeforeCursor.lastIndexOf('@');
    const textAfterCursor = textarea.value.substring(cursorPosition);

    textarea.value = textBeforeCursor.substring(0, mentionIndex + 1) + userName + textAfterCursor;
    this.renderer.selectRootElement(textarea).focus();
    textarea.setSelectionRange(mentionIndex + userName.length + 1, mentionIndex + userName.length + 1);

    this.hideDropdown();
  }
  private showDropdown(query: string, mentionIndex: number): void {
    if (this.dropdownList === null) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(MentionDropdownComponent);
      this.dropdownList = this.viewContainerRef.createComponent(factory)
      this.dropdownList.instance.data = this.items;
      this.dropdownList.instance.userSelected.subscribe((userName: string) => {
        this.selectUser(userName);
      });
      this.renderer.appendChild(document.body, this.dropdownList.location.nativeElement);
    }
    this.dropdownList.instance.query = query;
    this.updateDropdownPosition(mentionIndex)
  }


  private updateDropdownPosition(mentionIndex: number): void {
    const textarea = this.ele.nativeElement as HTMLTextAreaElement;
    const rect = textarea.getBoundingClientRect();
    const lineHeight = 20;

    const start = textarea.value.substr(0, mentionIndex);
    const lines = start.split('\n');
    const offsetX = lines[lines.length - 1].length * 5;
    const offsetY = (lines.length - 1) * lineHeight;

    this.renderer.setStyle(this.dropdownList!.location.nativeElement, 'top', `${rect.top + offsetY + lineHeight + window.scrollY}px`);
    this.renderer.setStyle(this.dropdownList!.location.nativeElement, 'left', `${rect.left + offsetX + window.scrollX}px`);
  }


  private hideDropdown(): void {
    if (this.dropdownList) {
      this.viewContainerRef.clear();
      this.dropdownList = null;
    }
  }
}
