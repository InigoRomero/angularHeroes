import { TestBed } from '@angular/core/testing';

import { VillainsService } from './villains.service';

describe('VillainsService', () => {
  let service: VillainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VillainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
