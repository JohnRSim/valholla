import { writable } from 'svelte/store';
import appConfig from '../../env/config.json';

/**
 * Store Framework
 */
const setup = {
    cached: null, //last cached
    activeroute: 'Home',
    activeID: null,
    global: {
        scrollTarget: '.scrollable',
        scrollBody: '.scrollable',
        enableUnderlay: false,
        displayNav: true,
    },
    path: {
        '/': {
            scrollTarget: '#S-Auth.scrollable',
            scrollBody: '#S-Auth',
            displayNav: false,
        },
        '/login/*': {
            scrollTarget: '#S-Auth.scrollable',
            scrollBody: '#S-Auth',
            displayNav: false,
        },
        '/feed/Home': {
            scrollBody: '#S-Feed',
            scrollTarget: '.main svelte-virtual-list-viewport',
        },
    }
};

/**
 * Store route
 * 
 */
function manageRoute() {
    let store = setup;
    if (process.browser) {
        if (sessionStorage.getItem(`${appConfig.instance}_route`)) {
            const storedUpdates = JSON.parse(sessionStorage.getItem(`${appConfig.instance}_route`));
            store = {
                ...setup,
                ...storedUpdates,
            }
        } else {
            store = setup;
        }
    }

    const { subscribe, set, update } = writable(store);

    return {
        /**
         * Subscribe to updates
         */
        subscribe,
        /**
         * updateCacheTime
         */
        updateCacheTime: (time) => {
            console.info('[route][updateCacheTime]', time);
            update((a) => {
                a.cached = time;
                return a;
            });
        },
        /**
         * updateVal
         */
        updateVal: (key,val) => {
            console.info('[route][updateVal]', key, val);
            update((a) => {
                //console.log('update',a,data)
                if (typeof(a[key]) !== 'undefined') {
                    console.log('updating.........', a[key], val);
                    a[key] = val;
                }
                return a;
            });
        },
        /**
         * reset the state
         */
        reset: () => {
            if (process.browser) {
                sessionStorage.setItem(`${appConfig.instance}_route`, setup);
            }
            return set(setup);
        },
    };
}

const route = manageRoute();
route.subscribe((val) => {
    if (process.browser) {
        sessionStorage.setItem(`${appConfig.instance}_route`, JSON.stringify(val));
    }
});

export { route };