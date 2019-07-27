<script>
  let title = '', desc = '', id = '', date, type = '0', logoField, form;

  // function onChangeFile() {
  //
  // }

  function onSubmit(event) {

    const formData = new FormData(form);
    //formData.append('file', logo, logo.name);

    const body = {title, desc, id, date, type, formData};

    fetch("/achievements", {
      method: "post",
      credentials: 'same-origin',
      body: formData
    }).catch(err => console.log(err));

    event.preventDefault();
  }

</script>


<form on:submit={onSubmit} encType="multipart/form-data" bind:this={form}>
  <label>
    Название: <input type="text" name="title" bind:value={title}>
  </label>
  <label>
    Описание: <input type="text" name="desc" bind:value={desc}>
  </label>
  <label>
    ID: <input type="text" name="id" bind:value={id}>
  </label>
  <label>
    Logo: <input type="file" name="logo" bind:this={logoField}/>
  </label>

  <label>
    Photos: <input type="file" name="photos" multiple/>
  </label>
    <!-- add photos -->
  <label>
    Дата: <input type="date" name="date" bind:value={date}>
  </label>

  <select name="type" bind:value={type}>
    <option value="0" selected>Бронза</option>
    <option value="1">Серебро</option>
    <option value="2">Золото</option>
    <option value="3">Платина</option>
  </select>

  <button type="submit" on:submit={onSubmit}>Отправить</button>
</form>