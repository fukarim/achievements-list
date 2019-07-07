<script>
    import { onMount } from 'svelte';
    import {Link} from "svelte-routing";

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

<Link to="add">Добавить достижение</Link>
<AchievementsList list={list} />

