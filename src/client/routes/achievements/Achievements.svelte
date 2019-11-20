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

<div class="add-achievement-button-wrapper">
    <Button href="add">Добавить достижение</Button>
</div>
<AchievementsList list={list} />

<style>
    .add-achievement-button-wrapper {
        position: fixed;
        right: 20px;
        top: 20px;
    }
</style>

