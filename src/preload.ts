import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  desktop: true,
  send: (channel: string, data: unknown) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel: string, callback: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void) => {
    ipcRenderer.on(channel, (event, ...args) => callback(event, ...args));
  }
});