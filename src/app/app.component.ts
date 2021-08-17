import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Themes } from './github-contributions/constants';
import { GithubBoardOptions } from './github-contributions/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Github Contributions';
  token = environment.token;

  boardOptions1: GithubBoardOptions = {
    colorPalette: Themes.purple,
  };

  boardOptions2: GithubBoardOptions = {
    weeksNumber: 26,
  };

  boardOptions3: GithubBoardOptions = {
    cellSize: 18,
    labels: {
      showMonth: false,
    }
  }
}
