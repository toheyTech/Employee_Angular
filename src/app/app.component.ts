
import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './model/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tab = "";
  opened = true;
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }
  public toggleSidebar() {
    this.opened = !this.opened;
  }
  logout() {
    this.accountService.logout();
  }
}