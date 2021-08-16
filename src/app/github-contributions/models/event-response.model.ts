import { OctokitResponse } from "@octokit/types";

export enum GithubEventType {
    PUSH="PushEvent",
    CREATE="CreateEvent",
    ISSUE_COMMENT="IssueCommentEvent",
    PULL_REQUEST="PullRequestEvent",
    CODE_REVIEW="PullRequestReviewEvent",
}

export interface ContributionsResponse {
    user: UserContributions;
}

export interface UserContributions {
    contributionsCollection: ContributionsCollection;
}

export interface ContributionsCollection {
    contributionCalendar: ContributionCalendar;
}

export interface ContributionCalendar {
    totalContributions: number;
    weeks: WeekContributionInfo[];
    colors: string[];
}

export interface WeekContributionInfo {
    contributionDays: DayContributionInfo[];
};

export interface DayContributionInfo {
    contributionCount: number;
    date: string;
    color: string;
}