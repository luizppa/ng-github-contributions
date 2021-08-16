import { Component, Input, OnInit } from '@angular/core';
import { ContributionInfo } from 'src/app/github-contributions/services/github-service.service';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css']
})
export class BoardColumnComponent implements OnInit {
  @Input() week: ContributionInfo[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
