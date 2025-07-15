// useAppearance.ts

import {ref } from 'vue';

type Appearance = 'light' | 'dark' | 'system';

const globalAppearance = ref<Appearance>('system');

export function updateTheme(value: Appearance) {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;

  if (value === 'system') {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = mediaQueryList.matches ? 'dark' : 'light';
    html.classList.toggle('dark', systemTheme === 'dark');
  } else {
    html.classList.toggle('dark', value === 'dark');
  }
}

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

export const getStoredAppearance = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('appearance') as Appearance | null;
};

export function getEffectiveTheme(value: Appearance): 'light' | 'dark' {
  if (value === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  return value;
}

export function initializeTheme() {
  if (typeof window === 'undefined') return;

  const savedAppearance = getStoredAppearance();
  globalAppearance.value = savedAppearance || 'system';
  updateTheme(globalAppearance.value);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (globalAppearance.value === 'system') {
      updateTheme('system');
    }
  });
}

let initialized = false;

export function useAppearance() {
  if (!initialized) {
    initializeTheme();
    initialized = true;
  }

  function updateAppearance(value: Appearance) {
    globalAppearance.value = value;
    localStorage.setItem('appearance', value);
    setCookie('appearance', value);
    updateTheme(value);
  }

  return {
    appearance: globalAppearance,
    updateAppearance,
  };
}
