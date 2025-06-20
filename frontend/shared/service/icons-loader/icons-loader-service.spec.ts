import { TestBed } from '@angular/core/testing';

import { IconsLoaderService } from './icons-loader-service';

describe('IconsLoaderService', () => {
  let service: IconsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
