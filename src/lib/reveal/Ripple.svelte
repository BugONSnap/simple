<!--
  Layer 4: the expanding ripple.

  Independent of the centerpiece: it is its own layer, positioned at the exact
  activation point, and its rings are scaled from the shared --wave clock.

  Phase hand-offs are reported through animation events. The two "beat"
  elements run an invisible animation whose duration is a token on the overlay
  (--t-burst, --t-handoff), so the phase changes are tied to the same CSS
  timeline as the wave, not to a JS timer.
-->
<script lang="ts">
  let {
    active,
    onburst,
    onhandoff,
  }: {
    active: boolean;
    /** The first pulse has left the lantern: rippling → deblurring. */
    onburst: () => void;
    /** The wave front is far enough out for curtains to start. */
    onhandoff: () => void;
  } = $props();
</script>

<div class="ripple" class:active aria-hidden="true">
  <span class="flash"></span>
  <span class="ring"></span>
  <span class="ring trail"></span>
  {#if active}
    <span class="beat burst" onanimationend={onburst}></span>
    <span class="beat handoff" onanimationend={onhandoff}></span>
  {/if}
</div>

<style>
  .ripple {
    position: absolute;
    inset: 0;
    z-index: 3;
    overflow: hidden;
    pointer-events: none;
  }

  .ring,
  .flash {
    position: absolute;
    left: var(--ox);
    top: var(--oy);
    border-radius: 50%;
    pointer-events: none;
    will-change: transform, opacity;
  }

  .ring {
    width: calc(var(--maxr) * 2);
    height: calc(var(--maxr) * 2);
    margin: calc(var(--maxr) * -1) 0 0 calc(var(--maxr) * -1);
    transform: scale(var(--wave));
    opacity: calc(1 - var(--wave) * var(--wave));
    background: radial-gradient(
      closest-side,
      transparent 84%,
      rgb(255 226 170 / 0.12) 90%,
      rgb(255 226 170 / 0.6) 97%,
      transparent 100%
    );
    mix-blend-mode: screen;
  }

  .trail {
    transform: scale(calc(var(--wave) * 0.82));
    opacity: calc(0.7 - var(--wave) * 0.7);
  }

  .flash {
    width: 22rem;
    height: 22rem;
    margin: -11rem 0 0 -11rem;
    background: radial-gradient(
      closest-side,
      rgb(255 236 200 / 0.9),
      rgb(243 181 98 / 0.35) 45%,
      transparent 100%
    );
    transform: scale(calc(0.3 + var(--wave) * 5));
    opacity: calc(1 - var(--wave) * 3);
    mix-blend-mode: screen;
  }

  .beat {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  .burst {
    animation: beat var(--t-burst) linear both;
  }

  .handoff {
    animation: beat var(--t-handoff) linear both;
  }

  @keyframes beat {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.001;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ring,
    .flash {
      display: none;
    }
  }
</style>
