// Theme management: light, dark, auto (system)
(function() {
  'use strict';

  const THEMES = ['light', 'dark', 'auto'];
  const ICONS = { light: '🔆', dark: '🌙', auto: '🌓' };

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }

  function updateIcon(theme) {
    const icon = document.getElementById('theme_icon');
    if (icon) icon.textContent = ICONS[theme];
  }

  function cycleTheme() {
    const current = localStorage.getItem('theme') || 'auto';
    const currentIndex = THEMES.indexOf(current);
    const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];

    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
    updateIcon(nextTheme);
  }

  // Apply theme immediately to prevent flash (before DOM loads)
  const savedTheme = localStorage.getItem('theme') || 'auto';
  applyTheme(savedTheme);

  // Listen for system theme changes when in auto mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'auto') {
      applyTheme('auto');
    }
  });

  // Set up toggle button and update icon when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Update icon now that DOM is loaded
    const savedTheme = localStorage.getItem('theme') || 'auto';
    updateIcon(savedTheme);

    // Set up toggle button click handler
    const toggle = document.getElementById('theme_toggle');
    if (toggle) {
      toggle.addEventListener('click', cycleTheme);
    }
  });
})();
