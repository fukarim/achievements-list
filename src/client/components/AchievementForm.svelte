<script>
  import {onMount} from 'svelte';
  import Button from "../components/Button.svelte"

  export let logo;
  export let photos;
  export let title = '';
  export let desc = '';
  export let id = '';
  export let date;
  export let type;
  export let onSubmit = () => {
  };
  // export let date = new Date('Wed Jun 19 2019 18:43:00 GMT+0300 (Москва, стандартное время)').toISOString().substring(0, 10);

  let logoImage;
  let photoImages = [];

  function onLogoChange(event) {
    if (!event.target) {
      return;
    }

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        logoImage = e.target.result
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function onPhotosChange(event) {
    if (event.target.files && event.target.files[0]) {
      Array.from(event.target.files).map(file => {
        const reader = new FileReader();

        reader.onload = function (e) {
          photoImages = [...photoImages, {url: e.target.result, file}]
        };

        reader.readAsDataURL(file);
      })
    }
  }

  function onFormSubmit() {
    const formData = new FormData();
    formData.delete('photos');
    photoImages.map(img => {
      formData.append('photos', img.file)
    });

    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('id', id);
    formData.append('type', type);

    if (date) {
      formData.append('date', date);
    }

    if (!logoImage) {
      formData.delete('logo');
    }

    onSubmit(formData);
  }

  function onPhotoRemove(photoImage) {
    photoImages = photoImages.filter(img => img.url !== photoImage.url)
  }

  function onLogoRemove() {
    logoImage = null
  }
</script>

<form class="achievement-form" on:submit|preventDefault={onFormSubmit} encType="multipart/form-data">
  <label>
    Название: <input type="text" name="title" bind:value={title}>
  </label>
  <label>
    Описание:<br/>
    <textarea name="desc" bind:value={desc}></textarea>
  </label>
  <label>
    ID: <input type="text" name="id" bind:value={id}>
  </label>
  {#if logoImage}
    <div class="achievement-form--image-container">
      <img src={logoImage} alt="logo-image" class="achievement-form--image"/>
      <span class="achievement-form--remove-image" on:click={onLogoRemove}>&times;</span>
    </div>
  {/if}
  <label>
    Logo: <input type="file" name="logo" on:change={onLogoChange}/>
  </label>

  {#each photoImages as photoImage, i}
    <div class="achievement-form--image-container">
      <img src={photoImage.url} alt={`photo-image-${i}`} class="achievement-form--image"/>
      <span class="achievement-form--remove-image" on:click={() => onPhotoRemove(photoImage)}>&times;</span>
    </div>
  {/each}
  <label>
    Photos: <input type="file" name="photos" multiple on:change={onPhotosChange}/>
  </label>
  <label>
    Дата: <input type="date" name="date" bind:value={date}>
  </label>

  <label>
    Тип:
    <select name="type" bind:value={type}>
      <option value="0" selected>Бронза</option>
      <option value="1">Серебро</option>
      <option value="2">Золото</option>
      <option value="3">Платина</option>
    </select>
  </label>

  <Button onClick={onFormSubmit}>Отправить</Button>
</form>

<style>
  .achievement-form {
    min-width: 800px;
    width: 50%;
    margin: 20px;
    padding: 10px;
    box-shadow: 0 0 1px 0 black;
  }

  .achievement-form--image-container {
    display: inline-block;
    margin: 10px;
    position: relative;
  }

  .achievement-form--image {
    height: 5vw;
    width: 5vw;
    min-width: 100px;
    min-height: 100px;
    object-fit: cover;
  }

  .achievement-form--remove-image {
    color: darkred;
    font-size: 20px;
    padding: 0;
    line-height: 20px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
  }

  .achievement-form--remove-image:hover,
  .achievement-form--remove-image:focus {
    color: red;
    text-decoration: none;
    cursor: pointer;
  }
</style>