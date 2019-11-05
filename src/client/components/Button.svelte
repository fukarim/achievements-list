<script>
  import {Link} from "svelte-routing";

  import excludeProps from '../utils/excludeProps';

  export let href;
  export let onClick = () => {};
  export let className = "";
</script>

{#if href}
  <a
          href={href}
          class={`${className} material-button`}
          {...excludeProps($$props, ["className", "onClick", "href", "type"])}
  >
    <slot></slot>
  </a>
{:else}
  <button
          class={`material-button ${className}`}
          on:click={onClick}
          {...excludeProps($$props, ["className", "onClick"])}
>
    <slot> </slot>
  </button>
{/if}

<style>
  .material-button {
    display: inline-block;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    padding: 0 16px;
    min-width: 64px;
    height: 36px;
    vertical-align: middle;
    text-align: center;
    text-overflow: ellipsis;
    text-transform: uppercase;
    text-decoration: none;
    color: rgb(255, 255, 255);
    background-color: rgb(33, 150, 243);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-family: "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system, serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 36px;
    overflow: hidden;
    outline: none;
    cursor: pointer;
    transition: box-shadow 0.2s;
  }

  .material-button::-moz-focus-inner {
    border: none;
  }

  /*.material-button::before {*/
  /*  content: "";*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  bottom: 0;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  background-color: rgb(255, 255, 255);*/
  /*  opacity: 0;*/
  /*  transition: opacity 0.2s;*/
  /*}*/

  /*.material-button::after {*/
  /*  content: "";*/
  /*  position: absolute;*/
  /*  left: 50%;*/
  /*  top: 50%;*/
  /*  border-radius: 50%;*/
  /*  padding: 50%;*/
  /*  width: 32px;*/
  /*  height: 32px;*/
  /*  background-color: rgb( 255, 255, 255);*/
  /*  opacity: 0;*/
  /*  transform: translate(-50%, -50%) scale(1);*/
  /*  transition: opacity 1s, transform 0.5s;*/
  /*}*/

  .material-button:hover,
  .material-button:focus {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .material-button:hover::before {
    opacity: 0.08;
  }

  .material-button:focus::before {
    opacity: 0.24;
  }

  .material-button:hover:focus::before {
    opacity: 0.3;
  }

  .material-button:active {
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  .material-button:active::after {
    opacity: 0.32;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0s;
  }

  .material-button:disabled {
    color: rgba(0, 0, 0, 0.38);
    background-color: rgba(0, 0, 0, 0.12);
    box-shadow: none;
    cursor: initial;
  }

  .material-button:disabled::before {
    opacity: 0;
  }

  .material-button:disabled::after {
    opacity: 0;
  }
</style>