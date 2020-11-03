import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  opened = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  public onNewProjectClick() {
    this.router.navigate(['/employee/project']);
    console.log("Project Clicked");
  }
}
