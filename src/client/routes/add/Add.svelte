<script>
  import { navigate } from "svelte-routing";
  import Button from "../../components/Button.svelte"

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
    if (event.target.files && event.target.files[0]) {
      Array.from(event.target.files).map(file => {
        const reader = new FileReader();

        reader.onload = function(e) {
          photoImages = [...photoImages, {url: e.target.result, file}]
        };

        reader.readAsDataURL(file);
      })
    }
  }

  function onSubmit(event) {

    const formData = new FormData(form);
    formData.delete('photos');
    photoImages.map(img => {
      formData.append('photos',  img.file)
    });

    if (!logoImage) {
      formData.delete('logo');
    }

    fetch("/achievements", {
      method: "post",
      credentials: 'same-origin',
      body: formData
    })
            .then(() => navigate("/"))
            .catch(err => console.log(err));

    event.preventDefault();
  }

  function onPhotoRemove(photoImage) {
    photoImages = photoImages.filter(img => img.url !== photoImage.url)
  }

  function onLogoRemove() {
    logoImage = null
  }

</script>

<style>
  .add-achievement {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .add-achievement__form {
    min-width: 800px;
    width: 50%;
    margin: 20px;
    padding: 10px;
    box-shadow: 0 0 1px 0 black;
  }

  .add-achievement--image-container {
    display: inline-block;
    margin: 10px;
    position: relative;
  }

  .add-achievement--image {
    height: 5vw;
    width: 5vw;
    min-width: 100px;
    min-height: 100px;
    object-fit: cover;
  }

  .add-achievement--remove-image {
    color: darkred;
    font-size: 20px;
    padding: 0;
    line-height: 20px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
  }

  .add-achievement--remove-image:hover,
  .add-achievement--remove-image:focus {
    color: red;
    text-decoration: none;
    cursor: pointer;
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
    {#if logoImage}
    <div class="add-achievement--image-container">
      <img src={logoImage} alt="logo-image" class="add-achievement--image" />
      <span class="add-achievement--remove-image" on:click={onLogoRemove}>&times;</span>
    </div>
    {/if}
    <label>
      Logo: <input type="file" name="logo" on:change={onLogoChange}/>
    </label>

    {#each photoImages as photoImage, i}
      <div class="add-achievement--image-container">
        <img src={photoImage.url} alt={`photo-image-${i}`} class="add-achievement--image"/>
        <span class="add-achievement--remove-image" on:click={() => onPhotoRemove(photoImage)}>&times;</span>
      </div>
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

  <Button href="/" className="add-achievement__back-btn">Back</Button>
</main>