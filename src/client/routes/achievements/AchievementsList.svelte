<script>
    import Modal from '../../components/Modal.svelte';
    import AchievementDetails from './AchievementDetails.svelte';
    import Unlock from '../../components/icons/Unlock.svelte';
    import Button from '../../components/Button.svelte';

    export let list = [];
    export let reloadData = () => {};
    let isOpen = false;
    let currentAchievementIndex = 0;

    const DEFAULT_LOGO = "logo-placeholder.png";

    $: isFirstUnlockedAchievement = currentAchievementIndex === 0 || getPrevUnlockedIndex() === -1;
    $: isLastUnlockedAchievement = currentAchievementIndex === list.length - 1 || getNextUnlockedIndex() === -1;

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

    function onClickPrev() {
        const prevAchievementIndex = getPrevUnlockedIndex();
        if (prevAchievementIndex === -1) {
            return false;
        }
        currentAchievementIndex = prevAchievementIndex;
    }

    function getPrevUnlockedIndex() {
        let achievementIndex = currentAchievementIndex - 1;

        while (achievementIndex >= 0) {
            if (list[achievementIndex].unlocked) {
                return achievementIndex
            }
            achievementIndex--;
        }

        return -1;
    }

    function onClickNext() {
        const nextAchievementIndex = getNextUnlockedIndex();

        if (nextAchievementIndex === -1) {
            return false;
        }
        currentAchievementIndex = nextAchievementIndex;
    }

    function getNextUnlockedIndex() {
        let achievementIndex = currentAchievementIndex + 1;

        while (achievementIndex < list.length) {
            if (list[achievementIndex].unlocked) {
                return achievementIndex
            }
            achievementIndex++;
        }

        return -1;
    }

    function onClickAchievement(achievement, index) {
        if (!achievement.unlocked) {
            return false;
        }
        isOpen = true;
        currentAchievementIndex = index;
    }

    function onClickUnlock(achievementUid) {
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
            reloadData()
        });
    }

    function onClickDelete() {
        fetch(`/achievements/${list[currentAchievementIndex].id}`, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
        }).then(() => {
            reloadData()
        });
    }
</script>

<ul class="achievement-list">
    {#each list as achievement, index}
        <li class="achievement-list__item"
            class:achievement-list__item--bronze={achievement.type === "0"}
            class:achievement-list__item--silver={achievement.type === "1"}
            class:achievement-list__item--gold={achievement.type === "2"}
            class:achievement-list__item--brilliant={achievement.type === "3"}
            class:achievement-list__item--locked={!achievement.unlocked}
            on:click={() => onClickAchievement(achievement, index)}
        >
            <img class="achievement__logo" src={achievement.logo || DEFAULT_LOGO} alt={`${achievement.title} icon`}>
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

<Modal isOpen={isOpen} onClose={() => isOpen = false}>
    <Button href={`/edit/${list[currentAchievementIndex].id}`}>Edit</Button>
    <Button on:click={onClickDelete}>Remove</Button>

    <button class="achievement__button achievement__button--prev" on:click={onClickPrev} disabled={isFirstUnlockedAchievement}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/>
        </svg>
    </button>

    <AchievementDetails achievement={list[currentAchievementIndex]} />

    <button on:click={onClickNext} class="achievement__button achievement__button--next" disabled={isLastUnlockedAchievement}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/>
        </svg>
    </button>
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

    .achievement__button {
        position: absolute;
        top: 50%;
        background-color: transparent;
        border: 0;
        cursor: pointer;
    }

    .achievement__button:disabled {
        cursor: auto;
    }

    .achievement__button:hover svg {
        fill: #000;
    }

    .achievement__button:disabled svg {
        fill: #cccccc;
    }

    .achievement__button svg {
        width: 50px;
        height: 50px;
        fill: #aaaaaa;
    }

    .achievement__button--next {
        right: 0;
    }
    .achievement__button--prev {
        left: 0;
    }

</style>

