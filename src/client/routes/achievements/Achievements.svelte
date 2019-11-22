<script>
    import Button from '../../components/Button.svelte';
    import AchievementsList from './AchievementsList.svelte';

    async function getAchievementsList() {
        const res = await fetch(`/achievements`);
        return  res.json();
    }
    let promise;

    function loadData() {
        promise = getAchievementsList()
    }
    loadData();
</script>

<svelte:head>
    <title>Achievements list</title>
</svelte:head>

<div class="add-achievement-button-wrapper">
    <Button href="add">Добавить достижение</Button>
</div>

{#await promise}
    <p>...waiting</p>
{:then list}
    <AchievementsList list={list} reloadData={loadData} />
{:catch error}
    <p style="color: red">Error occurred in data loading.</p>
{/await}

<style>
    .add-achievement-button-wrapper {
        position: fixed;
        right: 20px;
        top: 20px;
    }
</style>

