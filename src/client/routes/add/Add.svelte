<script>
  import {navigate} from "svelte-routing";
  import AchievementForm from "../../components/AchievementForm.svelte"
  import Button from "../../components/Button.svelte"

  function onSubmit(formData) {
    fetch("/achievements", {
      method: "post",
      credentials: 'same-origin',
      body: formData
    })
      .then(() => navigate("/"))
  }
</script>

<main class="add-achievement">
  <AchievementForm onSubmit={onSubmit} />

  <Button href="/">Back</Button>
</main>

<style>
  .add-achievement {
    min-height: 80vh;
    margin: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>