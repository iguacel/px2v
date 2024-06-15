import { writable } from 'svelte/store';

export const files = writable({
  accepted: [],
  rejected: [],
});

export function updateFiles(newFiles) {
  files.update(currentFiles => {
    return {
      accepted: [...currentFiles.accepted, ...newFiles.accepted],
      rejected: [...currentFiles.rejected, ...newFiles.rejected],
    };
  });
}
