import { ColorIntensity } from './enums';

/**
 * Gituhb graphql interfaces
 */
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
}

export interface DayContributionInfo {
    contributionCount: number;
    date: string;
    color: string;
}

/**
 * Component options
 */
export interface GithubBoardColorPalette {
    none: string;
    low: string;
    medium: string;
    high: string;
    higher: string;
}

export interface GithubBoardOptions {
    cellSize?: number;
    weeksNumber?: number;
    showLegend?: boolean;
    labels?: GithubBoardLabelOptions;
    colorPalette?: GithubBoardColorPalette;
}

export interface GithubBoardLabelOptions {
    showMonth?: boolean;
    showDay?: boolean;
    size?: number;
}

/**
 * Data interfaces
 */
export interface Contributions {
    [key: string]: ContributionInfo;
}

export interface ContributionInfo {
    date: Date;
    contributionsCount: number;
    colorIntensity: ColorIntensity;
}
