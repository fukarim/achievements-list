<script>
  export let isOpen = false;
  export let onClose = () => isOpen = false;

  $: modalStyles = `display: ${isOpen ? 'block' : 'none'}`;

  let modalOutside;

  function onClickOutside(e) {
    if (e.target !== modalOutside) {
      return false;
    }

    onClose();
  }
</script>

<div class="modal" style={modalStyles} on:click={onClickOutside} bind:this={modalOutside}>

  <div class="modal__content">
    <span class="modal__close" on:click={onClose}>&times;</span>
    <slot></slot>
  </div>

</div>

<style>
  .modal {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }

  .modal__content {
    position: relative;
    background-color: aliceblue;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .modal__close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .modal__close:hover,
  .modal__close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
</style>