"use strict";

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require('fs');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./test/dummy.sqlite3");
var mainWindow = null;
var searchDataBaseWindow = null;
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
		if (searchDataBaseWindow !== null) {
			searchDataBaseWindow.close();
		}
		mainWindow = null;
	});
};

function createChildWindow() {
	if (searchDataBaseWindow !== null) {
		searchDataBaseWindow.focus();
		return;
	}
	searchDataBaseWindow = new BrowserWindow({
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
	searchDataBaseWindow.loadFile("./template/search_window.html");
	// Dev tool を自動起動
	searchDataBaseWindow.webContents.openDevTools();

	searchDataBaseWindow.on('closed', function () {
		searchDataBaseWindow = null;
	});
}

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
let equipmentList = [];
ipcMain.handle("loadEquipmentList", async (event) => {
	const text = fs.readFileSync("./test/dummy.json", 'utf8');
	equipmentList = JSON.parse(text);
	return equipmentList;
});

ipcMain.handle("openSearchDB", async (event) => {
	createChildWindow();
});

ipcMain.handle("getEquipmentList", async (event) => {
	return equipmentList;
});

ipcMain.handle("searchDataFromDB", async (event, table, field, query) => {
	let result = [];
	let q = "SELECT * FROM `" + table + "` ";
	if (query !== "") {
		if (field != "_ALL_") {
			q += "WHERE `" + field + "` like `%" + query + "`%"
		}
		else {
			// リストでもらうか
		}
	}
	console.log(q)
	await new Promise(resolve => {
		db.all(q, (err, rows) => {
			if (!err) {
				result = rows;
				//console.log(rows)
			}
			resolve();
		});
	});
	return result;
})

/************************************************************
 * Model (Logic)
 ***********************************************************/

function add(val1, val2) {
	return val1 + val2;
}