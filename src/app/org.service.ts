import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {URLSearchParams} from "@angular/http";
import {serialize} from "@angular/compiler/src/i18n/serializers/xml_helper";

const ORG_API = '/api/org';

@Injectable()
export class OrgService {

  constructor(
    private http: HttpClient
  ) { }

  serialize(obj): string {
    let str = [];

    for(let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }

    if (!str.length) return '';
    return `?${str.join('&')}`;
  }

  getOrgs(params?): Observable<any> {
    return this.http.get(`${ORG_API}${this.serialize(params)}`);
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
