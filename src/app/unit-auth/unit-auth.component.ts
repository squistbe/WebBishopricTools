import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../unit.service';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-unit-auth',
  templateUrl: './unit-auth.component.html',
  styleUrls: ['./unit-auth.component.scss']
})
export class UnitAuthComponent implements OnInit {
  showWelcome: boolean = true;
  showCreate: boolean;
  showJoin: boolean;

  createUnitForm: FormGroup;
  name: FormControl;
  unitNumber: FormControl;

  joinUnitForm: FormGroup;

  constructor(
    private router: Router,
    private unitService: UnitService,
    private auth: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    let owner = this.auth.getUserInfo();

    this.name = new FormControl('', Validators.required);
    this.unitNumber = new FormControl('', Validators.required);
    this.createUnitForm = new FormGroup({
      name: this.name,
      unitNumber: this.unitNumber,
      ownerId: new FormControl(owner._id)
    });

    this.joinUnitForm = new FormGroup({
      name: this.name
    });
  }

  createUnit() {
    this.showCreate = true;
    this.showJoin = false;
    this.showWelcome = false;
  }

  joinUnit() {
    this.showCreate = false;
    this.showJoin = true;
    this.showWelcome = false;
  }

  cancel() {
    this.router.navigate(['login']);
  }

  submit(form: FormGroup) {
    this.unitService.createUnit(form.value)
      .subscribe(
        res => {
          this.auth.isLoggedIn = true;
          this.auth.setToken(res.token);
          this.router.navigate(['upload-members']);
        },
        err => {
          if (err && err.error.type === 'unit-exists') {
            this.dialog.open(AlertDialogComponent, {
              data: {
                message: `This unit (${this.unitNumber.value}) already exists. Would you like to join?`,
                title: 'Join Unit',
                action: this.joinUnit.bind(this),
                actionText: 'Yes'
              }
            });
          }
        }
      );
  }
}
