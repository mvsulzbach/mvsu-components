import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var mvsuSettings: any;

export enum Participation {
  No = 0,
  Yes = 1,
  Undefined = 2
};

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
    return this.httpClient.get<Participation>(mvsuSettings.root + 'mvsu_participation/v1/query_self?pid=' + divid, {headers: this.getHeaders()})
  }

  update_participation(divid: string, participation: Participation, reason: string): Observable<Participation> {
    return this.httpClient.put<Participation>(
      mvsuSettings.root + 'mvsu_participation/v1/change_participation?pid=' + divid,
      new ParticipationUpdate(participation, reason),
      {headers: this.getHeaders()}
    );
  }
}
