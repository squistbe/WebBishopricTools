import {Component, OnInit, Inject} from '@angular/core';
import { OrgService } from '../org.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Observable} from "rxjs";
import {UnitService} from "../unit.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Org} from "../models/org";
import {OrgFilterDialog} from "./org-filter-dialog";

@Component({
  selector: 'app-callings',
  templateUrl: './callings.component.html',
  styleUrls: ['./callings.component.scss']
})
export class CallingsComponent implements OnInit {
  orgs: Org[];
  members: Observable<any>;
  callingStatus: any;
  filterParams = {
    filterByOrg: [],
    filterByStatus: [],
    vacantCalling: false,
    simple: false
  };

  constructor(
    private orgService: OrgService,
    private unitService: UnitService,
    private route: Router,
    public dialog: MatDialog
  ) {
    this.members = unitService.getUnitMembers();
    orgService.getOrgs()
      .subscribe(
        res => this.orgs = res,
        err => console.log(err)
      );
    orgService.getCallingStatuses()
      .subscribe(
        res => this.callingStatus = res
      );
  }

  ngOnInit() {

  }

  showFilterDialog(type) {
    let dialogRef = this.dialog.open(OrgFilterDialog, {
      width: '550px',
      height: '575px',
      data: {
        filters: this.filterParams
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.orgService.getOrgs(this.filterParams)
        .subscribe(
          res => this.orgs = res
        )
    });

  }

  addOrgCalling(org) {
    let dialogRef = this.dialog.open(AddCallingDialog, {
      width: '500px',
      data: {
        org: org,
        members: this.members,
        statuses: this.callingStatus
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orgService.addOrgCalling(org._id, result)
          .subscribe(
            res => {
              org.callings.push(res);
            },
            err => console.log(err)
          );
      }
    });

  }

  removeMember(calling, org) {
    this.orgService.removeMemberFromCalling(org._id, calling._id, calling.member._id)
      .subscribe(
        res => {
          delete calling.status;
          delete calling.member;
        },
        err => console.log(err)
      )
  }

  statusSelect(calling, org, statusId) {
    this.orgService.updateOrgCalling(org._id, calling._id, {statusId: statusId})
      .subscribe(
        res => {
          calling.status = res.status;
        },
        err => console.log(err)
      );
  }

  openFindMember(calling, org) {
    let dialogRef = this.dialog.open(FindMemberDialog, {
      width: '500px',
      data: {
        members: this.members,
        calling: calling
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result._id) return;

      calling.loading = true;
      this.orgService.updateOrgCalling(org._id, calling._id, {memberId: result._id})
        .subscribe(
          res => {
            calling.member = res.member;
            delete calling.loading;
          },
          err => console.log(err)
        )
    });
  }
}

@Component({
  selector: 'find-member-dialog',
  templateUrl: 'find-member-dialog.html',
})
export class FindMemberDialog {
  search: FormControl;

  constructor(
    public dialogRef: MatDialogRef<FindMemberDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.search = new FormControl();
  }

  displayFn(member) {
    return member ? member.name : member;
  }

  onKey(event) {
    if (event.keyCode === 13) {
      this.dialogRef.close(this.search.value);
    }
  }
}

@Component({
  selector: 'add-calling-dialog',
  templateUrl: 'add-calling-dialog.html',
  styleUrls: ['add-calling-dialog.scss']
})
export class AddCallingDialog {
  addCallingForm: FormGroup;
  name: FormControl;
  className: FormControl;
  member: FormControl;
  status: FormControl;

  constructor(
    public dialogRef: MatDialogRef<AddCallingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.name = new FormControl();
    this.className = new FormControl();
    this.member = new FormControl();
    this.status = new FormControl();

    this.addCallingForm = new FormGroup({
      name: this.name,
      className: this.className,
      member: this.member,
      status: this.status
    });
  }

  displayFn(member) {
    return member ? member.name : member;
  }
}
