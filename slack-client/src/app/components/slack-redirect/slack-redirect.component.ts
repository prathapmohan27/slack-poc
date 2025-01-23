import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-slack-redirect',
  imports: [CommonModule],
  templateUrl: './slack-redirect.component.html',
  styleUrl: './slack-redirect.component.css',
})
export class SlackRedirectComponent {
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private apiService: ApiService = inject(ApiService);

  constructor() {
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.apiService.getAccessToken(params.code, params.state).subscribe(
        (data: any) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
