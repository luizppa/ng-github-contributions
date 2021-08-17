import { Component, Input, OnInit } from '@angular/core';
import { ContributionInfo, Contributions, GithubServiceService } from '../../services/github-service.service';

const DEFAULT_NUMBER_OF_WEEKS = 53;

export interface GithubBoardColorPalette {
  none: string;
  low: string;
  medium: string;
  high: string;
  higher: string;
}

export interface GithubBoardOptions {
  weeksNumber?: number;
  colorPalette?: GithubBoardColorPalette;
  cellSize?: number;
}

@Component({
  selector: 'app-github-board',
  templateUrl: './github-board.component.html',
  styleUrls: ['./github-board.component.css']
})
export class GithubBoardComponent implements OnInit {
  @Input() endDate: Date = new Date();
  @Input() profile: string = '';
  @Input() token: string = '';
  @Input() options: GithubBoardOptions = {};
  @Input() onCellClick?: (info: ContributionInfo) => void;
  public weeks: ContributionInfo[][] = [];

  constructor(private githubService: GithubServiceService) { }

  ngOnInit(): void {
    this.githubService.loadData(this.profile, this.token).then((contributions) => this.loadContributions(contributions));
  }

  private loadContributions(contributions: Contributions){
    this.weeks = [];
    const { weeksNumber = DEFAULT_NUMBER_OF_WEEKS } = this.options;
    const firstWeekDay = this.endDate.getDay();
    const currentWeek = new Date(this.endDate);

    for(let i = 0; i < weeksNumber; i++){
      this.weeks.push(this.buildWeek(contributions, currentWeek));
      const dayOffset = i === 0 ? firstWeekDay + 1 : 7;
      currentWeek.setDate(currentWeek.getDate() - dayOffset);
    }
    this.weeks.reverse();
  }

  private buildWeek(contributions: Contributions, date: Date): ContributionInfo[]{
    const weekInfo: ContributionInfo[] = [];
    const currentDate = new Date(date);
    while(weekInfo.length <= date.getDay()){
      const contribution = this.githubService.getContributions(contributions, currentDate);
      weekInfo.push({
        ...contribution,
        date: new Date(currentDate),
      });

      currentDate.setDate(currentDate.getDate() - 1);
    }
    return weekInfo.reverse();
  }

}
