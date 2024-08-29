import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mention-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mention-dropdown.component.html',
  styleUrl: './mention-dropdown.component.css'
})
export class MentionDropdownComponent {
  @Input() data: { [key: string]: string }[] = []

  @Input() set query(value: string) {
    this.filteredData = this.data.filter(item => item['name'].toLowerCase().startsWith(value.toLowerCase()))
    this.activeIndex = 0;
  }
  @Output() userSelected = new EventEmitter<string>();
  @Output() closeDropdown = new EventEmitter();
  filteredData: { [key: string]: string }[] = []
  activeIndex = -1;
  selectUser(userName: string): void {
    this.userSelected.emit(userName);
  }
  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }
}
