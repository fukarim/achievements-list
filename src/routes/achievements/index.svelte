<script context="module">
    export function preload({ params, query }) {
        return this.fetch(`achievements.json`).then(r => r.json()).then(list => {
            return { list };
        });
    }
</script>

<script>
    import AchievementsList from '../../components/AchievementsList.svelte';

    export let list;
</script>

<svelte:head>
    <title>Achievements list</title>
</svelte:head>

<a href="add">Добавить достижение</a>
<AchievementsList list={list} />

