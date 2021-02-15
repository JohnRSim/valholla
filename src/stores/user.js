import { writable } from 'svelte/store';
import appConfig from '../../env/config.json';

/**
 * Store Framework
 */
const setup = {
    languageLocale: 'en',
    langDirection: 'ltr',
    CDN: true,
    user: {
        account: {
            username: 'anonymous'
        }
    },
};

/**
 * Store User Details
 * 
 */
function manageUser() {
    let store = setup;
    if (process.browser) {
        if (localStorage.getItem(`${appConfig.instance}_user`)) {
            const storedUpdates = JSON.parse(localStorage.getItem(`${appConfig.instance}_user`));
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
         * updateVal
         */
        updateVal: (key,val) => {
            console.info('[user][updateVal]', key, val);
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
                localStorage.setItem(`${appConfig.instance}_user`, setup);
            }
            return set(setup);
        },
	};
}

const user = manageUser();
user.subscribe((val) => {
    if (process.browser) {
        localStorage.setItem(`${appConfig.instance}_user`, JSON.stringify(val));
    }
});

export { user };