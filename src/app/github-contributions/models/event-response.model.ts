import { OctokitResponse } from "@octokit/types";

export enum GithubEventType {
    PUSH="PushEvent",
    CREATE="CreateEvent",
    ISSUE_COMMENT="IssueCommentEvent",
    PULL_REQUEST="PullRequestEvent",
    CODE_REVIEW="PullRequestReviewEvent",
}

export interface EventsResponse extends OctokitResponse<GithubEvent[]> { }

export interface GithubEvent {
    id: string;
    created_at: string;
    type: GithubEventType;
    payload: PushEventPayload | CreateEventPayload | IssueCommentEventPayload | PullRequestCreateEventPayload | PullRequestReviewEventPayload;
}

export interface PushEventPayload {
    commits: CommitInfo[],
    distinct_size: number,
    head: string,
    push_id: number,
}

export interface CreateEventPayload {
    description: string;
}

export interface IssueCommentEventPayload {
    issue: IssueInfo;
}

interface PullRequestEventPayload {
    action: string,
    pull_request: PullRequestInfo,
}

export interface PullRequestCreateEventPayload extends PullRequestEventPayload{
    number: number,
}

export interface PullRequestReviewEventPayload extends PullRequestEventPayload{
    review: ReviewInfo;
}

export interface CommitInfo {
    author: {
        email: string,
        name: string,
    }
    distinct: boolean,
    message: string,
    sha: string,
    url: string,
}

export interface IssueInfo {
    id: number,
    body: string,
    closed_at: string,
    comments: number,
    comments_url: string,
    html_url: string,
    number: number,
    repository_url: string,
    state: string,
    title: string,
    url: string,
} 

export interface PullRequestInfo {
    additions: number,
    body: string,
    changed_files: number,
    closed_at: string,
    comments: number,
    comments_url: string,
    commits: number,
    commits_url: string,
    created_at: string,
    deletions: number,
    diff_url: string,
    draft: boolean,
    html_url: string,
    id: number,
    issue_url: string,
    merged: boolean,
    number: number,
    review_comment_url: string,
    review_comments: number,
    review_comments_url: string,
    state: string,
    statuses_url: string,
    title: string,
    updated_at: string
    url: string,
}

export interface ReviewInfo {
    id: number,
    body: string,
    commit_id: string,
    html_url: string,
    pull_request_url: string,
    state: string,
    submitted_at: string,
}