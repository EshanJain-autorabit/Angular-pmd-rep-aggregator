import { TestBed } from '@angular/core/testing';

import { HighService } from './high.service';

describe('HighService', () => {
  let service: HighService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
