import { TestBed } from '@angular/core/testing';

import { BearerTokenInterceptorInterceptor } from './bearer-token-interceptor.interceptor';

describe('BearerTokenInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BearerTokenInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BearerTokenInterceptorInterceptor = TestBed.inject(BearerTokenInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
