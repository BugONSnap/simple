# Wedding site with cinematic reveal (Svelte 5)

    npm install
    npm run dev

## Reveal architecture (`src/lib/reveal/`)

Lifecycle: `intro → rippling → deblurring → curtains-opening → completed`

| Layer | File | Role |
|---|---|---|
| Website | `Reveal.svelte` (children) | Rendered once, outside every `{#if}`; `inert` until completed |
| Blur + darkening | `Veil.svelte` | `backdrop-filter` veil with a radial mask driven by `--wave` |
| Curtains | `Curtains.svelte` | Two sheer panels, transforms only |
| Ripple | `Ripple.svelte` | Dedicated rings + flash; emits phase events |
| Centerpiece | `Centerpiece.svelte` | Accessible lantern button, the trigger only |

`controller.svelte.ts` holds the forward-only phase state. `--wave` (0→1) is the
single CSS clock; timing tokens live on `.overlay` in `Reveal.svelte`.
