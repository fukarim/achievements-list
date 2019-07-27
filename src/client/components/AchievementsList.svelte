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
</script>

<style>
    .achievement-list {
        list-style: none;
    }

    .achievement {
        display: flex;
        align-items: center;
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
        <li class="achievement-list__item achievement">
            <img class="achievement__logo" src={achievement.logo || DEFAULT_LOGO} alt={`${achievement.title} иконка`}>
            <div>
                <div class="achievement__title">{achievement.title}</div>
                <div class="achievement__date">{formatDate(achievement.date)}</div>
            </div>
        </li>
    {/each}
</ul>

