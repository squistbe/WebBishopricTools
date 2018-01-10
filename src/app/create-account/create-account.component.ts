import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.name = new FormControl();
    this.email = new FormControl();
    this.password = new FormControl();
    this.confirmPassword = new FormControl();

    this.createAccountForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  ngOnInit() {
  }

  create() {
    this.auth.createAccount(this.createAccountForm.value).subscribe(
      res => {
        this.auth.setToken(res.token);
        this.router.navigate(['unit-auth']);
      },
      err => console.log(err)
    );
  }

  cancel() {
    this.router.navigate(['login']);
  }
}
