import { Component, resource, Resource } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from './service/api.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private apiService: ApiService = new ApiService();

  getLoginUrl() {
    this.apiService.getLoginUrl().subscribe(
      (data: any) => {
        window.location = data.url;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  title = 'slack-poc';
}
