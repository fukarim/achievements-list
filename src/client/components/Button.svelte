<script>
  import {link} from "svelte-routing";

  import excludeProps from '../utils/excludeProps';

  export let href;
</script>

{#if href}
  <a
          href={href}
          use:link
          class='material-button'
          {...excludeProps($$props, ["href"])}
  >
    <slot></slot>
  </a>
{:else}
  <button
          class='material-button'
          on:click
          {...$$props}
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
    margin: 0;
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