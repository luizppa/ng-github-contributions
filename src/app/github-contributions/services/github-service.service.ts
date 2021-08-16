import { Injectable } from '@angular/core';
import { Octokit } from "@octokit/rest";
import { Observer } from 'rxjs';
import { EventsResponse, GithubEvent, GithubEventType, PushEventPayload } from '../models/event-response.model';

interface Contributions {
  [key: string]: number;
}

export interface ContributionInfo {
  date: Date;
  contributions: number;
}

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {
  private octokit = new Octokit();
  private contributions: Contributions = {};

  constructor() { }

  public loadData(profile: string, limitDate: Date, callback: () => void, page: number = 1): Promise<void>{
    return this.octokit.activity.listPublicEventsForUser({
      username: profile,
      per_page: 100,
      page: page,
    })
    .then((events) => {
      this.countEvents(events as EventsResponse);
      if(this.shouldFetch(limitDate, events as EventsResponse)){
        setTimeout(() => this.loadData(profile, limitDate, callback, page + 1), 200);
      }
      else{
        callback();
      }
    });
  }

  private shouldFetch(limitDate: Date, events: EventsResponse): boolean {

    return !!events.data.length && !events.data.some(event => {
      const eventDate = new Date(event.created_at as string);
      return eventDate.getTime() < limitDate.getTime();
    })
  }

  private countEvents(events: EventsResponse){
    events.data.forEach((event: GithubEvent) => {
      const eventDate = new Date(event.created_at);
      if(!this.contributions[eventDate.toLocaleDateString()]){
        this.contributions[eventDate.toLocaleDateString()] = 0;
      }

      switch(event.type){
        case GithubEventType.PUSH:
          const eventPayload = event.payload as PushEventPayload;
          this.contributions[eventDate.toLocaleDateString()] += eventPayload.distinct_size;
          break;
        case GithubEventType.CREATE:
        case GithubEventType.ISSUE_COMMENT:
        case GithubEventType.PULL_REQUEST:
        case GithubEventType.CODE_REVIEW:
          this.contributions[eventDate.toLocaleDateString()] += 1;
          break; 
      }
    })
  }

  public getContributions(date: Date): number {
    return this.contributions[date.toLocaleDateString()] || 0;
  }
}
