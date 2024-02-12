import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as fs from 'fs';
import * as path from 'path';
import { config } from './app/app.config.server';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

//   const bootstrap = 
//   () => bootstrapApplication(AppComponent, config);

// // --------------------------------------
// /**
// * Section used to mock window object on server side, 
// * as it is not available
// *
// * preventing the error:
// * - Cannot read properties of undefined 
// *  (reading 'Core/Chart/Chart.js')
// */
// const domino = require('domino');

// const template = fs
// .readFileSync(
//   path.join('dist/apps/my-app/browser', 'index.html')
// )
// .toString();

// const window = domino.createWindow(template);
// (global as any).window = window;
// (global as any).document = window.document;

// // --------------------------------------

// export default bootstrap;
