// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:8081',
  disableAnimations: false,
  gaTrackingId: null,
  // tslint:disable-next-line:max-line-length
  // logoutRedirectUrl: 'https://sit-sso.alliancewebs.net/SsoCookieManager.axd?Action=Logout&ReturnURL=https://notification.test.vizientinc.com/admin/applications',
  icrIcuTimeout: 300000,
  issuer: `https://dev-61830595.okta.com/oauth2/default`,
  clientId: '0oa5wqh5cg53YB8dl5d7',
  redirectUri: 'http://localhost:4200/login/callback',
  scopes: ['openid', 'email'],
  pkce: false,
  thisUri: 'http://localhost:4200',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
