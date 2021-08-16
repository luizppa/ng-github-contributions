import { Component, Input, OnInit } from '@angular/core';
import { ContributionInfo, GithubServiceService } from '../../services/github-service.service';

const DEFAULT_NUMBER_OF_WEEKS = 53;

@Component({
  selector: 'app-github-board',
  templateUrl: './github-board.component.html',
  styleUrls: ['./github-board.component.css']
})
export class GithubBoardComponent implements OnInit {
  @Input() weeksNumber: number = DEFAULT_NUMBER_OF_WEEKS;
  @Input() endDate: Date = new Date();
  @Input() profile: string = '';
  @Input() token: string = '';
  public weeks: ContributionInfo[][] = [];

  constructor(private githubService: GithubServiceService) { }

  ngOnInit(): void {
    this.githubService.loadData(this.profile, this.token).then(() => this.loadContributions());
  }

  private loadContributions(){
    this.weeks = [];
    const firstWeekDay = this.endDate.getDay();
    const currentWeek = new Date(this.endDate);
    for(let i = 0; i < this.weeksNumber; i++){
      this.weeks.push(this.buildWeek(currentWeek));
      const dayOffset = i === 0 ? firstWeekDay + 1 : 7;
      currentWeek.setDate(currentWeek.getDate() - dayOffset);
    }
    this.weeks.reverse();
  }

  private buildWeek(date: Date): ContributionInfo[]{
    const weekInfo: ContributionInfo[] = [];
    const currentDate = new Date(date);
    while(true){
      const contribution = this.githubService.getContributions(currentDate);
      weekInfo.push({
        ...contribution,
        date: new Date(currentDate),
      });
      
      if(currentDate.getDay() === 0){
        break;
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return weekInfo.reverse();
  }

}
