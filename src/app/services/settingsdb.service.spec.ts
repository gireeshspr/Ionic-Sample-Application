import { TestBed } from '@angular/core/testing';

import { SettingsdbService } from './settingsdb.service';

describe('SettingsdbService', () => {
  let service: SettingsdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
