import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @Input() isOpen: boolean = false;
  @Output() increaseMenuClicked = new EventEmitter<void>();
  @Output() decreaseMenuClicked = new EventEmitter<void>();

  increaseMenu(){
    this.increaseMenuClicked.emit();
  }

  decreaseMenu(){
    this.decreaseMenuClicked.emit();
  }
}
