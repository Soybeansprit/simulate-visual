import { TestBed } from '@angular/core/testing';

import { StaticAnalysisService } from './static-analysis.service';

describe('StaticAnalysisService', () => {
  let service: StaticAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
