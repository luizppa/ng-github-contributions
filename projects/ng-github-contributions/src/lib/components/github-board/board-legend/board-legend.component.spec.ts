import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLegendComponent } from './board-legend.component';

describe('BoardLegendComponent', () => {
  let component: BoardLegendComponent;
  let fixture: ComponentFixture<BoardLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
