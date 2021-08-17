import { Component, Input, OnInit } from '@angular/core';
import { GithubBoardOptions, ContributionInfo } from 'src/app/github-contributions/types';

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
