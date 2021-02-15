<script>
	//svelte
    import { onMount, createEventDispatcher, onDestroy, tick } from 'svelte';

	//gestures
    import { tap } from '@sveltejs/gestures';
    
    import {
		bgColor
	} from 'fb-atlas-lib';

    export let stretchImg = false;
    export let maxHeight = false;
    export let maxWidth = false;
    export let cover = false;
    export let classes = '';
    export let baseClasses = '';
    export let src = '/4x3.gif';
    export let alt = 'Preview Img';
    export let original = false;
    export let retina = false;
    export let thumb = '';
    export let rootMargin='-100px';
    export let root = null;
    export let threshold = null;
    export let imageBackground = false;
    export let enableObserver = true;
    export let returnColors = false;
    export let lazy = true;
    export let includeDimensions = false;
    export let scrolling = false;
    //export let loadImgAfterScroll = false;
    export let imgLoadDelay = 0;
    export let forceShowImg = false;
    export let imgLoaded = false;
    export let imgRef = false;
    export let debugRef = 'test';
    export let thumbOnly = false;
    export let enablePinch = false;
    export let pinchOutside = false;
    export let width = null;
    export let height = null;
    export let loader = true;
    
    const dispatch = createEventDispatcher();
    
    let srcset = '';
    let setSrcset = true;
    $: if ((!thumbOnly) && (setSrcset) && (!scrolling)) {
        setSrcset = false;
        srcset = ((original) && (retina))?`${retina} 2x,${original} 1x`:original || retina || '';
    }

    let isMounted = false;
    let srcsetx = '';
    let img = { ele: null };

    //observer
    let observer;
    let node;
    let intersected = false;
    let size = false;
    let loadDelayTimer;

    //preload
    let ImgReference;
    
    //debug
    let debug = false;

    //intersect detection enable preload of image
    async function onIntersect(entries){
        if (entries[0].isIntersecting) {
            //enable intersect
            observer.unobserve(node);
            observer = null;
            enableObserver = false;

            await tick();

            preload();
        }
    }  


    function setObserver() {
        if (enableObserver) {
            if (debug) console.log(debugRef,'--------- observer enabled');
            observer = new IntersectionObserver(onIntersect,{rootMargin, root, threshold});
            observer.observe(node);
        } else {
            if (debug) console.log(debugRef,'--------- observer disabled');
            preload();
        }
    }

    function loadImg() {
        //if image not loaded then
        if (!intersected) {
            //load img background colour if return colour is true and no bg colour returned
            if ((returnColors) && (imageBackground === false)) {
                if (debug) console.log(debugRef,returnColors,imageBackground,'--------- return bg colour');
                updateCardBgImg();
                if (imgLoadDelay) {
                    if (debug) console.log(debugRef,'--------- has load delay',imgLoadDelay);
                    src='/4x3.gif';
                    loadDelayTimer = setTimeout(() => {
                        if (debug) console.log(debugRef,'--------- has load delay',imgLoadDelay);
                        if (debug) console.log(debugRef,'--------- setting thumb');
                        src = thumb;
                        preload();
                    },imgLoadDelay);
                } else {
                    preload();
                }
            } else {
                if (debug) console.log(debugRef,'--------- setting thumb',lazy,forceShowImg);
                src = thumb;
                //set observers
                setObserver();
            }
        }
    }

    //if mounted and scrolling finished
    $: if ((isMounted) && (!scrolling)) {
        loadImg();
    }

    if ((imgLoaded) && (forceShowImg)) {
        lazy = false;
    }
    if (!lazy) {
        if (debug) console.log(debugRef,'------- not lazy set src thumb', thumb);
        src = thumb;
    }

    let pinch = () => {};
    let press = () => {};
    let pan = () => {};
    //mount observer
	onMount(async () => {
        if (enablePinch) {
            const hammer = await import('svelte-hammer');
            pinch = hammer.pinch;
            pan = hammer.pan;
            press = hammer.press; //
        }
        
        if (debug) console.log(debugRef,'------- mounted',imgLoaded);
        isMounted = true;
        
        if (enablePinch) {
            await tick();
            const screen = document.querySelector('body');
            //console.log(ImgReference)
            START_X = 0;//Math.round((screen.offsetWidth - ImgReference.offsetWidth) / 2);
	        START_Y = 0;//Math.round((screen.offsetHeight - ImgReference.offsetHeight) / 2);
            translate= { x: START_X, y: START_Y };
        }
    });

    //destoy image and clear if not loaded 
    onDestroy(() => {
        if (process.browser) {
            if (observer) {
                observer.unobserve(node);
            }
            if (img.ele) {
                if (debug) console.info(debugRef,'------------clearing');
                img.ele.onload = null;
                img.ele.onerror = null;
                img.ele.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';//'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=;';
                //img.ele.onload = function(){};
                delete img.ele;
                srcsetx = '';
            }
        }
    });

    /**
     * preload
     **/
    function preload() {
        if (debug) console.log(debugRef,'--------- preload Img');
        intersected = true;

        return new Promise(function(resolve, reject) {
            //replace placeholder with thumbnail
            if ((lazy) || (includeDimensions)) {
                if (debug) console.log(debugRef,'-------------preeeload img', thumb);
                //src = thumb;
                img.ele = new Image();
                img.decoding = 'async';
                img.ele.onload = () => {
                    if (debug) console.log(debugRef,'--------- Img preloaded',lazy);
                    resolve(src);
                    src = thumb;
                    //intersected = true;
                    lazy = false;
                    loader = false;
                    srcsetx = srcset;

                    //get dimensions if required
                    if (includeDimensions) {
                        size = `${img.ele.width}x${img.ele.height}`;
                    }
                    if (imgRef) {
                        dispatchEvent({ action:'imgLoaded', ref:imgRef});
                    }
                }
                img.ele.onerror = reject;
                if (debug) console.log(debugRef,'--------- preloading Img');
                img.ele.src = thumb;
            } else {
                resolve(src);
                loader = false;
                src = thumb;
                lazy = false;
                srcsetx = srcset;
                //intersected = true;
                if (debug) console.log(debugRef,'-------------loaded img',src);
            }
        });
    }

	/**
	 * dispatchEvent
	 * Dispatch event passing option data
	 **/
	function dispatchEvent(options) {
		console.log(`[Dispatch Event][${options.action}]`,options);

		dispatch(options.action, options);
    }
    
	/**
	 * updateCardBgImg
	 **/
	function updateCardBgImg() {
		bgColor(thumb).then((color) => {
            imageBackground = color.main;

            dispatchEvent({ action:'colors', color:color, ref:imgRef });
		});
    }
    
    /**
     * onPinch
     **/
    let initScale = 1;
    let scale = 1;
    let resetPinch = false;
    let imgPos = {};
    let transform = {
        scale:1,
        x: 0,
        y: 0,
        imgPos:{},
        start:false,
        style:{
            //'background-image':`url(${articleImgX1})`
        },
        maskOpacity:0,
    }
    let transformInside = transform;
    function onPinch(ev) {
        transform.start = false;
	    if(ev.type == 'pinchstart') {
            resetPinch = false;
            transform.start = true;
            transform.imgPos = ImgReference.getBoundingClientRect();
            START_X = transform.imgPos.x;
            START_Y = transform.imgPos.y;
            initScale = transform.scale || 1;
            transform.x = START_X;
            transform.y = START_Y;
            const animateImgURL = retina || original || thumb;
            transform.maskOpacity = 0;
            transform.style = {
                'background-image':`url(${animateImgURL})`
            }
        }

        transform.x = START_X + ev.deltaX;
        transform.y = START_Y + ev.deltaY;

        //calculate correct min max scale size
        const scaleSize = (initScale * ev.scale);
        const minScale = 1;
        const maxScale = 3;
        if ((scaleSize > minScale) && (scaleSize <= maxScale)) {
            transform.scale = scaleSize;
        } else {
            transform.scale = (scaleSize <= minScale)?minScale:maxScale;
        }
        transform.maskOpacity = transform.scale/maxScale;

        if (pinchOutside) {
            dispatchEvent({ action:'pinchOutside', transform:transform });
        } else {
            transformInside = transform;
        }
    }

    /**
     * 
     **/
    let START_X = 0;
    let START_Y = 0;
	let translate = {
        x: 0,
        y: 0
    };

    function onPan(ev) {
	    transform.x = START_X + ev.deltaX;
	    transform.y = START_Y + ev.deltaY;
        if (!pinchOutside) {
            transformInside = transform;
        }
        //dispatchEvent({ action:'pinchOutside', transform:transform });
    }
    
    /**
     * 
     **/
    function resetElement() {
	    resetPinch = true;
        transform = {
            scale:1,
            x: 0,
            y: 0,
            imgPos:imgPos,
        }
        if (pinchOutside) {
            dispatchEvent({ action:'pinchOutside', transform:transform, reset:true });
        } else {
            transformInside = transform;
        }
	}

</script>

<style>
img.lazy {
	opacity:0 !important;
    /*filter: blur(10px);*/
}

img {
	opacity:1;
    transition:opacity 0.5s;
	/*transition:opacity 0.5s, 1s filter linear;
    filter: blur(0px);*/
    
}

img.pinch {
    touch-action: pan-y !important;
}


img.semiTransparent {
    opacity:0.4;
}
img.at80 {
    opacity:0.8;
}
.maxHeight {
    height:100%
}
.maxWidth {
    width:100%
}
.maxHeight img {
    min-height:100%
}
.stretch {
    position: absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    /*z-index: 1;*/
}

.stretch img {
  object-fit: cover;
  height:100%;
}
.cover {
  object-fit: cover;
}

.imgEle {
    transition: background 0.2s;
    background-position: center;
    background-color:#ccc;
}
.imgEle.transparentBG {
    background-color:transparent;
}
.imgEle.loader {
    background-color:#ccc;
    background-image: url("/img/anim/loader.gif");
    background-position: center;
    background-repeat:no-repeat;
    background-size: 40px;
}
.resetPinch {
    transition: all 0.3s;
}

/**
    <img decoding="async" />
    dont apply following on virtual list!
**/
._2x2 {
    /*
        --main-width width of container element
        contain-intrinsic-size: min(var(--main-width), maxImgWidth) min(calc(var(--main-width) * ImgRati), maxImgHeight)
    */
    content-visibility: auto;
    contain-intrinsic-size: min(var(--main-width), 1280px) min(calc(var(--main-width) * 0.66640625), 853px);
}
._3x4 {
    content-visibility: auto;
    contain-intrinsic-size: min(var(--main-width), 1280px) min(calc(var(--main-width) * 0.66640625), 853px);
}
._4x3 {
    content-visibility: auto;
    contain-intrinsic-size: min(var(--main-width), 1280px) min(calc(var(--main-width) * 0.66640625), 853px);
}
._16x9 {
    content-visibility: auto;
    contain-intrinsic-size: min(var(--main-width), 1280px) min(calc(var(--main-width) * 0.66640625), 853px);
}
</style>

<div 
    use:tap on:tap bind:this="{node}" 
    class:loader="{((imageBackground === false) && (returnColors === true) && (loader === true))}" 
    class:transparentBG="{!loader}"
    class="imgEle {baseClasses}" 
    style="background:{imageBackground}" 
    class:stretch="{stretchImg}" 
    class:maxHeight="{maxHeight}"
    class:maxWidth="{maxWidth}">
    {#if (isMounted)}
        <img
            width="{width}"
            height="{height}"
            use:press
            on:press="{({ detail }) => { console.log('wwwwweeee presss');/* Press */}}"
            on:pressup="{({ detail }) => { console.log('wwwwweeee pressxs');/* Press Up */}}"
            use:pinch="{{ enable: true }}"
            on:pinchstart|stopPropagation="{({ detail }) => {console.log('pinch start',detail); onPinch(detail)/* Pinch Start */}}"
            on:pinchmove|stopPropagation="{({ detail }) => {console.log('pinch move',detail); onPinch(detail);/* Pinch Move */}}"
            on:pinchend|stopPropagation="{({ detail }) => {console.log('pinch end',detail); resetElement();/* Pinch End */}}"
            draggable="false"
            class:cover="{cover}"
            class:resetPinch="{resetPinch}"
            class:pinch="{enablePinch}"
            bind:this="{ImgReference}"
            class="{classes} gpu_acc"
            style="width: 100%; transform:translate3d({transformInside.x}px,{transformInside.y}px,0) scale({transformInside.scale},{transformInside.scale});"
            src="{src}" 
            srcset="{srcsetx}" 
            alt="{alt}" 
            class:lazy="{(lazy)?'lazy':''}" 
            data-size="{size}"
            />
    {/if}
</div>
