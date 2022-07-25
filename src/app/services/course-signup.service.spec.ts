import { TestBed } from '@angular/core/testing';

import { CourseSignupService } from './course-signup.service';

describe('CourseSignupService', () => {
  let service: CourseSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
