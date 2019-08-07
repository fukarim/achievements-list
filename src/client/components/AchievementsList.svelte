<script>
    export let list;

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
</script>

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

    }

    .achievement-list__item--locked {
        border: 1px solid #999999;
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
    }

    .achievement__date {
        font-size: 0.9rem;
        color: grey;
    }
</style>

<ul class="achievement-list">
    {#each list as achievement}
        <li class={getItemClasses(achievement)}>
            <img class="achievement__logo" src={achievement.logo || DEFAULT_LOGO} alt={`${achievement.title} иконка`}>
            <div>
                <div class="achievement__title">{achievement.title}</div>
                <div class="achievement__date">{formatDate(achievement.date)}</div>
            </div>
        </li>
    {/each}
</ul>

