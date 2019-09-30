import { TestBed } from '@angular/core/testing';

import { CritiqueService } from './critique.service';

describe('CritiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CritiqueService = TestBed.get(CritiqueService);
    expect(service).toBeTruthy();
  });
});
