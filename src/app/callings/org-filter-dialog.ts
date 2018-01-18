import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {OrgService} from "../org.service";
import {Org} from "../models/org";
import {CallingStatus, CallingFilters} from "../models/calling";
import * as _ from 'lodash';

@Component({
  selector: 'org-filter-dialog',
  templateUrl: 'org-filter-dialog.html',
  styleUrls: ['org-filter-dialog.scss']
})
export class OrgFilterDialog {
  orgs: Org[];
  statuses: CallingStatus[];

  constructor(
    public dialogRef: MatDialogRef<OrgFilterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orgService: OrgService
  ) {
    orgService.getOrgs({simple: true})
      .subscribe(
        res => this.orgs = res,
        err => console.log(err)
      );
    orgService.getCallingStatuses()
      .subscribe(
        res => this.statuses = res,
        err => console.log(err)
      );
  }

  isChecked(id, type) {
    if (type === 'orgs') {
      return this.data.filters.filterByOrg.indexOf(id) !== -1;
    }
    if (type === 'statuses') {
      return this.data.filters.filterByStatus.indexOf(id) !== -1;
    }
  }

  filterChanged(event, item, type) {
    let filters: CallingFilters = this.data.filters;

    if (type === 'orgs') {
      let orgFilters = filters.filterByOrg,
          orgIndex = orgFilters.indexOf(item.id);

      if (event.checked && orgIndex === -1) {
         orgFilters.push(item.id);
      }
      if (!event.checked && orgIndex !== -1) {
        orgFilters.splice(orgIndex, 1);
      }
    }

    if (type === 'statuses') {
      let statusFilters = filters.filterByStatus,
          statusIndex = statusFilters.indexOf(item._id);

      if (event.checked && statusIndex === -1) {
        statusFilters.push(item._id);
      }
      if (!event.checked && statusIndex !== -1) {
        statusFilters.splice(statusIndex, 1);
      }
    }
  }

  clearFilters() {
    this.data.filters.filterByOrg = [];
    this.data.filters.filterByStatus = [];
    this.data.filters.vacantCalling = false;
  }
}
