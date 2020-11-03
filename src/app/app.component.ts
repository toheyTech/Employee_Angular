import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tab = "";
  opened = true;
  constructor() {
  }
  public toggleSidebar() {
    this.opened = !this.opened;
  }
}