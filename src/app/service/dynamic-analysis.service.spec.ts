import { TestBed } from '@angular/core/testing';

import { DynamicAnalysisService } from './dynamic-analysis.service';

describe('DynamicAnalysisService', () => {
  let service: DynamicAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
