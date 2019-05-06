import { TestBed } from '@angular/core/testing';

import { RefreshService } from './refresh.service';

describe('RefreshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefreshService = TestBed.get(RefreshService);
    expect(service).toBeTruthy();
  });

  describe('setRefreshChuckList', () => {
    it('should trigger event when called', () => {
      const service: RefreshService = TestBed.get(RefreshService);
      spyOn(service.refreshChuckList, 'emit');
      service.setRefreshChuckList();
      expect(service.refreshChuckList.emit).toHaveBeenCalled();
    });
  });

  describe('setRefreshQuote', () => {
    it('should trigger event when called', () => {
      const service: RefreshService = TestBed.get(RefreshService);
      spyOn(service.refreshQuote, 'emit');
      service.setRefreshQuote();
      expect(service.refreshQuote.emit).toHaveBeenCalled();
    });
  });
});
