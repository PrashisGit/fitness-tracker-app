import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  private user: User;
  public authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authdata: AuthData){
    this.authSuccessFully(authdata);
    this.router.navigate(['/login']);
  }

  login(authdata: AuthData) {
    this.authSuccessFully(authdata);
    this.router.navigate(['/training']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessFully(authdata: AuthData) {
    this.user = {
      email: authdata.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
  }
}
