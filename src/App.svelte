<script lang="ts">
  import Reveal from './lib/reveal/Reveal.svelte';
  import Site from './lib/site/Site.svelte';
</script>

<!--
  The site is passed in once as children. Reveal renders it once, outside every
  {#if}, so it is never cloned, remounted or replaced while the intro plays.
-->
<Reveal>
  <Site />
</Reveal>
