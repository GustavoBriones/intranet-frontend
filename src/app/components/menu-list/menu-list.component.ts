import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  //LISTADO SUBMENUS
  showMantenedores: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeMenu(){
    this.menuToggle.emit();
  }
}
