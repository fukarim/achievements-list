<script>
    import { Router, Route } from "svelte-routing";
    import Achievements from './routes/achievements/index.svelte';
    import Add from './routes/add/index.svelte';

    export let url = "";
</script>

<Router url="{url}">
    <Route path="add" component="{Add}" />
    <Route path="/" component="{Achievements}" />
</Router>