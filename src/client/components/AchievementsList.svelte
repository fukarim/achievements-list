<script>
    import Modal from './Modal.svelte';
    import AchievementDetails from './AchievementDetails.svelte';

    export let list = [];
    let currentAchievement = {};
    let isOpen = false;
    let currentAchievementIndex = 0;

    const DEFAULT_LOGO = "logo-placeholder.png";

    function formatDate(dateTest) {
        const date = new Date(dateTest);

        if (date.toString() === "Invalid Date") {
          return "";
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
        currentAchievementIndex -= 1;
        currentAchievement = list[currentAchievementIndex]
    }

    function onClickNext() {
        if (currentAchievementIndex === list.length - 1) {
            return false;
        }
        currentAchievementIndex += 1;
        currentAchievement = list[currentAchievementIndex]
    }
</script>

<ul class="achievement-list">
    {#each list as achievement, index}
        <li class={getItemClasses(achievement)} on:click={() => {isOpen = true; currentAchievementIndex = index; currentAchievement = achievement}}>
            <img class="achievement__logo" src={achievement.logo || DEFAULT_LOGO} alt={`${achievement.title} иконка`}>
            <div>
                <div class="achievement__title">{achievement.title}</div>
                <div class="achievement__date">{formatDate(achievement.date)}</div>
            </div>
        </li>
    {/each}
</ul>

<!-- TODO: create a component for modal content ?-->
<Modal isOpen={isOpen} onClose={() => isOpen = false}>

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
    }

    .achievement-list__item--locked {
        background-color: #cccccc;
        color: #666666;
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

