<script>
  import {navigate} from "svelte-routing";

  import AchievementForm from "../../components/AchievementForm.svelte"
  import Button from "../../components/Button.svelte"

  export let id = '';

  const promise = getAchievement();

  async function getAchievement() {
    const res = await fetch(`/achievements/${id}`);
    const {date, id: achId, description, title, type, photos, logo} = await res.json();
    return {
      id: achId,
      date: new Date(date).toISOString().substring(0, 10),
      desc: description,
      title,
      type,
      logo,
      photos
    };
  }

  function onSubmit(formData) {
      fetch(`/achievements/${id}`, {
        method: "put",
        credentials: 'same-origin',
        body: formData
      })
              .then(() => navigate("/"));
  }
</script>

<main class="edit-achievement">
  {#await promise}
    <p>...waiting</p>
  {:then achievement}
    <AchievementForm onSubmit={onSubmit} {...achievement}/>
  {:catch error}
    <p style="color: red">Error occurred in data loading.</p>
  {/await}
  <Button href="/">Back</Button>
</main>

<style>
  .edit-achievement {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>