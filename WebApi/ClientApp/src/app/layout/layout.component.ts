import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [AuthService]
})
export class LayoutComponent {
  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout();
  }
}
