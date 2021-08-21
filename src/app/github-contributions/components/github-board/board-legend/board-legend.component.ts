import { Component, Input, OnInit } from '@angular/core';
import { GithubBoardOptions } from 'src/app/github-contributions/types';

@Component({
  selector: 'board-legend',
  templateUrl: './board-legend.component.html',
  styleUrls: ['./board-legend.component.css']
})
export class BoardLegendComponent implements OnInit {
  @Input() options: GithubBoardOptions = {}

  constructor() { }

  ngOnInit(): void {
  }

}
