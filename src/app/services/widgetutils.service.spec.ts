import { TestBed } from '@angular/core/testing';

import { WidgetutilsService } from './widgetutils.service';

describe('WidgetutilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WidgetutilsService = TestBed.get(WidgetutilsService);
    expect(service).toBeTruthy();
  });
});
