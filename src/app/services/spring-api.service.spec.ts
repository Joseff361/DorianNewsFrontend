import { TestBed } from '@angular/core/testing';

import { SpringApiService } from './spring-api.service';

describe('SpringApiService', () => {
  let service: SpringApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
