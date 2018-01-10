import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.email = new FormControl();
    this.password = new FormControl();

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => {
        this.auth.isLoggedIn = true;
        this.auth.setToken(res.token);
        this.router.navigate(['home']);
      },
      err => console.log(err)
    )
  }

  createAccount() {
    this.router.navigate(['register']);
  }
}
