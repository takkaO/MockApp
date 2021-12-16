"use strict";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", 
{
	loadEquipmentList: () => {
		var ret = ipcRenderer.invoke("loadEquipmentList")
		return ret;
	},
	openSearchDataBaseWindow: () => {
		ipcRenderer.invoke("openSearchDB");
	},
	getEquipmentList: () => {
		var ret = ipcRenderer.invoke("getEquipmentList")
		return ret;
	},
	searchDataFromDB: (table, field, query) => {
		var ret = ipcRenderer.invoke("searchDataFromDB", table, field, query);
		return ret;
	}
});

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency])
	}
})