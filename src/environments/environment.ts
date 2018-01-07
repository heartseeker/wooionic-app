// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  wooCommerce: {
    url: 'http://api.ionicwoo.com',
    consumerKey: 'ck_476b370cc62b10c6763732fa0355d61216ab7851',
    consumerSecret: 'cs_25e423d7f9fe6d1506b3d37c98cc6f7ac83782d8',
    wpAPI: true,
    version: 'wc/v1'
  }
};
