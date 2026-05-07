<script lang="ts">
  import { t } from '../lib/i18n';
  import type { Locale } from '../lib/constants';

  let { lang }: { lang: Locale } = $props();

  let query = $state('');
  let results = $state<Array<{ url: string; meta: { title: string }; excerpt: string }>>([]);
  let loading = $state(false);
  let open = $state(false);
  let pagefind = $state<{ search: (q: string, opts: object) => Promise<{ results: Array<{ data: () => Promise<{ url: string; meta: { title: string }; excerpt: string }> }> }> } | null>(null);

  let debounceTimer: ReturnType<typeof setTimeout>;

  async function loadPagefind() {
    if (pagefind) return;
    try {
      // @ts-ignore - dynamic import of pagefind
      const pf = await import('/pagefind/pagefind.js');
      await pf.init();
      pagefind = pf;
    } catch {
      pagefind = null;
    }
  }

  async function doSearch(q: string) {
    if (!q.trim()) {
      results = [];
      open = false;
      return;
    }
    await loadPagefind();
    if (!pagefind) return;

    loading = true;
    try {
      const res = await pagefind.search(q, { filters: { lang } });
      const top = res.results.slice(0, 8);
      const resolved = await Promise.all(top.map((r) => r.data()));
      results = resolved;
      open = true;
    } catch {
      results = [];
    } finally {
      loading = false;
    }
  }

  function onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    query = val;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => doSearch(val), 220);
  }

  function onFocus() {
    if (query.trim() && results.length > 0) open = true;
    loadPagefind();
  }

  function onBlur() {
    // Delay so that clicks on results register
    setTimeout(() => { open = false; }, 200);
  }

  function clear() {
    query = '';
    results = [];
    open = false;
  }

  const placeholder = $derived(t(lang, 'nav.search.placeholder'));
</script>

<div class="search-wrap">
  <div class="search-input-row">
    <span class="search-icon" aria-hidden="true">⌕</span>
    <input
      type="search"
      class="search-input"
      value={query}
      placeholder={placeholder}
      aria-label={placeholder}
      oninput={onInput}
      onfocus={onFocus}
      onblur={onBlur}
      autocomplete="off"
      spellcheck={false}
    />
    {#if loading}
      <span class="search-spinner" aria-hidden="true">⋯</span>
    {:else if query}
      <button class="search-clear" onclick={clear} aria-label="Clear search" tabindex="-1">✕</button>
    {/if}
  </div>

  {#if open && results.length > 0}
    <ul class="search-dropdown" role="listbox">
      {#each results as result (result.url)}
        <li role="option">
          <a href={result.url} class="search-result">
            <span class="result-title">{result.meta?.title ?? result.url}</span>
            {#if result.excerpt}
              <span class="result-excerpt">{@html result.excerpt}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  {:else if open && query && !loading}
    <div class="search-empty">No results for "{query}"</div>
  {/if}
</div>

<style>
  .search-wrap {
    position: relative;
    width: 100%;
  }

  .search-input-row {
    display: flex;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--surface);
    padding: 0 0.5rem;
    transition: border-color 150ms ease;

    &:focus-within {
      border-color: var(--active);
    }
  }

  .search-icon {
    color: var(--muted);
    font-size: 1.1rem;
    padding-right: 0.25rem;
    user-select: none;
  }

  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--fg);
    font-family: var(--font-serif);
    font-size: 0.9rem;
    padding: 0.45rem 0.25rem;
    outline: none;

    &::placeholder {
      color: var(--muted);
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  .search-clear,
  .search-spinner {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 0.85rem;
    padding: 0.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .search-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    list-style: none;
    padding: 0.25rem 0;
    margin: 0;
    z-index: 200;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    max-height: 420px;
    overflow-y: auto;
  }

  .search-result {
    display: block;
    padding: 0.6rem 1rem;
    text-decoration: none;
    color: var(--fg);
    transition: background 150ms ease;

    &:hover {
      background: var(--surface);
      text-decoration: none;
    }
  }

  .result-title {
    display: block;
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.15rem;
  }

  .result-excerpt {
    display: block;
    font-size: 0.8rem;
    color: var(--muted);
    line-height: 1.4;

    :global(mark) {
      background: var(--active);
      color: var(--bg);
      border-radius: 2px;
      padding: 0 0.1em;
    }
  }

  .search-empty {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    color: var(--muted);
    z-index: 200;
  }
</style>
