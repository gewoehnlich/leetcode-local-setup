export class LLSError extends Error {
  constructor(message) {
    super(message);
    this.updateInfo(message);
  }

  updateInfo(message) {
    const infoElement = document.getElementById('info');
    if (infoElement) {
      infoElement.textContent = message;
      infoElement.style.color = 'red';
    }
  }
}
