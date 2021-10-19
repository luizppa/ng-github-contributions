# Angular Github Contribuions

An angular component to reproduce the appearence and behaviour of the Github contributions board. So far, the component supports custom color themes and time span, but more options will be added in the future.

- [Angular Github Contribuions](#angular-github-contribuions)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Options](#options)
      - [GithubColorPalette Type](#githubcolorpalette-type)
      - [GithubBoardLabelOptions Type](#githubboardlabeloptions-type)

## Overview

Default appearence
![Example image](https://github.com/luizppa/ng-github-contributions/blob/main/docs/default-appearence.jpg?raw=true)

Custom colors
![Example image](https://github.com/luizppa/ng-github-contributions/blob/main/docs/custom-colors.jpg?raw=true)

Custom time span
![Example image](https://github.com/luizppa/ng-github-contributions/blob/main/docs/custom-week-count.jpg?raw=true)

Hiding labels
![Example image](https://github.com/luizppa/ng-github-contributions/blob/main/docs/no-labels.jpg?raw=true)

## Installation

To install from npm:

```sh
npm i --save @luizppa/ng-github-contributions
```

Import `GithubContributionsModule` into your app module:

```javascript
import { GithubContributionsModule } from "ng-github-contributions";

//...

@NgModule({
  //...
  imports: [
    //...
    GithubContributionsModule,
  ],
  //...
});

```

## Usage

Basic usage

```html
<github-board
    [profile]="'luizppa'"
    [onCellClick]="onCellClickHandler"
    [options]="boardOptions">
</github-board>
```

### Options

Optionally, you can specify an options object to configure the appearence fo the board. The available options are shown on the table bellow:

| Option       | Type                    | Default value | Description                                                                    |
|--------------|-------------------------|---------------|--------------------------------------------------------------------------------|
| cellSize     | number                  | 10            | Defines the size of each individual board cell in pixels.                      |
| weeksNumber  | number                  | 53            | Defines the time span shwon on the board in number of weeks.                   |
| colorPalette | GithubBoardColorPalette |               | Defines the color palette for the board cells.                                 |
| labels       | GithubBoardLabelOptions |               | Defines the properties of the labels indicating day and month around the board.|

#### GithubColorPalette Type

Object that defines the color scheme to use on the board. The colors must be specified as strings in any HTML suported format (HEX, rgb, rgba...).

| Option | Type   | Default value | Description                                                 |
|--------|--------|---------------|-------------------------------------------------------------|
| none   | string | #EBEDF0       | Defines the color for cells with no contributions.          |
| low    | string | #9BE9A8       | Defines the color for cells with 1 - 3 contributions.       |
| medium | string | #40C463       | Defines the color for cells with 4 - 8 contributions.       |
| high   | string | #30A14E       | Defines the color for cells with 9 - 10 contributions.      |
| higher | string | #216E39       | Defines the color for cells with more than 10 contributions.|

#### GithubBoardLabelOptions Type

| Option    | Type    | Default value | Description                                   |
|-----------|---------|---------------|-----------------------------------------------|
| showMonth | boolean | true          | Defines whether or not to show month labels.  |
| showDay   | boolean | true          | Defines whether or not to show day labels.    |
| size      | number  | 9             | Defines the font size of the labels in pixels.|
