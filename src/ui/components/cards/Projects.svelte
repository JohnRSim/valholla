<script>
	//svelte
    import { onMount, createEventDispatcher, tick } from 'svelte';

    //components

    export let enableObserver = false;
    export let classes = false;
    export let projectID = '12345';

    //
    let node;
    let intersected = false;
    
    //
    let isMounted = false;

    //intersect detection enable preload of image
    async function onIntersect(entries){
        if (entries[0].isIntersecting) {
            //enable intersect
            intersected = true;
            observer.unobserve(node);
            observer = null;

            await tick();
        }
    }  
    

    //mount observers
	onMount(async () => {

        isMounted = true;
        //
        if (enableObserver) {
            await tick();
            observer = new IntersectionObserver(onIntersect,{rootMargin, root, threshold});
            observer.observe(node);
            return {
                destroy() {
                    observer.unobserve(node);
                }
            }
        } else {
            intersected = true;
        }
        
        return {
            destroy() {
                observer.unobserve(node);
            }
        }
    });

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
	article.card {
		background:#242927;
		border-radius: 10px;
		min-height:60px;
		margin:20px 0px 40px;
		padding-left:18px;
		position: relative;
        padding:0px;
	}
    article.card header {
        display: flex;
        flex-direction: row;
        padding: 15px 15px 10px;
        z-index: 10;
        position: relative;
    }

    article.card figure {
        margin:0px;
        padding:0px;
        display: flex;
        flex-direction: column;
        width:100%;
    }

    article.card figcaption {
        /*flex:1;
        display: flex;
        flex-direction: column;*/
        padding: 0 15px 10px 15px;
        color:#323232;
        font-size:0.875em;
		line-height:1.36;
        word-break: break-word;
    }

    .projectIco{
        border-radius: 50%;
        border:solid 4px #fff;
        background:#000;
        margin-bottom:-40px;
        width:58px;
        height:58px;
    }

    .mainImg {
        position:relative;
        /*padding-top: 75%;*//*4x3*/
        padding-top:56.25%;/*16x9*/
    }

    .overlayTxt {
        position: absolute;
        /*bottom: 15px;
        left: 20px;
        right:20px;*/
        bottom: 0px;
        left: 0px;
        right:0px;
        padding: 15px 20px;
        z-index:1;
        pointer-events: none;
        background:rgba(0,0,0,0.85);
    }

    .stretch {
        position: absolute;
        top:0px;
        left:0px;
        right:0px;
        bottom:0px;
        width: 100%;
        height: 100%;
        overflow: cco;
        object-fit: cover;
        /*z-index: 1;*/
    }
</style>

<!-- Article Card -->
{#if (isMounted)}
<article bind:this="{node}" class:intersected="{intersected}" class="card {classes}">
    
    <!-- Header -->
	<header on:click|stopPropagation="{() => { dispatchEvent({ action:'navto', id:projectID, }); }}">
		<!-- project Logo -->
		<div>
			<div class="projectIco">
                
			</div>
		</div>
		<!-- xproject Logo -->

		<div class="post">

		</div>

	</header>
	<!-- xHeader -->

    <!-- Body -->
    <figure>
        <div class="mainImg">
             <!-- Overlay -->
            <div class="overlayTxt">
            etst
            </div>
            <!-- xOverlay -->

            <img class="stretch" src="/tmp/banner.png" alt="" />
        </div>

        
        <figcaption dir="auto">
        ttes
        </figcaption>
    </figure>
    <!-- Body -->

    <!-- Footer -
    <ProjectCounter 
        on:toggleLike="{(e) => { dispatchEvent(e.detail); }}"
        totalLikes="{totalLikes}"
        totalComments="{totalComments}"
        contentID="{contentID}"
        contentType="article"
        contentTitle="{title}"
        userHasLiked="{userHasLiked}"
        />
    -- xFooter -->
</article>
{/if}
<!-- xArticle Card -->