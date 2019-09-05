<script>

  export let achievement = {};
  $: currentImage = achievement.logo || achievement.photos && achievement.photos[0]  || "#";

  function onSmallImageClick(e) {
    if (e.target.src) {
      currentImage = e.target.src
    }

    return false;
  }
</script>

<div class="achievement-details">
  <h1 class="achievement-details__title">{achievement.title}</h1>
  <img src={currentImage} alt={`Achievement ${achievement.title} image`} class="achievement-details__image"/>
  <div class="achievement-details__image-list">
    {#if achievement.logo}
      <img src={achievement.logo} alt="logo-image" class="achievement-details__image-list-item" on:click={onSmallImageClick}/>
    {/if}
    {#each achievement.photos || [] as photoImage, i}
      <img src={photoImage} alt={`photo-image-${i}`} class="achievement-details__image-list-item" on:click={onSmallImageClick}/>
    {/each}
  </div>
   <div class="achievement-details__description">
     Описание: {achievement.description}
   </div>
  {#if achievement.date}
    <div class="achievement-details__date">
      {new Date(achievement.date).toLocaleDateString()}
    </div>
  {/if}
</div>


<style>
  .achievement-details {
    padding: 0 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .achievement-details__title {
    width: 75%;
    text-align: center;
  }

  .achievement-details__image {
    display: block;
    max-width: 75%;
    height: 60vh;
    object-fit: scale-down;
  }

  .achievement-details__image-list {
    display: flex;
    max-width: 75%;
    flex-wrap: wrap;
    margin: 10px;
  }

  .achievement-details__image-list-item {
    display: block;
    height: 5vw;
    width: 5vw;
    min-width: 50px;
    min-height: 50px;
    margin: 10px;
    object-fit: cover;
    border: 1px solid #ccc;
  }

  .achievement-details__image-list-item:hover {
    border: 1px solid #777;
    cursor: pointer;
  }

  .achievement-details__description {
    width: 75%;
  }

  .achievement-details__date {
    position: absolute;
    top: 40px;
    right: 70px;
  }
</style>
