import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubBoardComponent } from './components/github-board/github-board.component';
import { BoardCellComponent } from './components/github-board/board-cell/board-cell.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardColumnComponent } from './components/github-board/board-column/board-column.component';

@NgModule({
  declarations: [
    GithubBoardComponent,
    BoardCellComponent,
    BoardColumnComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    GithubBoardComponent
  ]
})
export class GithubContributionsModule { }
