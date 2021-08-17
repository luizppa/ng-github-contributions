import { Injectable } from '@angular/core';
import { graphql } from "@octokit/graphql";
import { HttpClient } from '@angular/common/http';
import { ContributionsResponse, DayContributionInfo, GithubEventType, UserContributions, WeekContributionInfo } from '../models/event-response.model';
import { Subject } from 'rxjs';

export enum ColorIntensity{
  NONE=-1,
  LOW=0,
  MEDIUM=1,
  HIGH=2,
  HIGHER=3,
}

interface Contributions {
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
  private contributions: Contributions = {};
  private contributionsSubject: Subject<Contributions> = new Subject<Contributions>();

  constructor(private http: HttpClient) { }

  public async loadData(profile: string, token: string){

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
    //   this.countEvents(userContributions);
    //   this.contributionsSubject.next(this.contributions);
    // });
    return Promise.resolve();
  }

  public subscribeContributions(callback: (contributions: Contributions) => void) {
    return this.contributionsSubject.subscribe(callback);
  }

  private countEvents(userContributions: UserContributions){
    const calendar  = userContributions.contributionsCollection.contributionCalendar;

    calendar.weeks.forEach((week: WeekContributionInfo) => {
      week.contributionDays.forEach((day: DayContributionInfo) => {
        this.contributions[day.date] = {
          date: new Date(day.date),
          contributionsCount: day.contributionCount,
          colorIntensity: calendar.colors.indexOf(day.color) as ColorIntensity,
        };
      })
    })
  }

  public getContributions(date: Date): ContributionInfo {
    // const key = `${date.getFullYear()}-${this.expand(date.getMonth() + 1)}-${this.expand(date.getDate())}`;
    // return this.contributions[key];
    const colorIntensity = Math.floor(Math.random() * 5) - 1;
    return {
      date,
      colorIntensity: colorIntensity as ColorIntensity,
      contributionsCount: Math.max(0, 3 * colorIntensity),
    }
  }

  private expand(n: number){
    if(n < 10){
      return `0${n}`;
    }

    return n.toString();
  }
}
