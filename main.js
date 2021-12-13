"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path")
var mainWindow = null;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';

/************************************************************
 * Window create 
 ***********************************************************/
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: { 
			// In Electron 12, the default will be changed to true.
			worldSafeExecuteJavaScript: true,
			// XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
			nodeIntegration: false,
			// レンダとメインのglobal（window）を分離するか否か
			contextIsolation: true,  
			preload: path.resolve(app.getAppPath() + "/preload.js"),
		}
	});

	//mainWindow.webContents.loadURL("file://" + __dirname + "/index.html");
	mainWindow.loadFile("index.html");
	// Dev tool を自動起動
	mainWindow.webContents.openDevTools();
	
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
};

/************************************************************
 * app setting
 ***********************************************************/
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on("ready", createWindow);


app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});

/************************************************************
 * IPC API
 ***********************************************************/
ipcMain.handle("test", async (event, val1, val2) => {
	console.log("ipc-api1");
	return add(val1, val2);
});

ipcMain.on("ipc-api2", () => {
	console.log("ipc-api2 (not recommend)");
});

/************************************************************
 * Model (Logic)
 ***********************************************************/

function add(val1, val2) {
	return val1 + val2;
}