import { Directive, ElementRef, EventEmitter, Input, Output, ViewContainerRef, Renderer2, ComponentFactoryResolver, ComponentRef, HostListener } from '@angular/core';
import { MentionDropdownComponent } from '../util/mention-dropdown/mention-dropdown.component';

@Directive({
  selector: '[mentionDropdown]',
  standalone: true
})
export class MentionDirective {
  @Input() items: any[] = []
  @Output() selectItem: EventEmitter<{ [key: string]: string }> = new EventEmitter();
  private mentionStart: number = -1;
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
      this.mentionStart = mentionIndex;
      if (query.length >= 0) {
        this.showDropdown(query);
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
  private showDropdown(query: string): void {
    if (this.dropdownList === null) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(MentionDropdownComponent);
      this.dropdownList = this.viewContainerRef.createComponent(factory);
      this.dropdownList.instance.data = this.items;
      this.dropdownList.instance.userSelected.subscribe((userName: string) => {
        this.selectUser(userName);
      });
      this.renderer.appendChild(document.body, this.dropdownList.location.nativeElement);
    }
    this.dropdownList.instance.query = query;
    this.updateDropdownPosition();
  }
  private calculateTextAreaPosition(element: HTMLTextAreaElement, position: number): { top: number; left: number } {
    const div = document.createElement('div');
    const styles = window.getComputedStyle(element);
    const properties = [
      'direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY',
      'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle',
      'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
      'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust',
      'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration',
      'letterSpacing', 'wordSpacing', 'tabSize'
    ];

    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'pre-wrap';

    properties.forEach(prop => {
      (div.style as any)[prop] = styles.getPropertyValue(prop);
    });

    div.textContent = element.value.substring(0, position);
    const span = document.createElement('span');
    span.textContent = element.value.substring(position) || '.';
    div.appendChild(span);

    document.body.appendChild(div);
    const coordinates = {
      top: span.offsetTop + parseInt(styles.borderTopWidth) + parseInt(styles.paddingTop),
      left: span.offsetLeft + parseInt(styles.borderLeftWidth) + parseInt(styles.paddingLeft),
    };
    document.body.removeChild(div);

    return coordinates;
  }
  private updateDropdownPosition(): void {
    if (!this.dropdownList) return;

    const textarea = this.ele.nativeElement;
    const caretCoordinates = this.calculateTextAreaPosition(textarea, this.mentionStart);
    const rect = textarea.getBoundingClientRect();
    const verticalOffset = 20;
    const top = rect.top + window.pageYOffset + caretCoordinates.top + verticalOffset;
    const left = rect.left + window.pageXOffset + caretCoordinates.left;

    this.renderer.setStyle(this.dropdownList.location.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.dropdownList.location.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(this.dropdownList.location.nativeElement, 'left', `${left}px`);
  }
  private hideDropdown(): void {
    if (this.dropdownList) {
      this.viewContainerRef.clear();
      this.dropdownList = null;
    }
  }
}
