import { writable } from 'svelte/store';

export const toast = writable<{
  type: 'info' | 'warning' | 'error';
  message: string;
  visible: boolean;
}>({
  type: 'info',
  message: '',
  visible: false
});

export function showToast(type: 'info' | 'warning' | 'error', message: string, duration = 3000) {
  toast.set({ type, message, visible: true });

  setTimeout(() => {
    toast.update(t => ({ ...t, visible: false }));
  }, duration);
}
