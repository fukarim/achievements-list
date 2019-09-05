<script>
    import { onMount } from 'svelte';

    import Button from '../../components/Button.svelte';
    import AchievementsList from '../../components/AchievementsList.svelte';

    let list = [];

    onMount(async () => {
        const res = await fetch(`/achievements`);
        list = await res.json();
    });
</script>

<svelte:head>
    <title>Achievements list</title>
</svelte:head>

<Button href="add" className="add-achievement-button">Добавить достижение</Button>
<AchievementsList list={list} />

<style>
    /* hack need for passing styles  https://github.com/sveltejs/svelte/issues/2870*/
    :global(.add-achievement-button) {
        position: fixed;
        right: 20px;
        top: 20px;
    }
</style>

