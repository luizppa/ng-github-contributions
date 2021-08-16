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
  startDate: Date | null = null;
  public weeks: ContributionInfo[][] = [];

  constructor(private githubService: GithubServiceService) { }

  ngOnInit(): void {
    if(!this.startDate){
      this.startDate = new Date(this.endDate);
      this.startDate.setDate(this.startDate.getDate() - (this.endDate.getDay() + 1 * this.weeksNumber * 7))
    }
    this.githubService.loadData('luizppa', this.startDate, () => this.loadContributions());
  }

  private loadContributions(){
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
      weekInfo.push({
        date: new Date(currentDate),
        contributions: this.githubService.getContributions(currentDate),
      });
      
      if(currentDate.getDay() === 0){
        break;
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return weekInfo.reverse();
  }

}
