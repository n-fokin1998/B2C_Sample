import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService, private authService: AuthService) { }

  public data: string;

  ngOnInit() {
    this.homeService.getData().subscribe(data => { this.data = data; });
  }

  public logout() {
    this.authService.logout();
  }
}