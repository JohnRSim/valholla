<script>
	// svelte
    import { onDestroy, onMount, createEventDispatcher } from 'svelte';


    const dispatch = createEventDispatcher();
    
    //import { Player, Boot, FileProvider } from '@vime-js/complete';
//import { VimePlayer } from '@vime/svelte';
    export let videoURL = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4';
    export let playButton = '';
    export let showPlayButton = true;
    //export let autoplay = true;
    export let muted = false;
    export let showVideoOnLoad = false;
    export let poster = '/16x9.gif';
    export let ui = 'default';
    export let duration = false; 
    export let title = 'Diageo'; 
    export let artist = 'Diageo'; 
    export let album = '23/01/2021'; 
    export let autoplay = false;

    //console.log('--------',muted);
    let vmPlayer;

    onMount(() => {
        /*const player = document.querySelector('vime-player');
        player.addEventListener('vmTouchChange', (event) => {
            console.log('xxxx',event);
        });*/
    });

    onDestroy(() => {
        if (process.browser) {
            //clears android media session overlay
            if ((vmPlayer) && (vmPlayer.querySelector('video'))) {
                vmPlayer.querySelector('video').src='';
            }
            autoplay=false;
        }
    });

    /**
     * 
     **/
    function play() {
        //console.log('???????????????????????????????????????????')
        navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: artist,
            album: album,
            artwork: [
                { src: poster, sizes: '512x512', type: 'image/png' }
            ]
        });
        showPlayButton = false;
        setTimeout(()=> {
            //const player = document.querySelector('vm-player');
            vmPlayer.addEventListener('vmSeekingChange', (event) => {
                console.log('seeking',event.detail);
                dispatchEvent({ action:'seeking' });

            });
            vmPlayer.addEventListener('vmSeeked', (event) => {
                console.log('seeked',event.detail);
                dispatchEvent({ action:'seeked' });
            }); 

        },10)
    }

    
	/**
	 * dispatchEvent
	 * Dispatch event passing option data
	 **/
	function dispatchEvent(options) {
		console.log(`[Dispatch Event][${options.action}]`,options);

		dispatch(options.action, options);
	}


</script>

<style>
.mediaWrapper {
    display: flex;
    align-items: center;
    z-index: 10;
    flex:1;
	position: absolute;
    top: 0px;
    right: 0x;
    left: 0px;
    right: 0px;
    bottom: 0px;
}
.playButton {
	border:0px;
	background-color:transparent;
	background-image: url("/img/play-button.svg");
	background-repeat: no-repeat;
	background-size: cover;
	width:80px;
	height:80px;
	cursor: pointer;
    position: absolute;
    z-index: 100;
    left: 50%;
    margin-left: -40px;
}


.playIco {
    background-image: url("/img/ico_play.svg");
    /*background-size:54px;*/
    background-size:30px;
    background-repeat: no-repeat;
    background-position:center;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #fff;
    border-radius: 45px;
    box-shadow: 0 4px 6px 0 rgba(50, 50, 50, 0.25);
    z-index: 3;
}
.duration {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
    z-index:3;
    background:#323232;
    opacity:0.7;
    min-height:30px;
    line-height:30px;
    border-radius:60px;
    padding: 0px 10px;
    font-size:0.875em;
}

.playButton.transparent {
    background:transparent;
    width: 100%;
    height:100%;
    margin:0px;
    left:0;
}
:global(.hidden) {
    display:none !important;
}

    .playIco {
        background-image: url("/img/ico_play.svg");
        /*background-size:54px;*/
        background-size:30px;
        background-repeat: no-repeat;
        background-position:center;
        width: 50px;
        height: 50px;
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #fff;
        border-radius: 45px;
        box-shadow: 0 4px 6px 0 rgba(50, 50, 50, 0.25);
        z-index: 3;
    }
    .duration {
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: #fff;
        z-index:3;
        background:#323232;
        opacity:0.7;
        min-height:30px;
        line-height:30px;
        border-radius:60px;
        padding: 0px 10px;
        font-size:0.875em;
    }
    
	:global([dir="rtl"] .playIco) {
        left:10px;
        right:unset !important;
	}
	:global([dir="rtl"] .duration) {
        left:unset !important;
        right:10px;
	}
    .playIcoWrapper {
        width:100%;
        height:100%;
    }
</style>

<div class="max mediaWrapper">
    {#if ((showPlayButton) && (!showVideoOnLoad))}
    <div on:click|stopPropagation="{() => { play() }}" class="playIcoWrapper">
        {#if (ui === 'default')}
            <div class="playIco"></div>
            <!-- Overlay -->
            {#if (duration)}
            <div class="duration">
                {duration}
            </div>
            {/if}
            <!-- xOverlay -->
        {:else}
        <button class="playButton {playButton}" class:hidden="{!showPlayButton}"></button>
        {/if}
    </div>
    {/if}
    <!--<Player
        class="max {hideCSS}"
        src="{videoURL}"
        plugins={[Boot]}
        providers={[FileProvider]}
        on:mount={onPlayerMount}
        bind:this={player}  />-->
    {#if ((!showPlayButton) || (showVideoOnLoad))}
    <vm-player
		bind:this={vmPlayer}
        autoplay="{autoplay}"
        style="width:100%"

        muted="{muted}">

        <vm-video poster="{poster}" preload="auto">
            <source 
                data-src="{videoURL}" 
                type="video/mp4" 
            />
        </vm-video>

        <!-- Loads the default Vime UI. -->
        <vm-default-ui  no-settings no-skeleton />
        
        <vm-ui>
            <!-- ... -->
            <vm-controls pin="topRight">
            <!-- ... -->
              <vm-pip-control></vm-pip-control>
            </vm-controls>
        </vm-ui>
    </vm-player>
    {/if}
</div>