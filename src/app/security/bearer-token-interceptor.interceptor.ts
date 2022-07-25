import {Inject, Injectable, InjectionToken} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, flatMap} from 'rxjs/operators';
import {OktaAuthService} from '@okta/okta-angular';

export const AuthServiceToken = new InjectionToken<AuthService>('Auth Service');

export interface AuthService {
  getAccessToken(): Promise<string | undefined>;
  loginRedirect(fromUri?: string, additionalParams?: object): void;
}

@Injectable()
export class BearerTokenInterceptorInterceptor implements HttpInterceptor {

  constructor(@Inject(AuthServiceToken) private readonly authService: AuthService,
              private router: Router) {}

  private static addAuthorizationHeaderTo(
    request: HttpRequest<any>,
    accessToken: string | undefined,
  ): HttpRequest<any> {
    if (accessToken === undefined) {
      return request;
    }
    return request.clone({
      headers: new HttpHeaders({Authorization: `Bearer ${accessToken}`}),
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const interceptor: Observable<any> = fromPromise(this.authService.getAccessToken())
      .pipe(flatMap((accessToken) => next.handle(BearerTokenInterceptorInterceptor.addAuthorizationHeaderTo(request, accessToken))));
      // .pipe(catchError(this.andRethrowAfter(this.redirectingAll401s)));
    console.log('inter : ', interceptor);
    return interceptor;
  }

  private andRethrowAfter: (errorCallback: (error: any) => void) => (error: any) => any =
    (errorCallback: (error: any) => void) => {
      return (error) => {
        const scopedErrorCallback: (error: any) => void = () => {
          errorCallback(error);
        };

        scopedErrorCallback(error);
        throw error;
      };
    }

  private redirectingAll401s = (error: any) => {
    if (error.status === 401) {
      this.authService.loginRedirect(this.router.url);
    }
  }


}
