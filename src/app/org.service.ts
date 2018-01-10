import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const ORG_API = '/api/org';

@Injectable()
export class OrgService {

  constructor(
    private http: HttpClient
  ) { }

  getOrgs(): Observable<any> {
    return this.http.get(ORG_API);
  }

  getOrgCallings(): Observable<any> {
    return this.http.get(`${ORG_API}/callings`);
  }

  getCallingStatuses(): Observable<any> {
    return this.http.get(`${ORG_API}/calling/statuses`);
  }

  addOrgCalling(orgId, params): Observable<any> {
    return this.http.post(`${ORG_API}/${orgId}/calling`, params);
  }

  updateOrgCalling(orgId, callingId, params?): Observable<any> {
    return this.http.put(`${ORG_API}/${orgId}/calling/${callingId}`, params);
  }

  removeMemberFromCalling(orgId, callingId, memberId) {
    return this.http.delete(`${ORG_API}/${orgId}/calling/${callingId}/member/${memberId}`);
  }
}
