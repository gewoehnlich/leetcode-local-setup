import { restoreConfig, saveConfig } from './app/config.js';
import { main } from './app/main.js';

document.addEventListener('DOMContentLoaded', async () => {
  await restoreConfig();
});

document.addEventListener('change', async () => {
  await saveConfig();
});

document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.getElementById('download-file-button');

  if (downloadButton) {
    downloadButton.addEventListener('click', main);
  }
});
