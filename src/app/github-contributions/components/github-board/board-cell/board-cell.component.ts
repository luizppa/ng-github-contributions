import { Component, Input, OnInit } from '@angular/core';
import { Themes } from 'src/app/github-contributions/constants';
import { ColorIntensity } from 'src/app/github-contributions/services/github-service.service';
import { GithubBoardColorPalette } from '../github-board.component';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.css']
})
export class BoardCellComponent implements OnInit {
  @Input() date: Date = new Date;
  @Input() contributions: number = 0;
  @Input() colorIntensity: number = 0;
  @Input() colorPalette?: GithubBoardColorPalette;

  constructor() { }

  ngOnInit(): void {
  }

  public get color(){
    const colorPalette = this.colorPalette || Themes.default;
    switch(this.colorIntensity){
      case ColorIntensity.LOW: return colorPalette.low;
      case ColorIntensity.MEDIUM: return colorPalette.medium;
      case ColorIntensity.HIGH: return colorPalette.high;
      case ColorIntensity.HIGHER: return colorPalette.higher;
      default: return colorPalette.none;
    }
  }

  public get tooltipText(){
    return `${this.contributions} contributions on ${this.dateText}`;
  }

  private get dateText(){
    return `${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}`;
  }

}
