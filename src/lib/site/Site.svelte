<script lang="ts">
  import Rsvp from './Rsvp.svelte';

  const bracelets = [
    {
      name: 'Leaves',
      image: '/assets/1.jpg',
      alt: 'Green and blue braided Leaves bracelet with silver leaf charms',
      detail: 'Deep green and blue threads meet tiny silver leaf charms, with a handwoven finish made to feel personal.',
      note: 'A small reminder that you can always begin again.',
    },
    {
      name: 'Liwanag',
      image: '/assets/2.jpg',
      alt: 'Earth-toned Liwanag braided bracelet with star and crescent charms',
      detail: 'Earth-toned braids pair with star and crescent charms for a keepsake that feels close to home.',
      note: 'For the light you find, and the light you share.',
    },
    {
      name: 'More stories',
      image: '/assets/center.jpg',
      alt: 'A collection of colorful handmade Ben&Ben-inspired bracelets',
      detail: 'Colorful threads and little charms turn favorite song-inspired moments into something you can wear.',
      note: 'Some memories deserve a place in your everyday.',
    },
  ];

  const steps = [
    { time: '01', what: 'Pick your song', note: 'Choose the design that feels like your story.' },
    { time: '02', what: 'Find your colors', note: 'Bright, earthy, or somewhere in between.' },
    { time: '03', what: 'Wear it your way', note: 'A little music to take wherever you go.' },
  ];
</script>

<div class="site">
  <header class="nav">
    <a class="mark" href="#top" aria-label="Ben&Ben bracelets, back to top">Ben&amp;Ben</a>
    <nav aria-label="Main">
      <a href="#story">Collection</a>
      <a href="#day">Our story</a>
      <a href="#details">The details</a>
      <a href="#rsvp">Get in touch</a>
    </nav>
  </header>

  <main id="top" tabindex="-1">
    <section class="hero" aria-labelledby="names">
      <div class="names-block">
        <h1 id="names">
          <span class="first">Wear</span>
          <span class="second">the song.</span>
        </h1>
        <p class="lede">Handwoven bracelets inspired by the music, memories, and stories of Ben&amp;Ben.</p>
        <a class="hero-cta" href="#story">Explore the collection <span aria-hidden="true">↓</span></a>
      </div>

      <div class="arch">
        <img
          src="/assets/center.jpg"
          srcset="/assets/center.jpg 1408w"
          sizes="(max-width: 52rem) calc(100vw - 7rem), 310px"
          alt="Colorful handmade bracelets inspired by Ben&Ben songs"
        />
        <p class="weekday">THREADS WITH A STORY</p>
        <p class="date">Songs you can wear</p>
        <p class="when">Made for music lovers</p>
        <p class="where">Find the one that feels like you.</p>
      </div>
    </section>

    <section id="story" class="story" aria-labelledby="story-title">
      <h2 id="story-title">A bracelet for every feeling</h2>
      <dl>
        {#each bracelets as bracelet}
          <div class="chapter">
            <dt>{bracelet.name}</dt>
            <dd>
              <img
                src={bracelet.image}
                srcset="{bracelet.image} 1408w"
                sizes="(max-width: 52rem) calc(100vw - 4rem), 420px"
                alt={bracelet.alt}
              />
              <p class="chapter-detail">{bracelet.detail}</p>
              <blockquote class="song-note">
                <span> A fan-made note </span>
                {bracelet.note}
              </blockquote>
            </dd>
          </div>
        {/each}
      </dl>
    </section>

    <section id="day" class="day" aria-labelledby="day-title">
      <h2 id="day-title">A little meaning in every thread</h2>
      <ol>
        {#each steps as slot}
          <li>
            <time>{slot.time}</time>
            <span class="what">{slot.what}</span>
            {#if slot.note}<span class="note">{slot.note}</span>{/if}
          </li>
        {/each}
      </ol>
    </section>

    <section id="details" class="details" aria-labelledby="details-title">
      <h2 id="details-title">Made to be yours</h2>
      <dl>
        <div>
          <dt>Handwoven</dt>
          <dd>Each bracelet is a small keepsake, woven with care and inspired by the details in the music.</dd>
        </div>
        <div>
          <dt>Wear it your way</dt>
          <dd>Stack your favorites together or let one song have the spotlight.</dd>
        </div>
        <div>
          <dt>A thoughtful gift</dt>
          <dd>Share a favorite song with someone who means a lot to you.</dd>
        </div>
        <div>
          <dt>Fan-made concept</dt>
          <dd>This is a mock promotional page for a bracelet shop concept, not an official Ben&amp;Ben store.</dd>
        </div>
      </dl>
    </section>

    <section id="rsvp" class="rsvp" aria-labelledby="rsvp-title">
      <h2 id="rsvp-title">Found your favorite?</h2>
      <p class="due">Tell us which bracelet caught your eye.</p>
      <Rsvp />
    </section>
  </main>

  <footer>
    <p class="foot-names">Ben&amp;Ben — Songs you can wear</p>
    <p>A fan-made mock promotion for a bracelet shop concept.</p>
    <p>Not affiliated with or endorsed by Ben&amp;Ben.</p>
  </footer>
</div>

<style>
  .site {
    min-height: 100vh;
    background: var(--paper);
  }

  .nav {
    position: sticky;
    inset: 0 0 auto 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.9rem clamp(1rem, 5vw, 4.5rem);
    background: rgb(247 248 245 / 0.9);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgb(23 68 61 / 0.12);
  }

  .mark {
    font-family: var(--font-display);
    font-size: 1.5rem;
    text-decoration: none;
    color: #155b50;
    white-space: nowrap;
  }

  nav {
    display: flex;
    align-items: center;
    gap: clamp(0.9rem, 3vw, 2rem);
  }

  nav a {
    text-decoration: none;
    font-weight: 600;
    padding: 0.45rem 0;
    color: #283d39;
    border-bottom: 2px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  nav a:hover,
  nav a:focus-visible {
    color: #087c6c;
    border-bottom-color: #78a88a;
  }

  main {
    outline: none;
  }

  section {
    padding: clamp(4.5rem, 8vw, 7rem) clamp(1.25rem, 7vw, 7rem);
  }

  h2 {
    max-width: 16ch;
    font-size: clamp(2.2rem, 4.5vw, 3.6rem);
    margin-bottom: clamp(2rem, 4vw, 3rem);
    color: #164e45;
  }

  .hero {
    min-height: min(52rem, calc(100svh - 4.2rem));
    padding-top: clamp(4rem, 7vw, 6.5rem);
    padding-bottom: clamp(4rem, 7vw, 6.5rem);
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(20rem, 0.9fr);
    align-items: center;
    gap: clamp(3rem, 8vw, 8rem);
    background:
      radial-gradient(ellipse at 88% 18%, rgb(211 230 210 / 0.7), transparent 40%),
      radial-gradient(ellipse at 8% 100%, rgb(222 239 226 / 0.8), transparent 48%),
      #f5f7f3;
  }

  h1 {
    max-width: 9ch;
    color: #14564c;
    font-size: clamp(4.2rem, 9vw, 8rem);
    letter-spacing: -0.045em;
    line-height: 0.92;
  }

  .first,
  .second {
    display: block;
  }

  .lede {
    margin-top: 1.6rem;
    max-width: 34rem;
    color: #4a5d57;
    font-size: clamp(1.1rem, 1.5vw, 1.3rem);
    line-height: 1.7;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    margin-top: 2rem;
    padding: 0.9rem 1.3rem;
    border-radius: 999px;
    background: #155b50;
    color: #fff;
    text-decoration: none;
    font-weight: 650;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .hero-cta:hover {
    background: #0c433b;
    transform: translateY(-2px);
  }

  .arch {
    justify-self: end;
    width: min(100%, 30rem);
    padding: clamp(1rem, 2.5vw, 1.5rem);
    border: 1px solid rgb(20 86 76 / 0.14);
    border-radius: 1.5rem;
    background: rgb(255 255 255 / 0.88);
    color: #283d39;
    text-align: left;
    box-shadow: 0 1.5rem 4rem rgb(28 66 55 / 0.1);
  }

  .arch img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: 0.9rem;
  }

  .arch p {
    padding-inline: 0.4rem;
  }

  .weekday {
    margin-top: 1.25rem;
    color: #4d7768;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
  }

  .date {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.4vw, 2.8rem);
    line-height: 1.05;
    margin: 0.45rem 0 0.75rem;
    color: #164e45;
  }

  .where {
    margin-top: 0.3rem;
    color: #4a5d57;
  }

  .story {
    background: #fff;
  }

  .story dl,
  .details dl {
    margin: 0;
  }

  .chapter {
    display: flex;
    min-width: 0;
    flex-direction: column;
    padding: 0.85rem;
    overflow: hidden;
    border: 1px solid rgb(22 78 69 / 0.12);
    border-radius: 1.25rem;
    background: #fff;
    box-shadow: 0 0.8rem 2rem rgb(18 59 50 / 0.055);
    transition: transform 0.35s cubic-bezier(0.2, 0.75, 0.25, 1), box-shadow 0.35s ease, border-color 0.35s ease;
  }

  .chapter:hover {
    transform: translateY(-5px);
    box-shadow: 0 1.2rem 2.5rem rgb(18 59 50 / 0.12);
    border-color: rgb(22 78 69 / 0.28);
  }

  .story dl {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1rem, 2.5vw, 2rem);
  }

  .chapter dt {
    font-family: var(--font-display);
    order: 1;
    padding: 1rem 0.45rem 0.25rem;
    color: #175d51;
    font-size: 1.75rem;
  }

  .chapter dd {
    display: contents;
    margin: 0;
  }

  .chapter img {
    order: 0;
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: 0.75rem;
    transition: transform 0.7s cubic-bezier(0.2, 0.75, 0.25, 1);
  }

  .chapter:hover img {
    transform: scale(1.035);
  }

  .chapter dd .chapter-detail {
    order: 2;
    padding: 0 0.45rem 0.8rem;
    color: #52635e;
    font-size: 1rem;
    line-height: 1.65;
  }

  .song-note {
    order: 3;
    position: relative;
    margin: auto 0 0;
    padding: 1rem 1rem 1rem 1.15rem;
    border-left: 2px solid #d6a958;
    border-radius: 0 0.7rem 0.7rem 0;
    background: linear-gradient(105deg, rgb(240 246 238 / 0.95), rgb(240 246 238 / 0.45));
    color: #31584d;
    font-family: var(--font-display);
    font-size: 1.18rem;
    line-height: 1.4;
    transition: transform 0.35s ease, background-color 0.35s ease;
  }

  .chapter:hover .song-note {
    transform: translateX(4px);
  }

  .song-note span {
    display: block;
    margin-bottom: 0.35rem;
    color: #668477;
    font-family: var(--font-body);
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .day {
    background: #123f38;
    color: #eff7f1;
  }

  .day h2 {
    color: #f0d78b;
  }

  .day ol {
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: 68rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .day li {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.4rem;
    border: 1px solid rgb(237 244 230 / 0.2);
    border-radius: 1rem;
    background: rgb(255 255 255 / 0.055);
  }

  .day time {
    color: #c6dcae;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
  }

  .what {
    color: #fff;
    font-family: var(--font-display);
    font-size: 1.55rem;
    line-height: 1.15;
  }

  .note {
    color: rgb(239 247 241 / 0.78);
    font-size: 0.98rem;
  }

  .details dl {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    max-width: 80rem;
  }

  .details dt {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: #175d51;
    margin-bottom: 0.7rem;
  }

  .details dd {
    margin: 0;
    color: #52635e;
    line-height: 1.65;
  }

  .rsvp {
    background:
      radial-gradient(ellipse at 90% 10%, rgb(205 228 207 / 0.65), transparent 45%),
      #edf3ed;
  }

  .due {
    margin: -1rem 0 2rem;
    color: #52635e;
    font-size: 1.1rem;
  }

  footer {
    padding: 3rem clamp(1.25rem, 7vw, 7rem);
    background: #103630;
    color: rgb(239 247 241 / 0.78);
    display: grid;
    gap: 0.55rem;
  }

  .foot-names {
    font-family: var(--font-display);
    font-size: 2rem;
    color: #f0d78b;
  }

  :global(.site-layer[data-revealed='true']) .hero .names-block,
  :global(.site-layer[data-revealed='true']) .hero .arch {
    animation: arrive 900ms cubic-bezier(0.2, 0.75, 0.25, 1) both;
  }

  :global(.site-layer[data-revealed='true']) .hero .arch {
    animation-delay: 160ms;
  }

  :global(.site-layer[data-revealed='true']) .story,
  :global(.site-layer[data-revealed='true']) .day,
  :global(.site-layer[data-revealed='true']) .details,
  :global(.site-layer[data-revealed='true']) .rsvp,
  :global(.site-layer[data-revealed='true']) footer {
    animation: arrive 850ms cubic-bezier(0.2, 0.75, 0.25, 1) both;
  }

  :global(.site-layer[data-revealed='true']) .story {
    animation-delay: 100ms;
  }

  :global(.site-layer[data-revealed='true']) .day {
    animation-delay: 180ms;
  }

  :global(.site-layer[data-revealed='true']) .details {
    animation-delay: 260ms;
  }

  :global(.site-layer[data-revealed='true']) .rsvp {
    animation-delay: 340ms;
  }

  :global(.site-layer[data-revealed='true']) footer {
    animation-delay: 420ms;
  }

  :global(.site-layer[data-revealed='true']) .chapter {
    animation: card-arrive 700ms cubic-bezier(0.2, 0.75, 0.25, 1) both;
  }

  :global(.site-layer[data-revealed='true']) .chapter:nth-child(2) {
    animation-delay: 100ms;
  }

  :global(.site-layer[data-revealed='true']) .chapter:nth-child(3) {
    animation-delay: 200ms;
  }

  @keyframes arrive {
    from {
      opacity: 0;
      transform: translateY(22px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes card-arrive {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.site-layer[data-revealed='true']) .hero .names-block,
    :global(.site-layer[data-revealed='true']) .hero .arch,
    :global(.site-layer[data-revealed='true']) .story,
    :global(.site-layer[data-revealed='true']) .day,
    :global(.site-layer[data-revealed='true']) .details,
    :global(.site-layer[data-revealed='true']) .rsvp,
    :global(.site-layer[data-revealed='true']) footer,
    :global(.site-layer[data-revealed='true']) .chapter {
      animation: none;
    }

    .chapter,
    .chapter img,
    .song-note {
      transition: none;
    }
  }

  @media (max-width: 52rem) {
    .hero {
      grid-template-columns: 1fr;
      gap: 3rem;
      min-height: auto;
    }

    .arch {
      justify-self: center;
      width: min(100%, 34rem);
    }

    .story dl,
    .details dl {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .day ol {
      grid-template-columns: 1fr;
    }

    .day li {
      display: grid;
      grid-template-columns: 4rem minmax(0, 1fr);
      align-items: baseline;
      gap: 0.5rem 1rem;
    }

    .day time {
      grid-row: span 2;
    }
  }

  @media (max-width: 38rem) {
    .nav {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.35rem;
      padding-block: 0.65rem;
    }

    nav {
      width: 100%;
      gap: 1.2rem;
      overflow-x: auto;
      scrollbar-width: none;
    }

    nav::-webkit-scrollbar {
      display: none;
    }

    nav a {
      flex: 0 0 auto;
      font-size: 0.9rem;
    }

    .hero {
      padding-top: 4rem;
    }

    h1 {
      font-size: clamp(3.7rem, 17vw, 5.8rem);
    }

    .story dl,
    .details dl {
      grid-template-columns: 1fr;
    }

    .chapter img {
      aspect-ratio: 16 / 10;
    }
  }
</style>
