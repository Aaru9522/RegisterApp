import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: false,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {
  showLink = false;
  ngOnInit() {
    setTimeout(() => this.showLink = true, 500);
  }
}