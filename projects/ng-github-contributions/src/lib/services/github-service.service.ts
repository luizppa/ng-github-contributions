import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ContributionInfo,
  Contributions,
  ContributionsResponse,
  DayContributionInfo,
  UserContributions,
  WeekContributionInfo
} from '../types';
import { ColorIntensity } from '../enums';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {

  constructor(private http: HttpClient) { }

  public async loadData(profile: string): Promise<Contributions>{
    if (!profile){
      return Promise.reject({what: 'Undefined profile', internal: true});
    }
    return this.http.post(environment.githubDataEndpoint, { profile })
    .toPromise()
    .then((res) => {
      const userContributions = (res as ContributionsResponse).user;
      const contributions = this.countEvents(userContributions);
      return contributions;
    });
  }

  private countEvents(userContributions: UserContributions): Contributions {
    const calendar  = userContributions.contributionsCollection.contributionCalendar;
    const contributions: Contributions = {};

    calendar.weeks.forEach((week: WeekContributionInfo) => {
      week.contributionDays.forEach((day: DayContributionInfo) => {
        contributions[day.date] = {
          date: new Date(day.date),
          contributionsCount: day.contributionCount,
          colorIntensity: calendar.colors.indexOf(day.color) as ColorIntensity,
        };
      });
    });

    return contributions;
  }

  public getContributions(contributions: Contributions, date: Date): ContributionInfo {
    const key = `${date.getFullYear()}-${this.expand(date.getMonth() + 1)}-${this.expand(date.getDate())}`;
    return {
      ...contributions[key],
      date: new Date(date),
    };
  }

  private expand(n: number): string{
    if (n < 10){
      return `0${n}`;
    }

    return n.toString();
  }
}
