// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const number=7
export const environment = {
  production: false,
  API_URL: "https://localhost:7085/api",
  API_URL_SPECIAL: "https://localhost:7085/",
  LINK_GITHUB:"https://github.com/Alen02T",
  LINK_LINKEDIN:"https://www.linkedin.com/in/alen-tokalic-cerkezovic-8a50b7249/",
  LINK_TWITTER:"",
  LINK_INSTAGRAM:"https://www.instagram.com/alen_rincon/",

//Cambiar cada vez que quiera cambiar una carrera

  BEFORERACEID:number-1,
  CURRENTRACEID:number,
  AFTERCURRENT:number+1,

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
