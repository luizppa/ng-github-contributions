import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_CELL_SIZE, DEFAULT_LABEL_SIZE, Months } from 'src/app/github-contributions/constants';
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

  public getMonthLabel (week: ContributionInfo[]) {
    return week[0].date.getDate() <= 7 ? Months[week[0].date.getMonth()] : null;
  }

  public get labelSize () {
    if(this.options.labels?.size == null){
      return `${DEFAULT_LABEL_SIZE}px`;
    }
    return `${this.options.labels.size}px`;
  }

  public get labelContainerWidth () {
    const { cellSize = DEFAULT_CELL_SIZE } = this.options;
    return `${cellSize}px`;
  }

  public get labelContainerHeight () {
    if(this.options.labels?.size == null){
      return `${DEFAULT_LABEL_SIZE + 12}px`;
    }
    return `${this.options.labels.size + 12}px`;
  }

  public get showLabel(){
    if(this.options.labels?.showMonth == null){
      return true;
    }
    return this.options.labels.showMonth;
  }

}
