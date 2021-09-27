import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked = new EventEmitter();
  isLoggedIn!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  onClicked(): void {
    this.menuClicked.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
