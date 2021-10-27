import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubBoardComponent } from './components/github-board/github-board.component';
import { BoardCellComponent } from './components/github-board/board-cell/board-cell.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardColumnComponent } from './components/github-board/board-column/board-column.component';
import { BoardLegendComponent } from './components/github-board/board-legend/board-legend.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { DefaultTooltipOptions } from './constants';

@NgModule({
  declarations: [
    GithubBoardComponent,
    BoardCellComponent,
    BoardColumnComponent,
    BoardLegendComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    TooltipModule.forRoot(DefaultTooltipOptions),
  ],
  exports: [
    GithubBoardComponent,
    BoardLegendComponent
  ]
})
export class GithubContributionsModule { }
