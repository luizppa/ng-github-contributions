import { Injectable } from '@angular/core';
import { graphql } from "@octokit/graphql";
import { HttpClient } from '@angular/common/http';
import { ContributionsResponse, DayContributionInfo, GithubEventType, UserContributions, WeekContributionInfo } from '../models/event-response.model';
import { Subject } from 'rxjs';

interface Contributions {
  [key: string]: ContributionInfo;
}

export interface ContributionInfo {
  date: Date;
  contributionsCount: number;
  colorIntensity: number;
}

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {
  private contributions: Contributions = {};
  private contributionsSubject: Subject<Contributions> = new Subject<Contributions>();

  constructor(private http: HttpClient) { }

  public async loadData(profile: string, token: string){

    const graphqlQuery = `
      query ($profile: String!) {
        user(login: $profile) {
          contributionsCollection {
            contributionCalendar {
              colors
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `
    return graphql(graphqlQuery, {
      profile,
      headers: {
        authorization: `token ${token}`,
      },
    }).then((res) => {
      const userContributions = (res as ContributionsResponse).user;
      this.countEvents(userContributions);
      this.contributionsSubject.next(this.contributions);
    });
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
          colorIntensity: calendar.colors.indexOf(day.color),
        };
      })
    })
  }

  public getContributions(date: Date) {
    const key = `${date.getFullYear()}-${this.expand(date.getMonth() + 1)}-${this.expand(date.getDate())}`;
    return this.contributions[key];
  }

  private expand(n: number){
    if(n < 10){
      return `0${n}`;
    }

    return n.toString();
  }
}
