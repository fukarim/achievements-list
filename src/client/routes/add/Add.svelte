<script>
  import { navigate } from "svelte-routing";

  let logoField, form, logoImage;

  function onLogoChange(event) {
    // TODO: change to event.target
    if (!logoField) {
      return;
    }

    if (logoField.files && logoField.files[0]) {
      const reader = new FileReader();

      reader.onload = function(e) {
        logoImage = e.target.result
      };

      reader.readAsDataURL(logoField.files[0]);
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


<form on:submit={onSubmit} encType="multipart/form-data" bind:this={form}>
  <label>
    Название: <input type="text" name="title">
  </label>
  <label>
    Описание: <input type="text" name="desc">
  </label>
  <label>
    ID: <input type="text" name="id">
  </label>
  <label>
  {#if logoImage}
    <img src={logoImage} alt="logo-image" />
  {/if}
    Logo: <input type="file" name="logo" bind:this={logoField} on:change={onLogoChange}/>
  </label>

  <label>
    Photos: <input type="file" name="photos" multiple/>
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