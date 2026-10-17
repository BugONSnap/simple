<!--
  Layer 2: the blur and darkening treatment.

  It sits above the real website and blurs/darkens what is behind it with
  backdrop-filter. The website itself is never touched, cloned or filtered,
  so fixed positioning, scroll position and component state stay intact.

  A radial mask opens a hole whose radius follows the shared --wave clock, so
  the deblur travels outward with the ripple ring.
-->
<script lang="ts">
  // Purely visual layer; it is driven by CSS custom properties from the overlay.
</script>

<div class="veil" aria-hidden="true"></div>

<style>
  .veil {
    --feather: 24vmin;
    --hole: calc(var(--wave) * (var(--maxr) + var(--feather)));

    position: absolute;
    inset: 0;
    z-index: 1;
    background: radial-gradient(
      120% 90% at 50% 40%,
      rgb(36 24 48 / 0.5),
      rgb(24 14 34 / 0.84)
    );
    -webkit-backdrop-filter: blur(18px) saturate(0.8);
    backdrop-filter: blur(18px) saturate(0.8);
    -webkit-mask-image: radial-gradient(
      circle at var(--ox) var(--oy),
      transparent calc(var(--hole) - var(--feather)),
      #000 var(--hole)
    );
    mask-image: radial-gradient(
      circle at var(--ox) var(--oy),
      transparent calc(var(--hole) - var(--feather)),
      #000 var(--hole)
    );
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    /* No travelling edge: the mask simply stays solid and the veil fades. */
    .veil {
      -webkit-mask-image: none;
      mask-image: none;
      opacity: calc(1 - var(--wave));
    }
  }
</style>
