import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_CELL_SIZE, DEFAULT_LABEL_SIZE, DEFAULT_NUMBER_OF_WEEKS } from '../../constants';
import { GithubServiceService } from '../../services/github-service.service';
import { GithubBoardOptions, ContributionInfo, Contributions,  } from '../../types';

@Component({
  selector: 'app-github-board',
  templateUrl: './github-board.component.html',
  styleUrls: ['./github-board.component.css']
})
export class GithubBoardComponent implements OnInit {
  @Input() profile: string = '';
  @Input() token: string = '';
  @Input() options: GithubBoardOptions = {};
  @Input() onCellClick?: (info: ContributionInfo) => void;
  private endDate: Date = new Date();
  public loading: boolean = true;
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
    this.loading = false;
  }

  private buildWeek(contributions: Contributions, date: Date): ContributionInfo[]{
    const weekInfo: ContributionInfo[] = [];
    const currentDate = new Date(date);
    while(weekInfo.length <= date.getDay()){
      const contribution = this.githubService.getContributions(contributions, currentDate);
      weekInfo.push(contribution);

      currentDate.setDate(currentDate.getDate() - 1);
    }
    return weekInfo.reverse();
  }

  public get labelSize () {
    if(this.options.labels?.size == null){
      return `${DEFAULT_LABEL_SIZE}px`;
    }
    return `${this.options.labels.size}px`;
  }

  public get labelContainerHeight () {
    const { cellSize = DEFAULT_CELL_SIZE } = this.options;
    return `${(cellSize * 2) + 6}px`;
  }

  public get showLabels () {
    if(this.options.labels?.showDay == null){
      return true;
    }
    return this.options.labels.showDay;
  }

  public get minHeight () {
    const {
      cellSize = DEFAULT_CELL_SIZE,
    } = this.options;
    let labelSize = DEFAULT_LABEL_SIZE;
    if(this.options.labels?.size != null){
      labelSize = this.options.labels.size;
    }
    return `${((cellSize + 6) * 7) + labelSize}px`;
  }

}
