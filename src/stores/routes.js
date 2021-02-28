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
        showBurger:false,
        leftSpacer:false,
        rightSpacer:false,
        showClose:false,
        showBack:false,
        showLogo:false,
        pageTitle:false,
        showWallet:false,
        showConnectToWallet:false,
        footer:[],
        inlineHeaderNav:false,
        inlineDoubleHeaderNav:false,
        inlineDoubleHeaderLargeNav:false,
        showActiveWallet:false,
        hideNav:false,
    },
    path: {
        '/': {
            scrollTarget: '#S-Auth.scrollable',
            scrollBody: '#S-Auth',
            displayNav: false,
        },
        '/wallet': {
            scrollTarget: '#S-Auth.scrollable',
            scrollBody: '#S-Auth',
            displayNav: true,
            showBurger: true,
            showLogo:true,
            showActiveWallet:true,
            showConnectToWallet:true,
            inlineDoubleHeaderLargeNav:true,
        },
        '/home': {
            scrollTarget: '#V-Home.scrollable',
            scrollBody: '#V-Home',
            showBurger: true,
            showLogo:true,
            showWallet:true,
            inlineHeaderNav:true,
            footer:[{
                classes: 'home',
                name: 'Home',
                active: true,
                path: `/home`,
            },{
                classes: 'updates',
                name: 'Updates',
                active: false,
                path: `/feed/Updates`,
            },{
                classes: 'projects',
                name: 'Projects',
                active: false,
                path: `/collections/Projects`,
            }],
        },
        '/about': {
            scrollTarget: '#V-About.scrollable',
            scrollBody: '#V-About',
            showBurger: true,
            showLogo:true,
            inlineHeaderNav:true,
            showWallet:true,
        },
        '/egg': {
            scrollTarget: '#V-Video.scrollable',
            scrollBody: '#V-Video',
            showBurger: true,
            showLogo:true,
            inlineHeaderNav:true,
            showWallet:true,
        },
        '/debug': {
            scrollTarget: '#S-Auth.scrollable',
            scrollBody: '#S-Auth',
            showBurger: true,
            showLogo:true,
            rightSpacer:true,
        },
        '/leaderboard': {
            scrollTarget: '#S-Auth.scrollable',
            scrollBody: '#S-Auth',
            showBurger: true,
            showLogo:true,
            rightSpacer:true,
        },
        '/kickstart/new': {
            scrollTarget: '#S-Auth.scrollable',
            scrollBody: '#S-Auth',
            showBurger: true,
            showLogo:true,
            rightSpacer:true,
        },
        '/kickstart/grant': {
            scrollTarget: '#S-Auth.scrollable',
            scrollBody: '#S-Auth',
            showBurger: true,
            showLogo:true,
            rightSpacer:true,
        },
        '/collections/*': {
            scrollTarget: '#V-Collections.scrollable',
            scrollBody: '#V-Collections',
            showBurger: true,
            showLogo:true,
            inlineHeaderNav:true,
            showWallet:true,
            footer:[{
                classes: 'home',
                name: 'Home',
                active: false,
                path: `/home`,
            },{
                classes: 'updates',
                name: 'Updates',
                active: false,
                path: `/feed/Updates`,
            },{
                classes: 'projects',
                name: 'Projects',
                active: true,
                path: `/collections/Projects`,
            }],
        },
        '/collections/project': {
            scrollTarget: '#V-Project.scrollable',
            scrollBody: '#V-Project',
            displayNav:false,
            footer:[{
                classes: 'home',
                name: 'Campaign',
                active: true,
                path: `/home`,
            },{
                classes: 'updates',
                name: 'Timeline',
                active: false,
                path: `/feed/Updates`,
            },{
                classes: 'projects',
                name: 'Updates',
                active: false,
                path: `/collections/Projects`,
            },{
                classes: 'projects',
                name: 'Stats',
                active: false,
                path: `/collections/Projects`,
            }],
        },
        '/feed/*': {
            scrollBody: '#S-Feed',
            scrollTarget: '#S-Feed',
            showBurger: true,
            showLogo:true,
            inlineHeaderNav:true,
            showWallet:true,
            footer:[{
                classes: 'home',
                name: 'Home',
                active: false,
                path: `/home`,
            },{
                classes: 'updates',
                name: 'Updates',
                active: true,
                path: `/feed/Updates`,
            },{
                classes: 'projects',
                name: 'Projects',
                active: false,
                path: `/collections/Projects`,
            }],
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