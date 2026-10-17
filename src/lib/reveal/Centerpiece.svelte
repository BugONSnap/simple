<!--
  Layer 3: the interactive centerpiece — a glass lantern with a heart inside.

  Interaction feedback borrows from a heart-button: the outline draws itself
  on hover/focus, the whole lantern dips on press, and activation fills the
  heart and throws sparks. The button is only the trigger. The reveal itself is
  the ripple, veil and curtains.

  Accessibility: a real <button>, visible focus ring, keyboard activation from
  the lantern's centre, and an `aria-pressed` activation state.
-->
<script lang="ts">
  import { onMount } from 'svelte';

  let {
    activated,
    onactivate,
  }: {
    activated: boolean;
    /** Viewport coordinates the ripple should start from. */
    onactivate: (x: number, y: number) => void;
  } = $props();

  let button: HTMLButtonElement;
  let tiltX = $state(0);
  let tiltY = $state(0);

  const sparks = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30 + (i % 2 ? 9 : -6),
    distance: 5.5 + (i % 3) * 1.6,
    delay: (i % 4) * 28,
  }));

  onMount(() => {
    button.focus({ preventScroll: true });
  });

  function handleClick(event: MouseEvent) {
    if (activated) return;

    // detail === 0 means the click came from the keyboard (Enter / Space).
    const fromPointer = event.detail > 0 && (event.clientX !== 0 || event.clientY !== 0);
    if (fromPointer) {
      onactivate(event.clientX, event.clientY);
      return;
    }

    const box = button.getBoundingClientRect();
    onactivate(box.left + box.width / 2, box.top + box.height / 2);
  }

  function handlePointerMove(event: PointerEvent) {
    if (activated) return;
    // The lantern leans a few pixels toward the pointer.
    tiltX = (event.clientX / window.innerWidth - 0.5) * 14;
    tiltY = (event.clientY / window.innerHeight - 0.5) * 14;
  }
</script>

<svelte:window onpointermove={handlePointerMove} />

<div
  class="centerpiece"
  class:activated
  style:--tx="{tiltX}px"
  style:--ty="{tiltY}px"
>
  <button
    bind:this={button}
    class="orb"
    type="button"
    aria-label="Explore the bracelet collection"
    aria-describedby="intro-hint"
    aria-pressed={activated}
    aria-disabled={activated}
    onclick={handleClick}
  >
    <span class="glow" aria-hidden="true"></span>
    <span class="glass" aria-hidden="true"></span>

    <svg class="heart" viewBox="0 0 32 29" aria-hidden="true" focusable="false">
      <path
        pathLength="100"
        d="M16 27.5C5 19.5 1.5 13.5 1.5 8.8 1.5 4.6 4.7 1.8 8.6 1.8c2.9 0 5.4 1.6 7.4 4.5 2-2.9 4.5-4.5 7.4-4.5 3.9 0 7.1 2.8 7.1 7 0 4.7-3.5 10.7-14.5 18.7z"
      />
    </svg>

    <span class="sparks" aria-hidden="true">
      {#each sparks as spark}
        <i style="--a:{spark.angle}deg; --d:{spark.distance}rem; --delay:{spark.delay}ms"></i>
      {/each}
    </span>
  </button>

  <div class="caption" id="intro-hint">
    <p class="names">Ben&amp;Ben</p>
    <p class="hint">Tap to discover the bracelet collection</p>
  </div>
</div>

<style>
  .centerpiece {
    position: absolute;
    inset: 0;
    z-index: 4;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 2.25rem;
    pointer-events: none;
    transition:
      opacity 0.7s ease 0.15s,
      transform 0.9s cubic-bezier(0.3, 0, 0.2, 1);
  }

  .orb {
    --size: clamp(8.5rem, 28vmin, 11rem);

    position: relative;
    width: var(--size);
    height: var(--size);
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    pointer-events: auto;
    color: var(--lantern-soft);
    transform: translate3d(var(--tx), var(--ty), 0);
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
    -webkit-tap-highlight-color: transparent;
  }

  .orb:active:not([aria-disabled='true']) {
    transform: translate3d(var(--tx), var(--ty), 0) scale(0.93);
    transition-duration: 0.12s;
  }

  .orb:focus-visible {
    outline: 3px solid var(--lantern-soft);
    outline-offset: 10px;
    border-radius: 50%;
  }

  .glow {
    position: absolute;
    inset: -45%;
    border-radius: 50%;
    background: radial-gradient(
      closest-side,
      rgb(243 181 98 / 0.55),
      rgb(243 181 98 / 0.14) 55%,
      transparent
    );
    animation: breathe 3.6s ease-in-out infinite;
  }

  .glass {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background:
      radial-gradient(circle at 34% 28%, rgb(255 255 255 / 0.55), transparent 28%),
      radial-gradient(circle at 50% 56%, rgb(222 194 111 / 0.98), rgb(33 129 111 / 0.82) 48%, rgb(9 63 62 / 0.9) 100%);
    box-shadow:
      inset 0 0 0 1.5px rgb(218 198 127 / 0.85),
      inset 0 -1.2rem 2rem rgb(4 55 55 / 0.48),
      0 0.8rem 2.4rem rgb(0 0 0 / 0.4),
      0 0 2.4rem rgb(32 128 108 / 0.28);
  }

  .heart {
    position: absolute;
    inset: 28% 24% 24%;
    width: 52%;
    height: 48%;
    overflow: visible;
    transform-origin: 50% 60%;
    animation: beat 2.4s ease-in-out infinite;
  }

  .heart path {
    fill: rgb(242 212 123 / 0.42);
    stroke: #ffe18a;
    stroke-width: 1.8;
    stroke-linejoin: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    transition:
      fill 0.45s ease,
      stroke-dashoffset 0.6s ease;
  }

  /* Hover / focus: the gold outline redraws and brightens. */
  .orb:hover .heart path,
  .orb:focus-visible .heart path {
    animation: redraw 0.9s ease-out;
    fill: rgb(242 212 123 / 0.62);
  }

  .sparks i {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0.42rem;
    height: 0.42rem;
    margin: -0.21rem 0 0 -0.21rem;
    border-radius: 50%;
    background: var(--lantern-soft);
    box-shadow: 0 0 0.7rem 0.15rem rgb(255 226 170 / 0.9);
    opacity: 0;
    transform: rotate(var(--a)) translateY(0);
  }

  .caption {
    text-align: center;
    max-width: 22rem;
    padding-inline: 1.5rem;
    color: #fff;
    text-shadow: 0 1px 14px rgb(20 8 28 / 0.7);
    transition: opacity 0.4s ease;
  }

  .names {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 6vw, 2.6rem);
    line-height: 1.1;
  }

  .hint {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: rgb(255 255 255 / 0.9);
  }

  /* ---- Activated state ---- */
  .activated {
    opacity: 0;
    transform: scale(1.12);
    pointer-events: none;
  }

  .activated .caption {
    opacity: 0;
  }

  .activated .glow {
    animation: flare 0.9s ease-out forwards;
  }

  .activated .heart {
    animation: pop 0.7s cubic-bezier(0.2, 1.4, 0.4, 1) forwards;
  }

  .activated .heart path {
    fill: #f2d47b;
    stroke: #fff0b0;
  }

  .activated .sparks i {
    animation: spark 1s cubic-bezier(0.1, 0.7, 0.3, 1) var(--delay) forwards;
  }

  @keyframes breathe {
    0%,
    100% {
      opacity: 0.75;
      transform: scale(0.94);
    }
    50% {
      opacity: 1;
      transform: scale(1.06);
    }
  }

  @keyframes beat {
    0%,
    100% {
      transform: scale(1);
    }
    14% {
      transform: scale(1.1);
    }
    28% {
      transform: scale(1);
    }
    42% {
      transform: scale(1.07);
    }
  }

  @keyframes redraw {
    from {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    45% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1.18);
    }
  }

  @keyframes flare {
    to {
      opacity: 1;
      transform: scale(1.5);
    }
  }

  @keyframes spark {
    0% {
      opacity: 1;
      transform: rotate(var(--a)) translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: rotate(var(--a)) translateY(calc(var(--d) * -1)) scale(0.2);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .glow,
    .heart {
      animation: none;
    }

    .orb,
    .centerpiece {
      transition-duration: 0.01s;
    }

    .orb:hover .heart path,
    .orb:focus-visible .heart path {
      animation: none;
    }

    .activated .sparks i,
    .activated .glow,
    .activated .heart {
      animation: none;
    }
  }
</style>
