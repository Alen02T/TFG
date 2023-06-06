import { TestBed } from '@angular/core/testing';

import { DriverStandingsService } from './driver-standings.service';

describe('DriverStandingsService', () => {
  let service: DriverStandingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverStandingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
