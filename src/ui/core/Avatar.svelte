<script>

    export let profileImg = '';
    export let classes = '';
    export let margin = '';
    export let size = 'large';
    export let hasBorder = true;
    export let width = false;
    export let height = false;

    $: updatedProfileImg = profileImg;

    switch(size) {
        case 'microFlag':
            width="26";
            height="26";
            break;
        case 'small':
            width="40";
            height="40";
            break;
        case 'thumbnail':
            width="70";
            height="70";
            break;
        case 'medium':
            width="90";
            height="90";
            break;
        case 'large':
            width="120";
            height="120";
            break;
    }
</script>

<style>
    .hasBorder {
 	    box-shadow: 0px 0px 0px 4px var(--bg-input-login);
    }
    .microFlag.hasBorder {
 	    box-shadow: 0px 0px 0px 2px var(--bg-input-login);
    }
    .inputWrapped {
        width:34px;
        height:34px;
    }
    .microFlag {
        width:26px;
        height:26px;
        position: absolute;
        z-index: 10;
        top:-6px;
        left:-6px;
    }
    .small {
        width:40px;
        height:40px;
    }

    .thumbnail {
        width:70px;
        height:70px;
    }

    .medium {
        width:90px;
        height:90px;
    }

    .large {
        width:120px;
        height:120px;
    }

    .centerAbsolute {
        position: absolute;
        left: 50%;
    }

	.profileAvatar {
		background-image:url("/img/profile-option1.svg");
		background-repeat: no-repeat;
		background-position: center;
		background-size:cover;
		border-radius:400px;
	}

	.profileAvatar img {
		border-radius:400px;
		width:100%;
		height:100%;
	}
</style>

<div class="profileAvatar {classes} {size}" class:hasBorder="{hasBorder}" style="margin:{margin};" on:click>
    <!--<img class="lazy" src="2x2.gif" data-src="{social.getProfilePicByID($sUser.profile.oce.id)}" data-srcset="{social.getProfilePicByID($sUser.profile.oce.id)} 2x, {social.getProfilePicByID($sUser.profile.oce.id)} 1x" alt="" />-->
    {#if (updatedProfileImg)}
    <img src="{updatedProfileImg}" width="{width}" height="{height}" alt="" />
    {/if}
    <!--<img src="{$sPeople.profilePhoto[$sUser.profile.oce.id].img}" alt="" />-->
</div>