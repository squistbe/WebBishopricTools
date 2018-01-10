import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

const UNIT_API = '/api/unit';

@Injectable()
export class UnitService {

  constructor(
    private http: HttpClient
  ) { }

  createUnit(details): Observable<any> {
    return this.http.post(UNIT_API, details);
  }

  getUnitMembers() {
    return this.http.get(`${UNIT_API}/members`);
  }
}
