import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);

  getLoginUrl() {
    return this.httpClient.get('http://localhost:3000/slack/install');
  }

  getAccessToken(code: string, state: string) {
    return this.httpClient.get(
      `http://localhost:3000/slack/callback?code=${code}&state=${state}`
    );
  }
}
