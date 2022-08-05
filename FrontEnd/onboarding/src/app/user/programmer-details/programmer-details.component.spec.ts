import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammerDetailsComponent } from './programmer-details.component';

describe('ProgrammerDetailsComponent', () => {
  let component: ProgrammerDetailsComponent;
  let fixture: ComponentFixture<ProgrammerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
