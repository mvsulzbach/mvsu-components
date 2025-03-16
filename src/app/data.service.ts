import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';

declare var mvsuSettings: any;

export enum Participation {
  No = 0,
  Yes = 1,
  Undefined = 2
}

export function asParticipation(n: number): Participation {
  return Participation[Participation[n] as keyof typeof Participation];
}

export class Member {
  uid: number;
  participation: Participation;
  reason: string;
  register: string;
  display_name: string;
  isOpen: boolean = false;

  constructor(uid: number, participation: Participation, reason: string, register: string, display_name: string) {
    this.uid = uid;
    this.participation = participation;
    this.reason = reason;
    this.register = register;
    this.display_name = display_name;
  }
}

class ParticipationUpdate {
  participation: Participation;
  reason: string;

  constructor(participation: Participation, reason: string) {
    this.participation = participation;
    this.reason = reason;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders().set('X-WP-Nonce', mvsuSettings.nonce);
  }

  get_participation(divid: string): Observable<Participation> {
    return this.httpClient.get<number>(mvsuSettings.root + 'mvsu_participation/v1/query_self?pid=' + divid, {headers: this.getHeaders()})
      .pipe(map(n => asParticipation(n)));
  }

  update_participation(divid: string, participation: Participation, reason: string): Observable<Participation> {
    return this.httpClient.put<number>(
      mvsuSettings.root + 'mvsu_participation/v1/change_participation?pid=' + divid,
      new ParticipationUpdate(participation, reason),
      {headers: this.getHeaders()}
    ).pipe(map(n => asParticipation(n)));
  }

  get_participating_members(divid: string): Observable<Member[]> {
    return this.httpClient.get<Member[]>(mvsuSettings.root + 'mvsu_participation/v1/query_members?pid=' + divid, {headers: this.getHeaders()})
  }
}
