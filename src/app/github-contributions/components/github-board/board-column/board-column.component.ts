import { Component, Input, OnInit } from '@angular/core';
import { Themes } from 'src/app/github-contributions/constants';
import { ContributionInfo } from 'src/app/github-contributions/services/github-service.service';
import { GithubBoardColorPalette, GithubBoardOptions } from '../github-board.component';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css']
})
export class BoardColumnComponent implements OnInit {
  @Input() week: ContributionInfo[] = [];
  @Input() options: GithubBoardOptions = {};

  constructor() { }

  ngOnInit(): void {
    
  }

}
