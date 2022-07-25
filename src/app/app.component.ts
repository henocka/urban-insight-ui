import {Component, OnInit} from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // @ts-ignore
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService) {
  }

  async ngOnInit(): Promise<void>{
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async logout(): Promise<void>{
    await this.oktaAuth.logout();
  }

}
