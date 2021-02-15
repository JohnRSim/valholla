//sapper
import * as sapper from '@sapper/app';

// i18n
import { startClient } from './i18n.js';

startClient();


let appVersion = 0;

//console
const Inf = 'background-color: #f8ffff; color: #276f86';
const base = "font-size:24px; font-weight:200; letter-spacing:0.02em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,0,0.9);";
const sub = "font-size:9px; letter-spacing: 2px; font-weight:bold; letter-spacing:0.2em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,0,0.9);";

console.info("%c[ Val-hölla ]", base);
console.info(`%c[ Setup ] [ v${appVersion} ]`, sub);
console.info('%c[==========]',Inf);
console.info('%c[Val-hölla][Initialising]...',Inf);

//server init
if (process.env.NODE_ENV) {
	console.info('%c[Server][Mode]',Inf, process.env.NODE_ENV);
	console.info('%c[==========]',Inf);
}

//browser init
if (process.browser) {
	console.info('%c[Browser]',Inf, window.navigator.userAgent);
	console.info('%c[Available Languages]',Inf, window.navigator.languages);
	console.info('%c[==========]',Inf);
	console.info(window);
	console.info(document);
	console.info('%c[==========]',Inf);
}

//determine app type 
if (typeof(cordova) !== 'undefined') {
	console.info('%c[Type][Cordova]',Inf);
	document.body.classList.add('cordova');
} else {
	if (document.referrer.includes('android-app://')) {
		console.info('%c[Type][TWA]',Inf);
		document.body.classList.add('twa');
	} else {
		console.info('%c[Type][PWA]',Inf);
		document.body.classList.add('pwa');
	}
}

/**
 * Setup Offline/Online events
 */
if (!navigator.onLine) {
	console.warn('[Device Detected as offline]');
}

//online close any offline model window
window.addEventListener('online', () => {
	console.info('%c[Device Online]',Inf);
});

//offline show model oofline windown
window.addEventListener('offline', () => {
	console.warn('[Device Offline]');
});


sapper.start({
	target: document.querySelector('#sapper')
}).then(() => {
	console.info('%c[==========]',Inf);
	console.info('%c[Val-hölla][Ready]',Inf);
	console.info('%c[==========]',Inf);
});

//prefeetch all routes improve app performance
sapper.prefetchRoutes();
