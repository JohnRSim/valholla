//sapper
import { stores, goto } from '@sapper/app';

//stores
import { user as sUser } from '../stores/user.js';

let $sUser = {};
sUser.subscribe((v) => {
	$sUser = v.userToken;
});

let activeNav;

/**
 * detect if iOS
 **/
function is_iOS() {
	return [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
	].includes(navigator.platform)
		// iPad on iOS 13 detection
		|| (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

/**
 * navTo
 * @param {Sting || obj} config if string then route path else config other params
 */
function navTo(config) {
	console.info('[NAVTO]', config);

	//defaults  
	let path = config || '/';

	//update config
	if (typeof (config) === 'object') {
		path = config.path;
	}

	//stores
	const { page } = stores();

	page.subscribe(activePage => {
		activeNav = activePage;
	});

	//Goto page
	if ((activeNav.path !== path) && (document)) {
		//redirect to path
		goto(path, { replaceState: (is_iOS()) }).then(() => {
			console.log('[NavTo][Redirected]', path);
		});
	}
}

/**
 * goBack
 * @param {String} fallbackPath if window.back length is 0 then fallback to this path.
 */
function goBack(fallbackPath) {
	if ((typeof (window.history.state) !== 'undefined') && (window.history.state.id > 1)) {
		window.history.back();
	} else {
		goto(fallbackPath, { replaceState: (is_iOS()) }).then(() => {
			console.log('[NavTo][Redirected]', fallbackPath);
		});
	}
}

export { navTo, goBack };