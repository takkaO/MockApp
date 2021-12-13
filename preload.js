"use strict";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
	"api", {
	testApi: () => ipcRenderer.invoke("test", 1, 99)
		.then((result) => {
			console.log("IPC api1 OK. add -> " + result)
		})
		.catch((err) => {
			console.log(err)
		}),
	testApi2: () => ipcRenderer.send("ipc-api2"),
}
);

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency])
	}
})