<!--
  Layer 5: two independent, sheer teal panels that leave the page visible
  between them while the ripple clears it.
-->
<script lang="ts">
  let {
    open,
    onopened,
  }: {
    open: boolean;
    /** Both panels have finished travelling. */
    onopened: () => void;
  } = $props();

  let finished = 0;

  function handleEnd(event: AnimationEvent) {
    // Ignore the highlight sweep and anything bubbling from children.
    if (event.target !== event.currentTarget) return;
    finished += 1;
    if (finished >= 2) onopened();
  }
</script>

<div class="curtains" class:open aria-hidden="true">
  <div class="panel left" onanimationend={handleEnd}></div>
  <div class="panel right" onanimationend={handleEnd}></div>
</div>

<style>
  .curtains {
    position: absolute;
    inset: 0;
    z-index: 2;
    overflow: hidden;
    pointer-events: none;
  }

  .panel {
    --fold: rgb(4 49 46 / 0.55);
    --sheen: rgb(169 218 162 / 0.3);

    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    will-change: transform, opacity;
    background:
      repeating-linear-gradient(
        90deg,
        var(--fold) 0,
        transparent 2.2rem,
        var(--sheen) 3.6rem,
        transparent 5.4rem,
        var(--fold) 7rem
      ),
      linear-gradient(
        180deg,
        rgb(8 116 111 / 0.92),
        rgb(28 139 106 / 0.88) 55%,
        rgb(6 79 75 / 0.94)
      );
    backdrop-filter: blur(1px);
  }

  .left {
    left: 0;
    box-shadow: 0.7rem 0 1.5rem -0.8rem rgb(3 47 45 / 0.22);
  }

  .right {
    right: 0;
    box-shadow: -0.7rem 0 1.5rem -0.8rem rgb(3 47 45 / 0.22);
  }

  /* Gold trim along the meeting edge, with a faint glow. */
  .panel::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #b8d89e, #e8c56b 50%, #b8d89e);
    box-shadow: 0 0 0.9rem rgb(232 197 107 / 0.55);
  }

  .left::after {
    right: 0;
  }

  .right::after {
    left: 0;
  }

  .open .left {
    animation: part-left var(--t-curtain) cubic-bezier(0.65, 0, 0.25, 1) forwards;
  }

  .open .right {
    animation: part-right var(--t-curtain) cubic-bezier(0.65, 0, 0.25, 1) forwards;
  }

  @keyframes part-left {
    to {
      transform: translate3d(calc(-100% - 4rem), 0, 0);
    }
  }

  @keyframes part-right {
    to {
      transform: translate3d(calc(100% + 4rem), 0, 0);
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    /* No travel: the panels fade out instead. */
    .open .left,
    .open .right {
      animation-name: fade-out;
      animation-timing-function: linear;
    }
  }

</style>
