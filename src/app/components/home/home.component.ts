import { Component, OnInit } from '@angular/core';
import { GithubBoardOptions, Themes } from 'src/app/github-contributions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Angular Github Contributions';
  token = environment.token;

  boardOptions1: GithubBoardOptions = {
    colorPalette: Themes.orange,
  };

  boardOptions2: GithubBoardOptions = {
    weeksNumber: 26,
  };

  boardOptions3: GithubBoardOptions = {
    cellSize: 13,
    labels: {
      size: 12,
    }
  }

  boardOptions4: GithubBoardOptions = {
    labels: {
      showMonth: false,
      showDay: false,
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
