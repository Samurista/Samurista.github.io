'use strict';

const windowHashKey = 'WindowHash';
const openWindowsKey = 'OpenWindows';

function getOpenWindowHashes() {
	return JSON.parse(localStorage.getItem(openWindowsKey) || '{}');
}

function putWindowHashesToLocalStorage(windowHashes) {
	localStorage.setItem(openWindowsKey, JSON.stringify(windowHashes));
}

function windowLoadEventHandler() {
	var dateNow = Date.now();
	var windowHash = `window_${dateNow}`;
	var openWindowHashes = getOpenWindowHashes();

	// Remove all window hashes older than 30 min
	Object.values(openWindowHashes).forEach(function(value) {
		if ((dateNow - value) > (30*60*1000)) {
			delete openWindowHashes[`window_${value}`];
		}
	});

	openWindowHashes[windowHash] = dateNow;
	sessionStorage.setItem(windowHashKey, windowHash);
	putWindowHashesToLocalStorage(openWindowHashes);
}

function windowUnloadEventHandler() {
	var windowHash = sessionStorage.getItem(windowHashKey);
	var openWindowHashes = getOpenWindowHashes();

	delete openWindowHashes[windowHash];
	putWindowHashesToLocalStorage(openWindowHashes);
}

function forceHashRefresh() {
	windowUnloadEventHandler();
	windowLoadEventHandler();
}

window.addEventListener('load', windowLoadEventHandler);
window.addEventListener('unload', windowUnloadEventHandler);