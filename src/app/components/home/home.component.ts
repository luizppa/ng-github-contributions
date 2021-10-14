import { Component, OnInit } from '@angular/core';
import { GithubBoardOptions, Themes } from '../../../../projects/ng-github-contributions/src/public-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title = 'Angular Github Contributions';

  public boardOptions1: GithubBoardOptions = {
    colorPalette: Themes.orange,
  };

  public boardOptions2: GithubBoardOptions = {
    weeksNumber: 26,
  };

  public boardOptions3: GithubBoardOptions = {
    cellSize: 13,
    labels: {
      size: 12,
    },
  };

  public boardOptions4: GithubBoardOptions = {
    labels: {
      showMonth: false,
      showDay: false,
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

  public get themes(): typeof Themes {
    return Themes;
  }

}
