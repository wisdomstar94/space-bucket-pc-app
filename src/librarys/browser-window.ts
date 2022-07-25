import { app, BrowserWindow } from "electron";
import * as path from "path";

export const browserWindow = (url: string, options?: Electron.BrowserWindowConstructorOptions) => {
  if (options === undefined) {
    options = {};
  }

  if (options.webPreferences === undefined) {
    options.webPreferences = {
      preload: path.join(__dirname, "..", "preload.js"),
    };
  } else if (options.webPreferences.preload === undefined) {
    options.webPreferences.preload = path.join(__dirname, "..", "preload.js");
  }

  const window = new BrowserWindow(options);

  let applyUrl: string = url;
  if (applyUrl[0] !== '/') {
    applyUrl = '/' + applyUrl;
  }

  if (app.isPackaged) {
    // production
    window.loadURL('file://' + path.join(__dirname, '..', '..', 'client', 'index.html') + '#' + applyUrl);
  } else {
    // development
    window.loadURL('http://localhost:4200/#' + applyUrl);
  }

  return window;
};