import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router) {}

  onAmazonClick(evt: MouseEvent) {
    evt.preventDefault();            // stop the browser going to amazon.com
    this.router.navigate(['/404']);  // navigate to “/404” → your wildcard shows NotFoundComponent
  }
}
