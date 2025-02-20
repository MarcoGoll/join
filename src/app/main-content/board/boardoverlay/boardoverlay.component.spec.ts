import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardoverlayComponent } from './boardoverlay.component';

describe('BoardoverlayComponent', () => {
  let component: BoardoverlayComponent;
  let fixture: ComponentFixture<BoardoverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardoverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardoverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
