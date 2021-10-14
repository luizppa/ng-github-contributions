import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_CELL_SIZE, DEFAULT_LABEL_SIZE, DEFAULT_NUMBER_OF_WEEKS } from '../../constants';
import { GithubServiceService } from '../../services/github-service.service';
import { GithubBoardOptions, ContributionInfo, Contributions,  } from '../../types';

@Component({
  selector: 'github-board',
  templateUrl: './github-board.component.html',
  styleUrls: ['./github-board.component.css']
})
export class GithubBoardComponent implements OnInit {
  @Input() profile = '';
  @Input() options: GithubBoardOptions = {};
  @Input() onCellClick?: (info: ContributionInfo) => void;
  private endDate: Date = new Date();
  public loading = true;
  public weeks: ContributionInfo[][] = [];

  constructor(private githubService: GithubServiceService) { }

  ngOnInit(): void {
    this.githubService.loadData(this.profile).then((contributions) => this.loadContributions(contributions));
  }

  private loadContributions(contributions: Contributions): void {
    this.weeks = [];
    const { weeksNumber = DEFAULT_NUMBER_OF_WEEKS } = this.options;
    const firstWeekDay = this.endDate.getDay();
    const currentWeek = new Date(this.endDate);

    for (let i = 0; i < weeksNumber; i++){
      this.weeks.push(this.buildWeek(contributions, currentWeek));
      const dayOffset = i === 0 ? firstWeekDay + 1 : 7;
      currentWeek.setDate(currentWeek.getDate() - dayOffset);
    }
    this.weeks.reverse();
    this.loading = false;
  }

  private buildWeek(contributions: Contributions, date: Date): ContributionInfo[] {
    const weekInfo: ContributionInfo[] = [];
    const currentDate = new Date(date);
    while (weekInfo.length <= date.getDay()){
      const contribution = this.githubService.getContributions(contributions, currentDate);
      weekInfo.push(contribution);

      currentDate.setDate(currentDate.getDate() - 1);
    }
    return weekInfo.reverse();
  }

  public get labelSize(): string {
    const size = this.options.labels?.size ?? DEFAULT_LABEL_SIZE;
    return `${size}px`;
  }

  public get labelContainerHeight(): string {
    const { cellSize = DEFAULT_CELL_SIZE } = this.options;
    return `${(cellSize * 2) + 6}px`;
  }

  public get showLabels(): boolean {
    return this.options.labels?.showDay ?? true;
  }

  public get showLegend(): boolean {
    return this.options.showLegend ?? true;
  }

  public get minHeight(): string {
    const cellSize = this.options.cellSize ?? DEFAULT_CELL_SIZE;
    const labelSize = this.options.labels?.size ?? DEFAULT_LABEL_SIZE;
    const legendSize = 8 + Math.max(12, cellSize);

    return `${((cellSize + 6) * 7) + labelSize + legendSize}px`;
  }

}
