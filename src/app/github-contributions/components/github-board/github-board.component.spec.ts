import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubBoardComponent } from './github-board.component';

describe('GithubBoardComponent', () => {
  let component: GithubBoardComponent;
  let fixture: ComponentFixture<GithubBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
