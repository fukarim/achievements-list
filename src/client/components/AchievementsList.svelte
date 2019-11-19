<script>
    import { navigate } from "svelte-routing";

    import Modal from './Modal.svelte';
    import AchievementDetails from './AchievementDetails.svelte';
    import Unlock from './icons/Unlock.svelte';
    import Button from './Button.svelte';

    export let list = [];
    let currentAchievement = {};
    let isOpen = false;
    let currentAchievementIndex = 0;

    const DEFAULT_LOGO = "logo-placeholder.png";

    function formatDate(dateString) {
        if (!dateString) {
            return "-";
        }
        const date = new Date(dateString);

        if (date.toString() === "Invalid Date") {
          return "-";
        }

        return date.toLocaleString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    function getItemClasses(achievement) {
        const mainClass = "achievement-list__item";
        const classesMap = {
            0: "achievement-list__item--bronze",
            1: "achievement-list__item--silver",
            2: "achievement-list__item--gold",
            3: "achievement-list__item--brilliant"
        };

        return [mainClass, classesMap[achievement.type], ...!achievement.unlocked ? ["achievement-list__item--locked"] : []].join(" ")
    }

    function onClickPrev() {
        if (currentAchievementIndex === 0) {
            return false;
        }
        // TODO: show only unlocked
        currentAchievementIndex -= 1;
        currentAchievement = list[currentAchievementIndex]
    }

    function onClickNext() {
        if (currentAchievementIndex === list.length - 1) {
            return false;
        }
        // TODO: show only unlocked
        currentAchievementIndex += 1;
        currentAchievement = list[currentAchievementIndex]
    }

    function onClickAchievement(achievement, index) {
        if (!achievement.unlocked) {
            return false;
        }
        isOpen = true;
        currentAchievementIndex = index;
        currentAchievement = achievement
    }

    function onClickUnlock(achievementUid) {
        // TODO: extract fetch
        fetch(`/achievements/${achievementUid}`, {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                unlocked: true,
                date: new Date()
            })
        }).then(() => {
            // TODO: do it in more proper way
            location.reload()
        });
    }

    function onClickDelete() {
        fetch(`/achievements/${currentAchievement.id}`, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
        }).then(() => {
            // TODO: do it in more proper way
            location.reload()
        });
    }

    function onClickEdit() {
        navigate(`/edit/${currentAchievement.id}`)
    }
</script>

<ul class="achievement-list">
    {#each list as achievement, index}
        <li class={getItemClasses(achievement)} on:click={() => onClickAchievement(achievement, index)}>
            <img class="achievement__logo" src={achievement.logo || DEFAULT_LOGO} alt={`${achievement.title} иконка`}>
            <div>
                <div class="achievement__title">{achievement.title}</div>
                <div class="achievement__date">{formatDate(achievement.date)}</div>
            </div>
            {#if !achievement.unlocked}
                <button class="achievement__unlock" on:click={() => onClickUnlock(achievement.id)}><Unlock width="20px" height="20px"/></button>
            {/if}
        </li>
    {/each}
</ul>

<!-- TODO: create a component for modal content ?-->
<Modal isOpen={isOpen} onClose={() => isOpen = false}>
    <Button onClick={onClickEdit}>Edit</Button>
    <!--TODO Add danger styles to button-->
    <Button onClick={onClickDelete}>Remove</Button>

    <!--TODO: wrap to button
        create a component
        add hover area around an arrow
        add keyboard arrow handlers
        add disabled state-->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="achievement__prev" on:click={onClickPrev}>
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/>
    </svg>

    <AchievementDetails achievement={currentAchievement} />

    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="achievement__next"
         on:click={onClickNext}>
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/>
    </svg>
</Modal>

<style>
    .achievement-list {
        list-style: none;
    }

    .achievement-list__item {
        display: flex;
        align-items: center;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        margin-top: 20px;
        max-width: 50%;
        background-color: white;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
    }

    .achievement-list__item--locked {
        background-color: #cccccc;
        color: #666666;
        cursor: auto;
    }

    .achievement-list__item--bronze {
        border: 3px solid #cd7f32;
    }

    .achievement-list__item--silver {
        border: 3px solid silver;
    }

    .achievement-list__item--gold {
        border: 3px solid gold;
    }

    .achievement-list__item--brilliant {
        border: 3px solid #B9F2FF;
    }

    .achievement__logo {
        width: 110px;
        height: 110px;
        margin: 10px;
        object-fit: cover;
    }

    .achievement__date {
        font-size: 0.9rem;
        color: grey;
    }

    .achievement__unlock {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 10px;
        right: 10px;
        display: block;
        padding: 0;
        cursor: pointer;
        background: transparent;
        opacity: 0.6;
    }

    .achievement__unlock:hover {
        opacity: 1;
    }

    .achievement-details {
        padding: 0 50px;
    }

    .achievement-details__title {
        alignment: center;
    }

    .achievement__prev,
    .achievement__next {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50%;
        cursor: pointer;
        fill: #aaaaaa;
    }

    .achievement__next {
        right: 0;
    }

    .achievement__prev:hover,
    .achievement__next:hover {
        fill: #000;
        cursor: pointer;
    }

</style>

