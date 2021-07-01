import { TestBed } from '@angular/core/testing';

import { BestScenarioService } from './best-scenario.service';

describe('BestScenarioService', () => {
  let service: BestScenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestScenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
