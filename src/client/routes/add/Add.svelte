
<script>
    let title='', desc='', id='', date, type='0';

    function onSubmit(event) {
        console.log("title", title);
        console.log("desc", desc);
        console.log("id", id);
        console.log("date", date);
        console.log("type", type);

        const body = {title, desc, id, date, type};

        fetch("/achievements", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(body)
        })
                .catch(err => console.log(err));

        event.preventDefault();
    }

</script>


<form on:submit={onSubmit}>
    <label>
        Название: <input type="text" bind:value={title}>
    </label>
    <label>
        Описание: <input type="text" bind:value={desc}>
    </label>
    <label>
        ID: <input type="text" bind:value={id}>
    </label>
    <!-- add logo -->
    <!-- add photos -->
    <label>
        Дата: <input type="date" bind:value={date}>
    </label>

    <select name="select" bind:value={type}>
        <option value="0" selected>Бронза</option>
        <option value="1" >Серебро</option>
        <option value="2">Золото</option>
        <option value="3">Платина</option>
    </select>

    <button type="submit" on:submit={onSubmit}>Отправить</button>
</form>