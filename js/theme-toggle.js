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

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(savedTheme);
    updateIcon(savedTheme);
  }

  function cycleTheme() {
    const current = localStorage.getItem('theme') || 'auto';
    const currentIndex = THEMES.indexOf(current);
    const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];

    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
    updateIcon(nextTheme);
  }

  // Initialize theme on page load
  initTheme();

  // Listen for system theme changes when in auto mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'auto') {
      applyTheme('auto');
    }
  });

  // Set up toggle button click handler when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme_toggle');
    if (toggle) {
      toggle.addEventListener('click', cycleTheme);
    }
  });
})();
