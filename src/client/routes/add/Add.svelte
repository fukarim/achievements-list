<script>
  import { navigate } from "svelte-routing";
  import AchievementForm from "../../components/AchievementForm.svelte"
  import Button from "../../components/Button.svelte"


  function onSubmit(formData) {
    fetch("/achievements", {
      method: "post",
      credentials: 'same-origin',
      body: formData
    })
            .then(() => navigate("/"))
            .catch(err => console.log(err));
  }
</script>

<main class="add-achievement">
  <AchievementForm onSubmit={onSubmit} />

  <Button href="/" className="add-achievement__back-btn">Back</Button>
</main>

<style>
  .add-achievement {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>