import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

export class AuthService {
  private user: User;
  public authChange = new Subject<boolean>();
  registerUser(authdata: AuthData){
    this.user = {
      email: authdata.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
  }

  login(authdata: AuthData) {
    this.user = {
      email: authdata.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
