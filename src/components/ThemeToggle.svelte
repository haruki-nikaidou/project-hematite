<script lang="ts">
  import { t } from '../lib/i18n';
  import type { Locale } from '../lib/constants';
  import Icon from '@iconify/svelte';

  let { lang }: { lang: Locale } = $props();

  let theme = $state<'light' | 'dark' | 'system'>('system');

  // Sync from DOM on mount (the inline script in BaseLayout already applied the saved value)
  $effect(() => {
    const saved = localStorage.getItem('hematite-theme');
    if (saved === 'light' || saved === 'dark') {
      theme = saved;
    } else {
      theme = 'system';
    }
  });

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('hematite-theme', next);
    theme = next;
  }

  const label = $derived(t(lang, 'theme.toggle'));
  const iconName = $derived(theme === 'dark' ? 'heroicons:sun' : 'heroicons:moon');
</script>

<button class="theme-toggle" onclick={toggle} title={label} aria-label={label}>
  <Icon icon={iconName} width="1.1rem" height="1.1rem" />
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--muted);
    transition: border-color 150ms ease, color 150ms ease;
    font-size: 1rem;
    line-height: 1;

    &:hover {
      border-color: var(--active);
      color: var(--active);
    }
  }

</style>
