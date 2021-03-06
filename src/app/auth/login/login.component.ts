import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initform();
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  private initform() {
    this.loginForm = new FormGroup({
      email: new FormControl( '', [Validators.required, Validators.email]),
      password: new FormControl( '', [Validators.required, Validators.minLength(6)])
    });
  }

}
