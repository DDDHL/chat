'use strict'

import { app, protocol, BrowserWindow, ipcMain, Tray } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// 在入口文件对的顶部配置热加载
// 热加载
try {
  require('electron-reloader')(module, {})
} catch (_) {}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])
var win
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 958,
    height: 589,
    minWidth: 700,
    minHeight: 500,
    frame: false,
    /* webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    }, */
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  createWindow()
})

// 退出程序
ipcMain.on('window-close', function () {
  app.exit()
})
// 最小化
ipcMain.on('window-minimize', function () {
  win.minimize()
})
// 全屏
ipcMain.on('window-maximize', function () {
  if (win.isMaximized()) {
    win.restore()
  } else {
    win.maximize()
  }
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
