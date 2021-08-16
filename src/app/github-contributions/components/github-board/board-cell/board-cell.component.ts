import { Component, Input, OnInit } from '@angular/core';

enum ColorIntensity{
  NONE='#ebedf0',
  LOW='#9be9a8',
  MEDIUM='#40c463',
  HIGH='#30a14e',
}

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

  constructor() { }

  ngOnInit(): void {
  }

  public get colorIntensity(){
    if(this.contributions <= 0){
      return ColorIntensity.NONE;
    }
    else if(this.contributions <= 2){
      return ColorIntensity.LOW;
    }
    else if(this.contributions <= 5){
      return ColorIntensity.MEDIUM;
    }
    else{
      return ColorIntensity.HIGH;
    }
  }

  public get tooltipText(){
    return `${this.contributions} contributions on ${this.dateText}`;
  }

  private get dateText(){
    return `${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}`;
  }

}
