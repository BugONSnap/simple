<script lang="ts">
  // Local component state on purpose: the reveal must not reset anything here.
  let name = $state('');
  let favorite = $state('');
  let quantity = $state(1);
  let notes = $state('');
  let submitted = $state(false);

  const canSubmit = $derived(name.trim().length > 1 && favorite !== '');

  function submit(event: SubmitEvent) {
    event.preventDefault();
    if (canSubmit) submitted = true;
  }
</script>

{#if submitted}
  <p class="done" role="status">
    Thanks, {name.trim()}! We love that {favorite} caught your eye.
    {#if quantity > 1} We noted your interest in {quantity} bracelets.{/if}
    <small>This is a mock promotion. Your message is only shown here and is not sent anywhere.</small>
  </p>
{:else}
  <form onsubmit={submit}>
    <label class="field">
      <span>Name</span>
      <input type="text" bind:value={name} autocomplete="name" required />
    </label>

    <fieldset>
      <legend>Which bracelet is your favorite?</legend>
      <label class="choice"><input type="radio" name="favorite" value="Leaves" bind:group={favorite} required /> Leaves</label>
      <label class="choice"><input type="radio" name="favorite" value="Liwanag" bind:group={favorite} required /> Liwanag</label>
      <label class="choice"><input type="radio" name="favorite" value="another design" bind:group={favorite} required /> Another design</label>
    </fieldset>

    <label class="field">
      <span class="narrow">How many would you wear?</span>
      <input class="narrow" type="number" min="1" max="10" bind:value={quantity} />
    </label>

    <label class="field">
      <span>Any other thoughts?</span>
      <textarea rows="3" bind:value={notes}></textarea>
    </label>

    <button type="submit" disabled={!canSubmit}>Share your pick</button>
  </form>
{/if}

<style>
  form {
    display: grid;
    gap: 1.25rem;
    max-width: 38rem;
    padding: clamp(1.25rem, 4vw, 2rem);
    border: 1px solid rgb(22 78 69 / 0.14);
    border-radius: 1.25rem;
    background: rgb(255 255 255 / 0.86);
    box-shadow: 0 1rem 2.5rem rgb(18 59 50 / 0.08);
  }

  .field {
    display: grid;
    gap: 0.4rem;
    font-weight: 600;
    color: #24463e;
  }

  .narrow {
    max-width: 14rem;
  }

  input[type='text'],
  input[type='number'],
  textarea {
    font: inherit;
    font-weight: 400;
    padding: 0.8rem 0.9rem;
    border: 1px solid rgb(22 78 69 / 0.25);
    border-radius: 0.65rem;
    background: #fff;
    color: #203b35;
  }

  input:focus-visible,
  textarea:focus-visible {
    outline: 3px solid rgb(20 123 105 / 0.25);
    border-color: #147b69;
    outline-offset: 1px;
  }

  textarea {
    resize: vertical;
  }

  fieldset {
    border: 1px solid rgb(22 78 69 / 0.13);
    border-radius: 0.75rem;
    padding: 1rem;
    margin: 0;
    display: grid;
    gap: 0.5rem;
    color: #24463e;
  }

  legend {
    font-weight: 600;
    padding: 0 0.35rem;
  }

  .choice {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
  }

  .choice input {
    accent-color: #147b69;
    width: 1.1rem;
    height: 1.1rem;
  }

  button {
    justify-self: start;
    font: inherit;
    font-weight: 600;
    padding: 0.85rem 1.5rem;
    border: 0;
    border-radius: 999px;
    background: #155b50;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  button:hover:not(:disabled) {
    background: #0c433b;
    transform: translateY(-1px);
  }

  button:disabled {
    background: #8d9b95;
    cursor: not-allowed;
  }

  .done {
    max-width: 30rem;
    padding: clamp(1.25rem, 4vw, 2rem);
    border: 1px solid rgb(22 78 69 / 0.14);
    border-radius: 1.25rem;
    background: #fff;
    color: #24463e;
    font-size: 1.2rem;
  }

  .done small {
    display: block;
    margin-top: 0.8rem;
    font-size: 0.9rem;
    opacity: 0.75;
  }
</style>
