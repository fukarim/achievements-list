<script>
  import { navigate } from "svelte-routing";

  let form, logoImage;
  let photoImages = [];

  function onLogoChange(event) {
    if (!event.target) {
      return;
    }

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function(e) {
        logoImage = e.target.result
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function onPhotosChange(event) {
    photoImages = [];

    if (event.target.files && event.target.files[0]) {
      Array.from(event.target.files).map(file => {
        const reader = new FileReader();

        reader.onload = function(e) {
          photoImages = [...photoImages, e.target.result]
        };

        reader.readAsDataURL(file);
      })
    }
  }

  function onSubmit(event) {

    const formData = new FormData(form);

    fetch("/achievements", {
      method: "post",
      credentials: 'same-origin',
      body: formData
    })
            .then(() => navigate("/"))
            .catch(err => console.log(err));

    event.preventDefault();
  }

</script>

<style>
  .add-achievement {
    display: flex;
    justify-content: center;
  }

  .add-achievement__form {
    min-width: 800px;
    width: 50%;
    margin: 20px;
    padding: 10px;
    box-shadow: 0 0 1px 0 black;
  }
</style>

<main class="add-achievement">
  <form  class="add-achievement__form" on:submit={onSubmit} encType="multipart/form-data" bind:this={form}>
    <label>
      Название: <input type="text" name="title">
    </label>
    <label>
      Описание:<br />
      <textarea name="desc"></textarea>
    </label>
    <label>
      ID: <input type="text" name="id">
    </label>
    <label>
      {#if logoImage}
        <img src={logoImage} alt="logo-image" />
      {/if} Logo: <input type="file" name="logo" on:change={onLogoChange}/>
    </label>

    {#each photoImages as photoImage, i}
      <img src={photoImage} alt={`photo-image-${i}`} />
    {/each}
    <label>
      Photos: <input type="file" name="photos" multiple on:change={onPhotosChange}/>
    </label>
    <!-- add photos -->
    <label>
      Дата: <input type="date" name="date">
    </label>

    <select name="type">
      <option value="0" selected>Бронза</option>
      <option value="1">Серебро</option>
      <option value="2">Золото</option>
      <option value="3">Платина</option>
    </select>

    <button type="submit" on:submit={onSubmit}>Отправить</button>
  </form>
</main>