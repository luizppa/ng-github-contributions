import { Injectable } from '@angular/core';
import { graphql } from "@octokit/graphql";
import { HttpClient } from '@angular/common/http';
import { ContributionsResponse, DayContributionInfo, GithubEventType, UserContributions, WeekContributionInfo } from '../models/event-response.model';

export enum ColorIntensity{
  NONE=-1,
  LOW=0,
  MEDIUM=1,
  HIGH=2,
  HIGHER=3,
}

export interface Contributions {
  [key: string]: ContributionInfo;
}

export interface ContributionInfo {
  date: Date;
  contributionsCount: number;
  colorIntensity: ColorIntensity;
}

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {

  constructor(private http: HttpClient) { }

  public async loadData(profile: string, token: string): Promise<Contributions>{
    // const graphqlQuery = `
    //   query ($profile: String!) {
    //     user(login: $profile) {
    //       contributionsCollection {
    //         contributionCalendar {
    //           colors
    //           totalContributions
    //           weeks {
    //             contributionDays {
    //               contributionCount
    //               date
    //               color
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // `
    // return graphql(graphqlQuery, {
    //   profile,
    //   headers: {
    //     authorization: `token ${token}`,
    //   },
    // }).then((res) => {
    //   const userContributions = (res as ContributionsResponse).user;
    //   const contributions = this.countEvents(userContributions);
    //   return contributions;
    // });
    return Promise.resolve({});
  }

  private countEvents(userContributions: UserContributions): Contributions {
    const calendar  = userContributions.contributionsCollection.contributionCalendar;
    const contributions: Contributions = {}

    calendar.weeks.forEach((week: WeekContributionInfo) => {
      week.contributionDays.forEach((day: DayContributionInfo) => {
        contributions[day.date] = {
          date: new Date(day.date),
          contributionsCount: day.contributionCount,
          colorIntensity: calendar.colors.indexOf(day.color) as ColorIntensity,
        };
      })
    });

    return contributions;
  }

  public getContributions(contributions: Contributions, date: Date): ContributionInfo {
    // const key = `${date.getFullYear()}-${this.expand(date.getMonth() + 1)}-${this.expand(date.getDate())}`;
    // return contributions[key];
    const colorIntensity = Math.floor(Math.random() * 5) - 1;
    return {
      date,
      colorIntensity: colorIntensity as ColorIntensity,
      contributionsCount: Math.max(0, 3 * colorIntensity),
    }
  }

  private expand(n: number): string{
    if(n < 10){
      return `0${n}`;
    }

    return n.toString();
  }
}
