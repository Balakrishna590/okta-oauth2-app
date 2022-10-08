import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userName: string = '';

  constructor(private router: Router, 
              @Inject(OKTA_AUTH) public oktaAuth: OktaAuth, 
              public authService: OktaAuthStateService) {
  }

  async ngOnInit() {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name as string;
    }
  }

  async signInWithRedirect() : Promise<void> {
    await this.oktaAuth.signInWithRedirect().then(
      _ => this.router.navigate(['/profile'])
    );
  }

  async signOut() : Promise<void> {
    await this.oktaAuth.signOut();
  }
  
}
