export const environment = {
  production: true,
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
