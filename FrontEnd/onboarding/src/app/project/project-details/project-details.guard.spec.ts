import { TestBed } from '@angular/core/testing';

import { ProjectDetailsGuard } from './project-details.guard';

describe('ProjectDetailsGuard', () => {
  let guard: ProjectDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProjectDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
