import { OctokitResponse } from "@octokit/types";

export enum GithubEventType {
    PUSH="PushEvent",
    CREATE="CreateEvent",
    ISSUE_COMMENT="IssueCommentEvent",
    PULL_REQUEST="PullRequestEvent",
    CODE_REVIEW="PullRequestReviewEvent",
}

