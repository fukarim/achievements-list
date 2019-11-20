<script>
  import {onMount} from 'svelte';

  import Button from "./Button.svelte";
  import loadFile from '../utils/loadFile';

  export let logo;
  export let photos;
  export let title = '';
  export let desc = '';
  export let date;
  export let type;
  export let onSubmit = () => {};

  onMount(async () => {
    if (logo) {
      logoImage = await fetchPhoto(logo);
    }

    if (photos && photos.length) {
      photoImages = await Promise.all(photos.map(photo => fetchPhoto(photo)));
    }
  });

  async function fetchPhoto(photo) {
    const absolutePath = photo.startsWith("/") ? photo : `/${photo}`;
    const response = await fetch(absolutePath);
    const blob = await response.blob();

    return loadFile(blob)
  }

  let logoImage;
  let photoImages = [];

  function onLogoChange(event) {
    if (!event.target) {
      return;
    }

    if (event.target.files && event.target.files[0]) {
      loadFile(event.target.files[0]).then(img => logoImage = img);
    }
  }

  function onPhotosChange(event) {
    if (event.target.files && event.target.files[0]) {
      Array.from(event.target.files).map(file => {
        loadFile(file).then(newPhoto => photoImages = [...photoImages, newPhoto]);
      })
    }
  }

  function onFormSubmit() {
    const formData = new FormData();
    photoImages.map(img => {
      formData.append('photos', img.file)
    });

    formData.append('title', title);
    formData.append('description', desc);
    formData.append('type', type);

    if (date) {
      formData.append('date', date);
    }

    if (logoImage) {
      formData.append('logo', logoImage.file)
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
  {#if logoImage}
    <div class="achievement-form--image-container">
      <img src={logoImage.url} alt="Logo image" class="achievement-form--image"/>
      <button class="achievement-form--remove-image" on:click={onLogoRemove}>&times;</button>
    </div>
  {/if}
  <label>
    Logo: <input type="file" name="logo" on:change={onLogoChange}/>
  </label>

  {#each photoImages as photoImage, i}
    <div class="achievement-form--image-container">
      <img src={photoImage.url} alt={`Photo image ${i}`} class="achievement-form--image"/>
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

  <Button type="submit">Отправить</Button>
</form>

<style>
  .achievement-form {
    min-width: 400px;
    width: 50%;
    margin: 20px;
    padding: 10px;
    box-shadow: 0 0 1px 0 black;
    background-color: white;
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
    background-color: transparent;
    border: 0;
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