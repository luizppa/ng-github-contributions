import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_CELL_SIZE, DEFAULT_LABEL_SIZE, Months } from '../../../constants';
import { GithubBoardOptions, ContributionInfo } from '../../../types';

@Component({
  selector: 'board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css']
})
export class BoardColumnComponent implements OnInit {
  @Input() week: ContributionInfo[] = [];
  @Input() options: GithubBoardOptions = {};

  constructor() { }

  ngOnInit(): void {

  }

  public getMonthLabel(week: ContributionInfo[]): string {
    return week[0].date.getDate() <= 7 ? Months[week[0].date.getMonth()] : '';
  }

  public get labelSize(): string {
    const size = this.options.labels?.size ?? DEFAULT_LABEL_SIZE;
    return `${size}px`;
  }

  public get labelContainerWidth(): string {
    const size = this.options.cellSize ?? DEFAULT_CELL_SIZE;
    return `${size}px`;
  }

  public get labelContainerHeight(): string {
    const size = this.options.labels?.size ?? DEFAULT_LABEL_SIZE;
    return `${size + 13}px`;
  }

  public get showLabel(): boolean {
    return this.options.labels?.showMonth ?? true;
  }

}
