<!--
  Orchestrator for the intro reveal.

  Layers, bottom to top:
    1. website      – the real page, rendered once, from first paint
    2. veil         – blur + darkening, a separate layer above the page
    3. curtains     – two sheer panels
    4. ripple       – dedicated luminous wave
    5. centerpiece  – the interactive lantern

  Lifecycle: intro → rippling → deblurring → curtains-opening → completed
  Each layer reacts to `phase`; the layers that own a timeline report back
  with animation events. All durations live in the tokens on `.overlay`.
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { RevealController } from './controller.svelte';
  import Veil from './Veil.svelte';
  import Curtains from './Curtains.svelte';
  import Ripple from './Ripple.svelte';
  import Centerpiece from './Centerpiece.svelte';

  let { children }: { children: Snippet } = $props();

  const reveal = new RevealController();

  // Lock scrolling only while the intro is up. Scroll position is untouched.
  $effect(() => {
    if (!reveal.locked) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  });

  // Hand keyboard focus to the page once it is interactive.
  $effect(() => {
    if (reveal.phase === 'completed') {
      document.getElementById('top')?.focus({ preventScroll: true });
    }
  });

  function activate(x: number, y: number) {
    reveal.activate(x, y, window.innerWidth, window.innerHeight);
  }
</script>

<!--
  Layer 1: the website. Outside any {#if}, so it is mounted exactly once.
  `inert` blocks interaction while the intro is up and is removed afterwards.
-->
<div class="site-layer" data-revealed={reveal.phase === 'completed'} inert={reveal.locked}>
  {@render children()}
</div>

{#if reveal.phase !== 'completed'}
  <div
    class="overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Ben&Ben bracelet collection"
    data-phase={reveal.phase}
    style:--ox="{reveal.originX}px"
    style:--oy="{reveal.originY}px"
    style:--maxr="{reveal.maxRadius}px"
  >
    <Veil />
    <Curtains
      open={reveal.reached('curtains-opening')}
      onopened={() => reveal.advance('completed')}
    />
    <Ripple
      active={reveal.phase !== 'intro'}
      onburst={() => reveal.advance('deblurring')}
      onhandoff={() => reveal.advance('curtains-opening')}
    />
    <Centerpiece activated={reveal.phase !== 'intro'} onactivate={activate} />
  </div>
{/if}

<style>
  .overlay {
    /* Timing tokens shared by every layer. */
    --t-wave: 1900ms;
    --t-burst: 480ms;
    --t-handoff: 900ms;
    --t-curtain: 1700ms;

    position: fixed;
    inset: 0;
    z-index: 100;
    overflow: hidden;
  }

  /* The one clock: runs the moment the sequence leaves `intro`. */
  .overlay:not([data-phase='intro']) {
    animation: wave var(--t-wave) cubic-bezier(0.22, 0.75, 0.25, 1) forwards;
  }

  @keyframes wave {
    from {
      --wave: 0;
    }
    to {
      --wave: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .overlay {
      --t-wave: 450ms;
      --t-burst: 120ms;
      --t-handoff: 250ms;
      --t-curtain: 350ms;
    }
  }
</style>
