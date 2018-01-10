import { Component, OnInit } from '@angular/core';
import {UnitService} from "../unit.service";
import {Member} from "../models/member";
import {Observable} from "rxjs";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members: Observable<any>;

  constructor(
    private unitService: UnitService
  ) {
    this.members = unitService.getUnitMembers();
  }

  ngOnInit() {

  }

}
