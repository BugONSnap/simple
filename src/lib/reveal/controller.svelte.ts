/**
 * Lifecycle of the intro reveal. Strictly forward-only:
 *
 *   intro → rippling → deblurring → curtains-opening → completed
 *
 * The controller holds state only. It never touches the DOM. Each visual layer
 * reacts to `phase` through classes and CSS custom properties, and reports
 * back through animation events (see Ripple.svelte and Curtains.svelte).
 */
export const PHASES = [
  'intro',
  'rippling',
  'deblurring',
  'curtains-opening',
  'completed',
] as const;

export type Phase = (typeof PHASES)[number];

export class RevealController {
  phase = $state<Phase>('intro');

  /** Where the ripple starts, in viewport pixels. */
  originX = $state(0);
  originY = $state(0);

  /** Distance from the origin to the farthest viewport corner. */
  maxRadius = $state(0);

  /** True until the reveal has finished: page is inert and scroll is locked. */
  readonly locked = $derived(this.phase !== 'completed');

  /** True once `phase` has reached `target` or passed it. */
  reached(target: Phase): boolean {
    return PHASES.indexOf(this.phase) >= PHASES.indexOf(target);
  }

  /** Start the sequence. Ignored unless the reveal is still at `intro`. */
  activate(x: number, y: number, viewportWidth: number, viewportHeight: number): void {
    if (this.phase !== 'intro') return;
    this.originX = x;
    this.originY = y;
    this.maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y),
    );
    this.phase = 'rippling';
  }

  /**
   * Move forward to `next`. Moving backwards or staying put is a no-op, so a
   * late or duplicated animation event can never restart the sequence.
   */
  advance(next: Phase): void {
    if (PHASES.indexOf(next) > PHASES.indexOf(this.phase)) this.phase = next;
  }
}
