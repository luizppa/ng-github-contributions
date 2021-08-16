import { Component, Input, OnInit } from '@angular/core';

enum ColorIntensity{
  NONE='#ebedf0',
  LOW='#9be9a8',
  MEDIUM='#40c463',
  HIGH='#30a14e',
  HIGHER='#216e39',
}

//  Purple theme
// enum ColorIntensity{
//   NONE='#ebedf0',
//   LOW='#A780FB',
//   MEDIUM='#7435FA',
//   HIGH='#5C2AC7',
//   HIGHER='#381A7A',
// }

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

  constructor() { }

  ngOnInit(): void {
  }

  public get color(){
    switch(this.colorIntensity){
      case 0: return ColorIntensity.LOW;
      case 1: return ColorIntensity.MEDIUM;
      case 2: return ColorIntensity.HIGH;
      case 3: return ColorIntensity.HIGHER;
      default: return ColorIntensity.NONE;
    }
  }

  public get tooltipText(){
    return `${this.contributions} contributions on ${this.dateText}`;
  }

  private get dateText(){
    return `${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}`;
  }

}
